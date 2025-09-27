import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pezzaliapp.donkeykong',
  appName: 'DonkeyKong',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    allowNavigation: ['*']
  },
  ios: {
    contentInset: 'always',
    backgroundColor: '#000000'
  }
};

export default config;
