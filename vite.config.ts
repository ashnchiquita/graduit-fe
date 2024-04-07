import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { ValidateEnv } from "@julr/vite-plugin-validate-env";
import { z } from "zod";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ValidateEnv({
      debug: true,
      validator: "zod",
      schema: {
        VITE_S1_API_URL: z.string().url(),
        VITE_LOGIN_API_URL: z.string().url(),
        VITE_S2_API_URL: z.string().url(),
      },
    }),
  ],
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
