import pkg from './package'

const config = require(`./config/${process.env.NODE_ENV}/en.js`);

export default {
  mode: 'spa',
  server: {
    port: 8000
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/tailwind.css',
    { src: '~assets/css/global.scss', lang: 'scss' }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vee-validate.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: config.API_URL || 'http://localhost:8080'
  },
  /*
   ** Auth module configuration
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'jwt' },
          user: { url: 'user_data', method: 'get', propertyName: false },
          logout: false
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['vee-validate/dist/rules'],
    extend(config, ctx) {}
  }
}
