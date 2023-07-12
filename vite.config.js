import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// import h5ProdEffectPlugin from 'uni-vite-plugin-h5-prod-effect'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    uni(),
    // 对h5 production环境打包时的特殊处理，否则uni-crazy-router在这个环境会异常
    // h5ProdEffectPlugin(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', 'vue-router'],
      defaultExportByFilename: false,
      dirs: [],
      dts: './src/auto-imports.d.ts',
      vueTemplate: false,
      // resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 8991,
    https: false,
  },
})
