import { resolve } from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        productIndex: resolve(__dirname, "src/product_pages/index.html"),
        productMarmot: resolve(__dirname, "src/product_pages/marmot-ajax-3.html"),
        productAlpine: resolve(__dirname, "src/product_pages/northface-alpine-3.html"),
        productTalus: resolve(__dirname, "src/product_pages/northface-talus-4.html"),
      },
    },
  },

  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "public/json/**/*",
          dest: "json",
        },
        {
          src: "public/images/**/*",
          dest: "images",
        },
      ],
    }),
  ],
});
