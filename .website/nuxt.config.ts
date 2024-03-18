import path from 'path';

export default defineNuxtConfig({
  devtools: { 
    enabled: true 
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/plausible',
    '@nuxt/fonts',
    'nuxt-og-image'
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
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { 
          name: 'description', 
          content: 'A curated list of free and affordable tools for building a SaaS.'
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@timb03' }
      ]
    },
  },
  site: {
    url: 'https://saasstarterstack.com',
  },
})