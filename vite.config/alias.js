const path = require('path');
const workspace = path.join(__dirname, '..');
const resolve = (src) => path.resolve(workspace, src);
module.exports = {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      '@': resolve('src'),
      comp: resolve('src/components'),
      control: resolve('src/components/control'),
      controlMixins: resolve('src/components/control/mixins')
    }
  }
};
