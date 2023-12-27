import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { fileURLToPath } from 'node:url';
import path from 'path';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: 'index.js',
  output: [
    {
      file: `build/chroma.js`,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: `build/chroma.min.js`,
      format: 'esm',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(),
    license({
      sourcemap: true,
      banner: {
        content: {
          file: path.join(__dirname, 'LICENSE'),
        },
      },
    }),
    filesize(),
  ],
};
