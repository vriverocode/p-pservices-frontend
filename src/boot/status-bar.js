import { defineBoot } from '#q-app/wrappers'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'

export default defineBoot(() => {
  if (Capacitor.isNativePlatform()) {
    StatusBar.setStyle({ style: Style.Light })
    StatusBar.setOverlaysWebView({ overlay: false })
  }
})
