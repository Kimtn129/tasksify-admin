// vite.config.js
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "file:///home/project/node_modules/vite/dist/node/index.js";
import vue from "file:///home/project/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///home/project/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import tailwind from "file:///home/project/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///home/project/node_modules/autoprefixer/lib/autoprefixer.js";
import eslintPlugin from "file:///home/project/node_modules/vite-plugin-eslint/dist/index.mjs";
import svgLoader from "file:///home/project/node_modules/vite-svg-loader/index.js";
import VueI18nPlugin from "file:///home/project/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";

// configs/paths.config.js
import path from "node:path";
var __vite_injected_original_dirname = "/home/project/configs";
var alias = {
  "@assets": path.resolve(__vite_injected_original_dirname, "../src/assets"),
  "@common": path.resolve(__vite_injected_original_dirname, "../src/common"),
  "@components": path.resolve(__vite_injected_original_dirname, "../src/components"),
  "@composables": path.resolve(__vite_injected_original_dirname, "../src/composables"),
  "@constants": path.resolve(__vite_injected_original_dirname, "../src/constants"),
  "@directives": path.resolve(__vite_injected_original_dirname, "../src/directives"),
  "@helpers": path.resolve(__vite_injected_original_dirname, "../src/helpers"),
  "@layouts": path.resolve(__vite_injected_original_dirname, "../src/layouts"),
  "@plugins": path.resolve(__vite_injected_original_dirname, "../src/plugins"),
  "@views": path.resolve(__vite_injected_original_dirname, "../src/views"),
  "@router": path.resolve(__vite_injected_original_dirname, "../src/router"),
  "@service": path.resolve(__vite_injected_original_dirname, "../src/service"),
  "@store": path.resolve(__vite_injected_original_dirname, "../src/store"),
  "@styles": path.resolve(__vite_injected_original_dirname, "../src/styles"),
  "@utils": path.resolve(__vite_injected_original_dirname, "../src/utils"),
  "@config": path.resolve(__vite_injected_original_dirname, "../src/config"),
  "@mocks": path.resolve(__vite_injected_original_dirname, "../src/mocks")
};

