import { env } from './.env';
import { appSetting, subEnvironmentSetting } from './appsettings';

export const environment = {
  production: false,
  version: env['npm_package_version'] + '-dev',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
  // dynamic set apiQuoteUrl using data from assets\config\app-setting-data.json
  apiQuoteUrl: appSetting.apiQuoteUrl,
  // dynamic set apiBaseUrl using data from assets\config\app-setting-data.json by inspecting angular app baseurl
  apiBaseUrl: subEnvironmentSetting[0].apiBaseUrl,
  // dynamic set apiAuthTokenUrl using data from assets\config\app-setting-data.json by inspecting angular app baseurl
  apiAuthTokenUrl: subEnvironmentSetting[0].apiAuthTokenUrl,
};
