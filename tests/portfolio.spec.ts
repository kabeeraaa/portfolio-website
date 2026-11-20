import { expect, test } from "@playwright/test";
import { certifications, education, researchWork } from "../src/components/data/academics";
import { experience } from "../src/components/data/experience";
import { contact, profile } from "../src/components/data/profile";
import { projects } from "../src/components/data/projects";
import { skillGroups } from "../src/components/data/skills";

test("falls back to Main and preserves hash navigation history", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
  await page.goto("/#/unknown");
  const main = page.getByRole("link", { name: "Main", exact: true });
  const game = page.getByRole("link", { name: "Game", exact: true });
  const mainHeading = page.getByRole("main", { name: "Main portfolio" }).getByRole("heading", { level: 1 });

  await expect(main).toHaveAttribute("aria-current", "page");
  await expect(mainHeading).toHaveCSS("color", "rgb(255, 255, 255)");
  await game.focus();
  await game.press("Enter");
  await expect(page).toHaveURL(/#\/game$/);
  await expect(game).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("main", { name: "Game portfolio" })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/#\/unknown$/);
  await expect(main).toHaveAttribute("aria-current", "page");
  await expect(mainHeading).toBeVisible();
  await page.goForward();
  await expect(page.getByRole("heading", { name: "ABOUT", exact: true })).toBeVisible();

  await main.click();
  await expect(page).toHaveURL(/#\/$/);
  await expect(mainHeading).toBeVisible();
});

test("opens Game project details with the keyboard and restores focus", async ({ page }) => {
  await page.goto("/#/game");
  const projects = page.getByRole("button", { name: "Projects", exact: true });
  await projects.focus();
  await projects.press("Enter");
  await expect(projects).toHaveAttribute("aria-pressed", "true");

  const card = page.getByRole("button", { name: /Kanban Board/ });
  await card.focus();
  await card.press("Space");

  const dialog = page.getByRole("dialog", { name: "Kanban Board" });
  const close = dialog.getByRole("button", { name: "Close project details" });
  await expect(dialog.getByText("MongoDB", { exact: true })).toBeVisible();
  await expect(close).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Main", exact: true })).not.toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(card).toBeFocused();
  await card.click();
  await close.click();
  await expect(dialog).toBeHidden();
  await expect(card).toBeFocused();
  await card.click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(8, 8);
  await expect(dialog).toBeHidden();
});

test("Game arrow keys move focus and Enter or Space selects the panel", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/game");
  const menu = page.getByRole("navigation", { name: "Game sections" });
  const about = menu.getByRole("button", { name: "About", exact: true });
  const contact = menu.getByRole("button", { name: "Contact", exact: true });
  const experience = menu.getByRole("button", { name: "Experience", exact: true });
  const education = menu.getByRole("button", { name: "Education", exact: true });

  await about.focus();
  await page.keyboard.press("ArrowUp");
  await expect(contact).toBeFocused();
  await expect(about).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(experience).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(experience).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "EXPERIENCE", exact: true })).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(education).toBeFocused();
  await page.keyboard.press("Space");
  await expect(education).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "EDUCATION", exact: true })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator("#game-panel")).toBeFocused();
});

