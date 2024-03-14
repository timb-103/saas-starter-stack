import path from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: false 
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/plausible',
    "@nuxt/fonts"
  ],
  plausible: {
    domain: 'saasstarterstack.com',
    autoOutboundTracking: true
  },
  content: {
    sources: {
      content: {
        driver: 'fs',
        prefix: '',
        base: path.resolve(__dirname, '../')
      }
    }
  }
})