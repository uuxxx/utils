import { defineConfig, type InputOption } from "rolldown";
import { dts } from "rolldown-plugin-dts";
import { minify } from "rollup-plugin-swc3";

const INPUT: InputOption = {
  lib: "src/lib/index.ts",
  "event-emitter": "src/event-emitter/index.ts",
};

export default defineConfig([
  {
    input: INPUT,
    output: {
      dir: "dist",
      format: "es",
    },
    transform: {
      target: "ES2015",
    },
    plugins: [
      minify({
        compress: true,
        module: true,
        ecma: 2015,
      }),
    ],
    platform: "neutral",
    tsconfig: "tsconfig.json",
  },
  {
    input: {
      ...INPUT,
      types: "src/types/index.ts",
    },
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      dts({
        newContext: true,
        incremental: false,
        build: false,
        emitDtsOnly: true,
        compilerOptions: {
          isolatedDeclarations: true,
        },
      }),
    ],
    platform: "neutral",
    tsconfig: "tsconfig.json",
  },
]);
