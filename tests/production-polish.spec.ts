import { expect, test } from "@playwright/test";

for (const viewport of [{ width: 320, height: 640 }, { width: 390, height: 844 }]) {
  test(`the mode switch has its own row at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#/");
    const frame = page.locator("[data-portfolio-scroll-frame]");
    const dock = page.getByRole("navigation", { name: "Portfolio mode" });
    const main = page.getByRole("main", { name: "Main portfolio" });
    const game = page.getByRole("main", { name: "Game portfolio" });

    for (const mode of ["Main", "Game"]) {
      await dock.getByRole("link", { name: mode, exact: true }).press("Enter");
      await expect(mode === "Main" ? main : game).toBeVisible();
      const contentBox = await frame.boundingBox();
      const dockBox = await dock.boundingBox();
      expect(contentBox!.y + contentBox!.height).toBeLessThanOrEqual(dockBox!.y + 1);
      for (const link of await dock.getByRole("link").all()) {
        await expect(link).toBeInViewport({ ratio: 1 });
        expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      }
    }

    await game.getByRole("button", { name: "Contact", exact: true }).click();
    const gameContact = game.getByRole("link", { name: /LinkedIn/ });
    await gameContact.scrollIntoViewIfNeeded();
    await expect(gameContact).toBeInViewport({ ratio: 0.98 });
    await gameContact.click({ trial: true });
    await dock.getByRole("link", { name: "Main", exact: true }).click();
    await main.getByRole("button", { name: "Contact Me", exact: true }).click();
    const mainContact = main.locator("#contact").getByRole("link", { name: /linkedin/ });
    await expect(mainContact).toBeInViewport({ ratio: 0.98 });
    await mainContact.click({ trial: true });
  });
}

test("Main keeps the selected section in a shared row and updates during scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/");
  const nav = page.getByRole("navigation", { name: "Portfolio sections" });

  for (const [label, id] of [["Experience", "experience"], ["Education", "education"], ["Skills", "skills"], ["Contact", "contact"]]) {
    const button = nav.getByRole("button", { name: label, exact: true });
    await button.press("Enter");
    await expect(page.locator(`#${id}`)).toBeFocused();
    await expect.poll(() => page.evaluate((sectionId) => {
      const header = document.querySelector("main > header")!.getBoundingClientRect();
      const section = document.getElementById(sectionId)!.getBoundingClientRect();
      return section.top >= header.bottom - 1 && section.top < window.innerHeight;
    }, id)).toBe(true);
    await expect(button).toHaveAttribute("aria-current", "location");
  }

  for (const [id, label] of [["research", "Research"], ["experience", "Experience"], ["projects", "Projects"], ["skills", "Skills"]]) {
    await page.evaluate((sectionId) => {
      const section = document.getElementById(sectionId)!.getBoundingClientRect();
      const headerHeight = document.querySelector("main > header")!.getBoundingClientRect().height;
      window.scrollTo({ top: window.scrollY + section.top - headerHeight - 36 + 12, behavior: "instant" });
    }, id);
    await expect(nav.getByRole("button", { name: label, exact: true })).toHaveAttribute("aria-current", "location");
  }
});

test("animated mode changes stay within the mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#/");
  await expect(page.getByRole("main", { name: "Main portfolio" })).toBeVisible();

  for (const mode of ["Game", "Main"]) {
    const button = page.getByRole("navigation", { name: "Portfolio mode" }).getByRole("link", { name: mode, exact: true });
    const measurement = button.evaluate((element) => new Promise<{ excess: number; frames: number }>((resolve) => {
      element.addEventListener("click", () => {
        const start = performance.now();
        let excess = 0;
        let frames = 0;
        const measure = () => {
          excess = Math.max(excess, document.documentElement.scrollWidth - document.documentElement.clientWidth);
          frames++;
          if (performance.now() - start < 1300) requestAnimationFrame(measure);
          else resolve({ excess, frames });
        };
        requestAnimationFrame(measure);
      }, { once: true });
    }));
    await button.click();
    await expect(page.getByRole("main", { name: `${mode} portfolio` })).toBeVisible();
    const { excess, frames } = await measurement;
    expect(frames).toBeGreaterThan(10);
    expect(excess).toBe(0);
  }
});
