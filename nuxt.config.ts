// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: [
    '@/assets/css/styles.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
        },
        {
          rel: 'icon', // Use 'icon' for favicon or 'image/png' for other logos
          type: 'image/png', // Adjust type based on your logo format
          href: 'https://em-content.zobj.net/source/apple/285/brain_1f9e0.png' // Update with the correct path to your logo
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      username: process.env.API_USERNAME || '', 
      baseURL: process.env.BASE_URL || '', 
      password: process.env.API_PASSWORD || '', 
    },
  },
});
