import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { ValidateEnv } from "@julr/vite-plugin-validate-env";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ValidateEnv()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    host: true,
    port: 5173,
  },
});
