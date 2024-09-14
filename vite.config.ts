import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ include: "dist" })],
  build: {
    lib: {
      entry: "src/main.ts",
      name: "dialog-sdk",
      fileName: (format) => `dialog-sdk.${format}.js`,
      formats: ["es"],
    },
  },
});