// vite.config.js
var __vite_injected_original_import_meta_url = "file:///home/project/vite.config.js";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, `${process.cwd()}/environments/${mode}`, "");
  console.log(`mode:: ${mode} === ${JSON.stringify(env)}`);
  const processEnvValues = {
    "process.env": Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val
      };
    }, {})
  };
  return {
    server: {
      host: "0.0.0.0",
      port: 5e3,
      strictPort: true,
      hmr: {
        port: 5e3
      },
      allowedHosts: [
        "083c184f-b0fa-4dce-9928-f185caccf8ba-00-kapmq3qtj1lo.pike.replit.dev"
      ]
    },
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    },
    define: processEnvValues,
    plugins: [
      vue(),
      // eslintPlugin(), // Temporarily disabled for initial setup
      svgLoader(),
      VueDevTools(),
      VueI18nPlugin({
        /* options */
        // locale messages resource pre-compile option
        strictMessage: false,
        include: resolve(dirname(fileURLToPath(__vite_injected_original_import_meta_url)), "./public/locales/**")
      })
    ],
    resolve: {
      alias
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiY29uZmlncy9wYXRocy5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZXNvbHZlLCBkaXJuYW1lIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcbmltcG9ydCB0YWlsd2luZCBmcm9tICd0YWlsd2luZGNzcydcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcbmltcG9ydCBWdWVJMThuUGx1Z2luIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXG5cbmltcG9ydCB7IGFsaWFzIH0gZnJvbSAnLi9jb25maWdzL3BhdGhzLmNvbmZpZydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBgJHtwcm9jZXNzLmN3ZCgpfS9lbnZpcm9ubWVudHMvJHttb2RlfWAsICcnKVxuXG4gIGNvbnNvbGUubG9nKGBtb2RlOjogJHttb2RlfSA9PT0gJHtKU09OLnN0cmluZ2lmeShlbnYpfWApXG5cbiAgY29uc3QgcHJvY2Vzc0VudlZhbHVlcyA9IHtcbiAgICAncHJvY2Vzcy5lbnYnOiBPYmplY3QuZW50cmllcyhlbnYpLnJlZHVjZSgocHJldiwgW2tleSwgdmFsXSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW2tleV06IHZhbFxuICAgICAgfVxuICAgIH0sIHt9KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICAgIHBvcnQ6IDUwMDAsXG4gICAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgICAgaG1yOiB7XG4gICAgICAgIHBvcnQ6IDUwMDBcbiAgICAgIH0sXG4gICAgICBhbGxvd2VkSG9zdHM6IFtcbiAgICAgICAgXCIwODNjMTg0Zi1iMGZhLTRkY2UtOTkyOC1mMTg1Y2FjY2Y4YmEtMDAta2FwbXEzcXRqMWxvLnBpa2UucmVwbGl0LmRldlwiXG4gICAgICBdXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgcGx1Z2luczogW3RhaWx3aW5kKCksIGF1dG9wcmVmaXhlcigpXVxuICAgICAgfVxuICAgIH0sXG4gICAgZGVmaW5lOiBwcm9jZXNzRW52VmFsdWVzLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgLy8gZXNsaW50UGx1Z2luKCksIC8vIFRlbXBvcmFyaWx5IGRpc2FibGVkIGZvciBpbml0aWFsIHNldHVwXG4gICAgICBzdmdMb2FkZXIoKSxcbiAgICAgIFZ1ZURldlRvb2xzKCksXG4gICAgICBWdWVJMThuUGx1Z2luKHtcbiAgICAgICAgLyogb3B0aW9ucyAqL1xuICAgICAgICAvLyBsb2NhbGUgbWVzc2FnZXMgcmVzb3VyY2UgcHJlLWNvbXBpbGUgb3B0aW9uXG4gICAgICAgIHN0cmljdE1lc3NhZ2U6IGZhbHNlLFxuICAgICAgICBpbmNsdWRlOiByZXNvbHZlKGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKSwgJy4vcHVibGljL2xvY2FsZXMvKionKVxuICAgICAgfSlcbiAgICBdLFxuXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXNcbiAgICB9XG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Byb2plY3QvY29uZmlnc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC9jb25maWdzL3BhdGhzLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9wcm9qZWN0L2NvbmZpZ3MvcGF0aHMuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuXG5leHBvcnQgY29uc3QgYWxpYXMgPSB7XG4gICdAYXNzZXRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3NyYy9hc3NldHMnKSxcbiAgJ0Bjb21tb24nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL2NvbW1vbicpLFxuICAnQGNvbXBvbmVudHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL2NvbXBvbmVudHMnKSxcbiAgJ0Bjb21wb3NhYmxlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zcmMvY29tcG9zYWJsZXMnKSxcbiAgJ0Bjb25zdGFudHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL2NvbnN0YW50cycpLFxuICAnQGRpcmVjdGl2ZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL2RpcmVjdGl2ZXMnKSxcbiAgJ0BoZWxwZXJzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3NyYy9oZWxwZXJzJyksXG4gICdAbGF5b3V0cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zcmMvbGF5b3V0cycpLFxuICAnQHBsdWdpbnMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL3BsdWdpbnMnKSxcbiAgJ0B2aWV3cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zcmMvdmlld3MnKSxcbiAgJ0Byb3V0ZXInOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL3JvdXRlcicpLFxuICAnQHNlcnZpY2UnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL3NlcnZpY2UnKSxcbiAgJ0BzdG9yZSc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zcmMvc3RvcmUnKSxcbiAgJ0BzdHlsZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL3N0eWxlcycpLFxuICAnQHV0aWxzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3NyYy91dGlscycpLFxuICAnQGNvbmZpZyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zcmMvY29uZmlnJyksXG4gICdAbW9ja3MnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL21vY2tzJylcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxTQUFTLGVBQWU7QUFDMVAsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxtQkFBbUI7OztBQ1R5TixPQUFPLFVBQVU7QUFBcFEsSUFBTSxtQ0FBbUM7QUFFbEMsSUFBTSxRQUFRO0FBQUEsRUFDbkIsV0FBVyxL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
