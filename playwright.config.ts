import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:4175",
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium", channel: process.env.PLAYWRIGHT_CHANNEL } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  webServer: {
    command: "node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4175 --strictPort",
    url: "http://127.0.0.1:4175",
  },
});
