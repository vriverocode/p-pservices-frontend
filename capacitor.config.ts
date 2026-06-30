import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ppservices.app',
  appName: 'ppservices',
  webDir: 'dist/spa',
  server: {
    androidScheme: 'https'
  }
};

export default config;
