import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

export default defineBoot(({ app }) => {
  const savedLocale = localStorage.getItem('locale') || 'es'

  const i18n = createI18n({
    locale: savedLocale,
    fallbackLocale: 'en-US',
    globalInjection: true,
    messages,
    legacy: false,
  })

  // Set i18n instance on app
  app.use(i18n)
})
