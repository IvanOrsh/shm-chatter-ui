import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  server: {
    proxy: {
      "/api/graphql": {
        target: "http://localhost:3000/graphql", // Target the new NestJS backend URL
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/auth/login": {
        target: "http://localhost:3000/auth/login",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth\/login/, ""),
      },
      "/api/auth/logout": {
        target: "http://localhost:3000/auth/logout",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth\/logout/, ""),
      },
      "api/chats/count": {
        target: "http://localhost:3000/chats/count",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chats\/count/, ""),
      },
    },
  },
});
