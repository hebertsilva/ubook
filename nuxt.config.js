import { resolve } from 'path'
import routes from './src/pages'
import envs from './src/envs'
import serverMiddleware from './src/server'

function getAPITree () {
  const api = require(resolve(__dirname, 'src/server/resources'))
  return Object.keys(api.default)
    .reduce((rObj, resource) => {
      return {
        ...rObj,
        [resource]: Object.keys(api.default[resource])
          .reduce((mObj, method) => {
            return { ...mObj, [method]: true }
          }, {})
      }
    }, {})
}

const optionsBabel = {
  useBuiltIns: 'entry',
  targets: { ie: 11 }
}

export default {
  serverMiddleware,
  mode: 'spa',
  srcDir: 'src',
  ssr: false,
  head: {
    title: 'Ubook',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'manifest', href: '/favicon/site.webmanifest' },
      { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#5bbad5' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },
      {
        rel: 'prefetch',
        href: 'https://fonts.googleapis.com/css?family=Roboto:400,500',
        as: 'font',
        family: 'Lato',
        onload: 'this.rel="stylesheet"'
      }
    ]
  },

  router: {
    middleware: 'stats',
    extendRoutes: (nuxtRoutes, resolve) => {
      nuxtRoutes.splice(0, nuxtRoutes.length, ...routes.map((route) => {
        return {
          ...route,
          component: resolve(__dirname, route.component)
        }
      }))
    }
  },
  modules: [
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      resolve(__dirname, 'src/sass/main.scss')
    ]
  },
  axios: {
    credentials: true,
    baseURL: envs.API_PROXY_BASE
  },
  loading: { color: '#fff' },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  plugins: [
    '~/plugins/api',
    '~/plugins/element-ui',
    '~/plugins/v-mask'
  ],
  buildModules: [
  ],
  build: {
    optimizeCSS: true,
    cssSourceMap: false,
    extractCSS: false,
    cache: true,
    publicPath: envs.PUBLIC_PATH,
    templates: [{
      options: { api: getAPITree() },
      src: './src/api.js.template',
      dst: '../src/api.js'
    }],
    extend (config, ctx) {
      // Test
      config.node = {
        fs: 'empty'
      }

      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    },
    babel: {
      babelrc: true,
      presets ({ isServer }) {
        return [
          ['@nuxt/babel-preset-app', optionsBabel]
        ]
      }
    },
    transpile: [
      'dotenv'
    ]
  }
}
