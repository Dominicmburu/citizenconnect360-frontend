import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from Cypress
    port: 5173, // Ensure this matches your Cypress test URL
    strictPort: true, // Ensures Vite doesn't switch ports if 5173 is busy
    cors: true, // Allow cross-origin requests (useful for Cypress)
    headers: {
      "Referrer-Policy": "no-referrer-when-downgrade",
      "X-Frame-Options": "ALLOWALL",
    },
  },
});