test("a short Game dialog scrolls by keyboard and keeps the close control visible", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 400 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/game");
  await page.getByRole("button", { name: "Projects", exact: true }).click();
  const card = page.getByRole("button", { name: /COVID Detection Flask App/ });
  await card.click();
  const dialog = page.getByRole("dialog");
  const close = dialog.getByRole("button", { name: "Close project details" });
  const body = dialog.getByRole("region", { name: "Project description and technologies" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(body).toBeFocused();
  await page.keyboard.press("End");
  await expect.poll(() => body.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  await expect(close).toBeInViewport({ ratio: 1 });
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(card).toBeFocused();
});

for (const viewport of [{ width: 320, height: 640 }, { width: 1280, height: 540 }]) {
  test(`Game research remains reachable at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#/game");
    await page.getByRole("button", { name: "Research", exact: true }).click();
    const lastEntry = page.getByText("Cloud & Security Architecture", { exact: true });
    await lastEntry.scrollIntoViewIfNeeded();
    await expect(lastEntry).toBeInViewport({ ratio: 1 });
    const hasHorizontalOverflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > innerWidth ||
      [...document.querySelectorAll("main, #game-panel")].some(
        (element) => element.scrollWidth > element.clientWidth,
      )
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}

test("Main mobile menu and research disclosure work with the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/");
  const menu = page.getByRole("button", { name: "Toggle menu" });
  const research = page.getByRole("button", { name: "Research", exact: true });

  await menu.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("button", { name: "About", exact: true })).toBeFocused();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await research.focus();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.press("Enter");
  await research.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  await expect(page.locator("#research")).toBeFocused();

  const disclosure = page.getByRole("button", { name: /Adaptive Micro-Segmentation/ });
  const details = page.getByText(/Designed a dynamic micro-segmentation model/);
  const detailPanel = page.locator("#research-details-0");
  await expect(detailPanel).toHaveAttribute("aria-hidden", "true");
  await disclosure.press("Space");
  await expect(disclosure).toHaveAttribute("aria-expanded", "true");
  await expect(detailPanel).toHaveAttribute("aria-hidden", "false");
  await expect(details).toBeInViewport();
  await disclosure.press("Space");
  await expect(disclosure).toHaveAttribute("aria-expanded", "false");
});

test("Main shows the detailed portfolio records", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/");
  const main = page.getByRole("main", { name: "Main portfolio" });

  await expect(main.getByText(profile.summary, { exact: true })).toBeVisible();
  for (const bullet of experience.flatMap((entry) => entry.bullets)) {
    await expect(main.getByText(bullet, { exact: true })).toBeVisible();
  }
  for (const { degree, highlight } of education) {
    await expect(main.getByText(degree, { exact: true })).toBeVisible();
    await expect(main.getByText(highlight, { exact: true })).toBeVisible();
  }
  for (const certification of certifications) {
    await expect(main.getByText(certification, { exact: true })).toBeVisible();
  }
  const mainProjects = main.locator("#projects");
  await expect(mainProjects.getByRole("heading", { level: 3 })).toHaveCount(5);
  for (const { title, description, tech, repositoryUrl } of projects) {
    const card = mainProjects.getByRole("article").filter({
      has: page.getByRole("heading", { name: title, exact: true }),
    });
    await expect(card.getByText(description, { exact: true })).toBeVisible();
    for (const technology of tech) {
      await expect(card.getByText(technology, { exact: true })).toBeVisible();
    }
    const link = card.getByRole("link");
    if (repositoryUrl) {
      await expect(link).toHaveText("View on GitHub");
      await expect(link).toHaveAccessibleName(`View on GitHub — ${title}`);
      await expect(link).toHaveAttribute("href", repositoryUrl);
    } else await expect(link).toHaveCount(0);
  }
  for (const { title, items } of skillGroups) {
    await expect(main.locator("#skills").getByText(title, { exact: true })).toBeVisible();
    for (const skill of items) {
      await expect(main.locator("#skills").getByText(skill, { exact: true })).toBeVisible();
    }
  }
  await expect(main.locator("#about").getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", contact.github.href);
  const contactSection = main.locator("#contact");
  await expect(contactSection.getByRole("link", { name: contact.linkedin.label })).toHaveAttribute("href", contact.linkedin.href);
  await expect(contactSection.getByRole("link", { name: contact.github.label })).toHaveAttribute("href", contact.github.href);
  await expect(contactSection.getByText(contact.location, { exact: true })).toBeVisible();
  await expect(main.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0);
});

test("Game exposes the shared profile, internship, credentials, and contact details", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/game");
  const menu = page.getByRole("navigation", { name: "Game sections" });
  const panel = page.locator("#game-panel");

  await expect(panel.getByText(profile.summary, { exact: true })).toBeVisible();
  await panel.getByText("Core Profile", { exact: true }).click();
  await expect(panel.getByText(profile.status, { exact: true })).toBeVisible();

  await menu.getByRole("button", { name: "Experience" }).click();
  await expect(panel.getByRole("heading", { name: /Shoptaki/ })).toBeVisible();
  await expect(panel.getByText(/hybrid TLS system combining ECDH and post-quantum Kyber-512/)).toBeVisible();
  await panel.getByText("Additional responsibilities", { exact: true }).click();
  for (const bullet of experience.flatMap((entry) => entry.bullets)) {
    await expect(panel.getByText(bullet, { exact: true })).toBeVisible();
  }

  await menu.getByRole("button", { name: "Education" }).click();
  for (const { degree, location, period, highlight } of education) {
    await expect(panel.getByRole("heading", { name: degree, exact: true })).toBeVisible();
    await expect(panel.getByText(`${location} • ${period}`, { exact: true })).toBeVisible();
    await expect(panel.getByText(highlight, { exact: true })).toBeVisible();
  }
  await panel.getByText("Certifications", { exact: true }).click();
  for (const certification of certifications) {
    await expect(panel.getByText(certification, { exact: true })).toBeVisible();
  }

  await menu.getByRole("button", { name: "Contact" }).click();
  await expect(panel.getByText(contact.location)).toBeVisible();
  for (const link of [contact.linkedin, contact.github]) {
    await expect(panel.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
  }
});

test("Game lets visitors expand all six research topics and the skill categories", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/game");
  const menu = page.getByRole("navigation", { name: "Game sections" });
  const panel = page.locator("#game-panel");

  await menu.getByRole("button", { name: "Research" }).click();
  await expect(panel.locator("details")).toHaveCount(6);
  for (const { title, description, details } of researchWork) {
    const trigger = panel.getByText(title, { exact: true });
    await expect(panel.getByText(details, { exact: true })).toBeHidden();
    await trigger.locator("..").press("Enter");
    await expect(panel.getByText(description, { exact: true })).toBeVisible();
    await expect(panel.getByText(details, { exact: true })).toBeVisible();
    await expect(panel.locator("details[open]")).toHaveCount(1);
  }

  await menu.getByRole("button", { name: "Skills" }).click();
  await expect(panel.locator("details")).toHaveCount(4);
  for (const { title, items } of skillGroups) {
    await panel.getByText(title, { exact: true }).click();
    for (const skill of items) {
      await expect(panel.getByText(skill, { exact: true })).toBeVisible();
    }
    await expect(panel.locator("details[open]")).toHaveCount(1);
  }
});

test("Game project dialogs show Main's descriptions, stacks, and repository links", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/game");
  await page.getByRole("button", { name: "Projects", exact: true }).click();
  const panel = page.locator("#game-panel");
  await expect(panel.getByRole("button")).toHaveCount(5);

  for (const { title, tag, description, tech, repositoryUrl } of projects) {
    await panel.getByRole("button", { name: `${title} ${tag}`, exact: true }).click();
    const dialog = page.getByRole("dialog", { name: title, exact: true });
    await expect(dialog.getByText(description, { exact: true })).toBeVisible();
    for (const technology of tech) {
      await expect(dialog.getByText(technology, { exact: true })).toBeVisible();
    }
    const link = dialog.getByRole("link");
    if (repositoryUrl) {
      await expect(link).toHaveText("View on GitHub");
      await expect(link).toHaveAccessibleName(`View on GitHub — ${title}`);
      await expect(link).toHaveAttribute("href", repositoryUrl);
    } else await expect(link).toHaveCount(0);
    await dialog.getByRole("button", { name: "Close project details" }).click();
    await expect(dialog).toBeHidden();
  }
});
