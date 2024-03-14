import path from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: false 
  },
  modules: [
    '@nuxt/content', 
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/plausible'
  ],
  plausible: {
    domain: 'saasstarterstack.com',
  },
  googleFonts: {
    families: { 
      Inter: [300, 400, 500, 600, 700, 800, 900] 
    },
    display: 'swap'
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
