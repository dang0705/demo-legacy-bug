import babel from 'rollup-plugin-babel';
import del from 'rollup-plugin-delete';
import { isBuildDefault } from './env';
import outDir from './outDir';
const dir = `${outDir}/public/legacy-bug`;

export default {
  ...(isBuildDefault
    ? {}
    : {
        rollupOptions: {
          output: {
            compact: true,
            dir,
            entryFileNames: `[name]-[hash].js`,
            chunkFileNames: `async/[hash].js`,
            manualChunks: {
              vue: ['vue'],
              'balm-ui': ['balm-ui']
            }
          },
          plugins: [
            babel({
              exclude: 'node_modules/**'
            }),
            del({
              force: true,
              targets: `${dir}/*`,
              hook: 'buildStart'
            })
          ]
        }
      })
};
