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
          href: 'https://static-00.iconduck.com/assets.00/brain-emoji-2048x1831-7972hbsm.png' // Update with the correct path to your logo
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
