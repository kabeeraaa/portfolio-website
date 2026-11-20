import { expect, test } from "@playwright/test";

const viewportSizes = [
  { width: 1920, height: 1080 },
  { width: 1366, height: 768 },
  { width: 1280, height: 720 },
  { width: 390, height: 844 },
  { width: 320, height: 640 },
];

for (const viewport of viewportSizes) {
  test(`both modes remain navigable at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#/");
    const main = page.getByRole("main", { name: "Main portfolio" });
    const skip = main.getByRole("link", { name: "Skip to content" });
    await skip.focus();
    await expect(skip).toBeInViewport();
    await expect(skip).toHaveCSS("outline-style", "solid");
    await skip.press("Enter");
    await expect(page.locator("#about")).toBeFocused();
    await expect(page).toHaveURL(/#\/$/);
    await expect(main.getByRole("heading", { level: 1 })).toHaveCount(1);

    if (viewport.width < 1024) await page.getByRole("button", { name: "Toggle menu" }).press("Enter");
    const mainNav = page.getByRole("navigation", { name: "Portfolio sections" });
    await mainNav.getByRole("button", { name: "Projects", exact: true }).press("Enter");
    const mainProjects = main.getByRole("region", { name: "FEATURED PROJECTS" });
    await expect(mainProjects).toBeFocused();
    await expect(mainProjects.getByRole("heading", { level: 2 })).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);

    await page.getByRole("link", { name: "Game", exact: true }).press("Enter");
    const game = page.getByRole("main", { name: "Game portfolio" });
    await game.getByRole("link", { name: "Skip to content" }).press("Enter");
    const panel = page.locator("#game-panel");
    await expect(panel).toBeFocused();
    await expect(page).toHaveURL(/#\/game$/);
    await expect(game.getByRole("heading", { level: 1, name: "Kabir Dubey" })).toBeVisible();

    const gameNav = game.getByRole("navigation", { name: "Game sections" });
    await gameNav.getByRole("button", { name: "Research", exact: true }).press("Enter");
    await panel.getByText("Cloud & Security Architecture", { exact: true }).click();
    const details = panel.getByText(/Explored load balancers, gateway security/);
    await details.scrollIntoViewIfNeeded();
    // WebKit can round the scroll position to within a fraction of a pixel.
    await expect(details).toBeInViewport({ ratio: 0.98 });
    expect(await game.evaluate((node) => node.scrollWidth > node.clientWidth)).toBe(false);

    await gameNav.getByRole("button", { name: "Projects", exact: true }).press("Space");
    const trigger = panel.getByRole("button", { name: /COVID Detection Flask App/ });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "COVID Detection Flask App" });
    await expect(dialog).toHaveAccessibleDescription("Machine Learning / Web App");
    await expect(dialog.getByRole("button", { name: "Close project details" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    expect(errors).toEqual([]);
  });
}

test.describe("JavaScript-free document", () => {
  test.use({ javaScriptEnabled: false });

  test("has a readable fallback and descriptive metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Kabir Dubey | Cybersecurity & Software Engineering");
    await expect(page.getByRole("heading", { level: 1, name: "Kabir Dubey" })).toBeVisible();
    const metadata = page.locator('meta[name="description"]');
    await expect(metadata).toHaveAttribute("content", /hybrid TLS, Zero Trust research/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      "content",
      await metadata.getAttribute("content") ?? "",
    );
    const icon = await page.request.get("/favicon.svg");
    expect(icon.ok()).toBe(true);
    expect(await icon.text()).toContain("<title>Kabir Dubey</title>");
  });
});

test.describe("touch navigation", () => {
  test.use({ hasTouch: true, viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });

  test("opens the Main menu, reveals the Game panel, and dismisses a project by tap", async ({ page }) => {
    await page.goto("/#/");
    await page.getByRole("button", { name: "Toggle menu" }).tap();
    await page.getByRole("navigation", { name: "Portfolio sections" }).getByRole("button", { name: "Contact" }).tap();
    await expect(page.locator("#contact")).toBeFocused();
    await page.getByRole("link", { name: "Game", exact: true }).tap();
    await page.getByRole("button", { name: "Projects", exact: true }).tap();
    const game = page.getByRole("main", { name: "Game portfolio" });
    await expect.poll(() => game.evaluate((node) => node.scrollTop)).toBeGreaterThan(50);
    await game.getByRole("button", { name: /Kanban Board/ }).tap();
    const dialog = page.getByRole("dialog", { name: "Kanban Board" });
    await dialog.getByRole("button", { name: "Close project details" }).tap();
    await expect(dialog).toBeHidden();
  });
});
