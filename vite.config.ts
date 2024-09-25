import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";
dns.setDefaultResultOrder("verbatim");


export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

