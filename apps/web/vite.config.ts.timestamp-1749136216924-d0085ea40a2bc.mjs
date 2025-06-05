// vite.config.ts
import { defineConfig } from "file:///Users/kimsunmin/workspace/my/deploy-board/node_modules/vite/dist/node/index.js";
import react from "file:///Users/kimsunmin/workspace/my/deploy-board/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { TanStackRouterVite } from "file:///Users/kimsunmin/workspace/my/deploy-board/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import path from "node:path";
import tailwindcss from "file:///Users/kimsunmin/workspace/my/deploy-board/node_modules/@tailwindcss/vite/dist/index.mjs";
import { copyFileSync } from "node:fs";
import dotenv from "file:///Users/kimsunmin/workspace/my/deploy-board/node_modules/dotenv/lib/main.js";

// ../../packages/env/index.ts
var ENV = {
  SERVER_PORT: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 8e3,
  SERVER_URI: process.env.SERVER_URI || "http://localhost",
  WS_SERVER_PORT: process.env.WS_SERVER_PORT ? parseInt(process.env.WS_SERVER_PORT, 10) : 8e3,
  WS_SERVER_URI: process.env.WS_SERVER_URI || "http://localhost",
  CLIENT_PORT: process.env.CLIENT_PORT ? parseInt(process.env.CLIENT_PORT, 10) : 3e3,
  CLIENT_URI: process.env.CLIENT_URI || "http://localhost"
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/kimsunmin/workspace/my/deploy-board/apps/web";
dotenv.config({ path: path.resolve(__vite_injected_original_dirname, "../../.env") });
var vite_config_default = defineConfig(() => {
  return {
    server: {
      port: ENV.CLIENT_PORT,
      allowedHosts: [ENV.CLIENT_URI]
    },
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      tailwindcss(),
      react(),
      {
        name: "generate-404-html",
        // 플러그인 이름
        apply: "build",
        // build 단계에서 실행
        closeBundle() {
          try {
            copyFileSync("dist/index.html", "dist/404.html");
            console.log("\u2705 404.html created successfully");
          } catch (error) {
            console.error("\u274C Failed to create 404.html:", error);
          }
        }
      }
    ],
    base: "/",
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") },
        { find: "@repo", replacement: path.resolve(__vite_injected_original_dirname, "../../packages") }
      ]
    },
    build: {
      outDir: "dist",
      emptyOutDir: true
    },
    define: {
      "process.env": process.env
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vLi4vcGFja2FnZXMvZW52L2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2tpbXN1bm1pbi93b3Jrc3BhY2UvbXkvZGVwbG95LWJvYXJkL2FwcHMvd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva2ltc3VubWluL3dvcmtzcGFjZS9teS9kZXBsb3ktYm9hcmQvYXBwcy93ZWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tpbXN1bm1pbi93b3Jrc3BhY2UvbXkvZGVwbG95LWJvYXJkL2FwcHMvd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSAnQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJztcbmltcG9ydCB7IGNvcHlGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IHsgRU5WIH0gZnJvbSAnLi4vLi4vcGFja2FnZXMvZW52JztcblxuZG90ZW52LmNvbmZpZyh7IHBhdGg6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8uZW52JykgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiBFTlYuQ0xJRU5UX1BPUlQsXG4gICAgICBhbGxvd2VkSG9zdHM6IFtFTlYuQ0xJRU5UX1VSSV0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBUYW5TdGFja1JvdXRlclZpdGUoeyB0YXJnZXQ6ICdyZWFjdCcsIGF1dG9Db2RlU3BsaXR0aW5nOiB0cnVlIH0pLFxuICAgICAgdGFpbHdpbmRjc3MoKSxcbiAgICAgIHJlYWN0KCksXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdnZW5lcmF0ZS00MDQtaHRtbCcsIC8vIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUM3NzRcdUI5ODRcbiAgICAgICAgYXBwbHk6ICdidWlsZCcsIC8vIGJ1aWxkIFx1QjJFOFx1QUNDNFx1QzVEMFx1QzExQyBcdUMyRTRcdUQ1ODlcbiAgICAgICAgY2xvc2VCdW5kbGUoKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvcHlGaWxlU3luYygnZGlzdC9pbmRleC5odG1sJywgJ2Rpc3QvNDA0Lmh0bWwnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdcdTI3MDUgNDA0Lmh0bWwgY3JlYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignXHUyNzRDIEZhaWxlZCB0byBjcmVhdGUgNDA0Lmh0bWw6JywgZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBiYXNlOiAnLycsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAgeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgfSxcbiAgICAgICAgeyBmaW5kOiAnQHJlcG8nLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3BhY2thZ2VzJykgfVxuICAgICAgXSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6ICdkaXN0JyxcbiAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICAncHJvY2Vzcy5lbnYnOiBwcm9jZXNzLmVudixcbiAgICB9LFxuICB9XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2tpbXN1bm1pbi93b3Jrc3BhY2UvbXkvZGVwbG95LWJvYXJkL3BhY2thZ2VzL2VudlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2tpbXN1bm1pbi93b3Jrc3BhY2UvbXkvZGVwbG95LWJvYXJkL3BhY2thZ2VzL2Vudi9pbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva2ltc3VubWluL3dvcmtzcGFjZS9teS9kZXBsb3ktYm9hcmQvcGFja2FnZXMvZW52L2luZGV4LnRzXCI7ZXhwb3J0IGNvbnN0IEVOViA9IHtcbiAgICBTRVJWRVJfUE9SVDogcHJvY2Vzcy5lbnYuU0VSVkVSX1BPUlQgPyBwYXJzZUludChwcm9jZXNzLmVudi5TRVJWRVJfUE9SVCwgMTApIDogODAwMCxcbiAgICBTRVJWRVJfVVJJOiBwcm9jZXNzLmVudi5TRVJWRVJfVVJJIHx8ICdodHRwOi8vbG9jYWxob3N0JyxcblxuICAgIFdTX1NFUlZFUl9QT1JUOiBwcm9jZXNzLmVudi5XU19TRVJWRVJfUE9SVCA/IHBhcnNlSW50KHByb2Nlc3MuZW52LldTX1NFUlZFUl9QT1JULCAxMCkgOiA4MDAwLFxuICAgIFdTX1NFUlZFUl9VUkk6IHByb2Nlc3MuZW52LldTX1NFUlZFUl9VUkkgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnLFxuXG4gICAgQ0xJRU5UX1BPUlQ6IHByb2Nlc3MuZW52LkNMSUVOVF9QT1JUID8gcGFyc2VJbnQocHJvY2Vzcy5lbnYuQ0xJRU5UX1BPUlQsIDEwKSA6IDMwMDAsXG4gICAgQ0xJRU5UX1VSSTogcHJvY2Vzcy5lbnYuQ0xJRU5UX1VSSSB8fCAnaHR0cDovL2xvY2FsaG9zdCdcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJVLFNBQVMsb0JBQTZCO0FBQ2pYLE9BQU8sV0FBVztBQUNsQixTQUFTLDBCQUEwQjtBQUNuQyxPQUFPLFVBQVU7QUFDakIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxZQUFZOzs7QUNOK1QsSUFBTSxNQUFNO0FBQUEsRUFDMVYsYUFBYSxRQUFRLElBQUksY0FBYyxTQUFTLFFBQVEsSUFBSSxhQUFhLEVBQUUsSUFBSTtBQUFBLEVBQy9FLFlBQVksUUFBUSxJQUFJLGNBQWM7QUFBQSxFQUV0QyxnQkFBZ0IsUUFBUSxJQUFJLGlCQUFpQixTQUFTLFFBQVEsSUFBSSxnQkFBZ0IsRUFBRSxJQUFJO0FBQUEsRUFDeEYsZUFBZSxRQUFRLElBQUksaUJBQWlCO0FBQUEsRUFFNUMsYUFBYSxRQUFRLElBQUksY0FBYyxTQUFTLFFBQVEsSUFBSSxhQUFhLEVBQUUsSUFBSTtBQUFBLEVBQy9FLFlBQVksUUFBUSxJQUFJLGNBQWM7QUFDMUM7OztBRFRBLElBQU0sbUNBQW1DO0FBU3pDLE9BQU8sT0FBTyxFQUFFLE1BQU0sS0FBSyxRQUFRLGtDQUFXLFlBQVksRUFBRSxDQUFDO0FBRTdELElBQU8sc0JBQVEsYUFBYSxNQUFNO0FBQ2hDLFNBQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNOLE1BQU0sSUFBSTtBQUFBLE1BQ1YsY0FBYyxDQUFDLElBQUksVUFBVTtBQUFBLElBQy9CO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxtQkFBbUIsRUFBRSxRQUFRLFNBQVMsbUJBQW1CLEtBQUssQ0FBQztBQUFBLE1BQy9ELFlBQVk7QUFBQSxNQUNaLE1BQU07QUFBQSxNQUNOO0FBQUEsUUFDRSxNQUFNO0FBQUE7QUFBQSxRQUNOLE9BQU87QUFBQTtBQUFBLFFBQ1AsY0FBYztBQUNaLGNBQUk7QUFDRix5QkFBYSxtQkFBbUIsZUFBZTtBQUMvQyxvQkFBUSxJQUFJLHNDQUFpQztBQUFBLFVBQy9DLFNBQVMsT0FBTztBQUNkLG9CQUFRLE1BQU0scUNBQWdDLEtBQUs7QUFBQSxVQUNyRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsRUFBRSxNQUFNLEtBQUssYUFBYSxLQUFLLFFBQVEsa0NBQVcsS0FBSyxFQUFFO0FBQUEsUUFDekQsRUFBRSxNQUFNLFNBQVMsYUFBYSxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCLEVBQUU7QUFBQSxNQUMxRTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixlQUFlLFFBQVE7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
