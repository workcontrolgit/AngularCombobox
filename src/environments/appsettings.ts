// function to get base url from the index.html
import { AppSetting } from '@app/@shared/models/app-setting-model';
import { SubEnvironmentSetting } from '@app/@shared/models/sub-environment-setting-model';
import appSettingData from '../assets/config/appsettings.json';

// read the json and assign to EnvironmentConfig interface
export const appSetting = appSettingData as AppSetting;
// filter sub environment record
export const subEnvironmentSetting = appSetting.subEnvironmentSettings.filter(
  (setting: SubEnvironmentSetting) => setting.subEnvironment === DetectSubEnvironment()
);

// get base URL from base tag in the index.html
export function baseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

// function to determine the sub environment localhost or staging, production etc.
export function DetectSubEnvironment() {
  return baseUrl().includes('localhost')
    ? 'localhost'
    : baseUrl().includes('staging')
    ? 'staging'
    : baseUrl().includes('production')
    ? 'production'
    : 'default';
}
