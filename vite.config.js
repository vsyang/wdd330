import { resolve } from "path";
import { defineConfig } from "vite";
// Import the plugin to copy static assets
//import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },
  // Configure the plugin to copy the 'json' and 'images' directories to the build output
  //plugins: [
  //  viteStaticCopy({
  //    targets: [
  //      {
  //        src: "json",
  //        dest: "",
  //      },
  //      { src: "images", dest: "" },
   //   ],
   // }),
  //],
});
