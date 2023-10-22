import { SubEnvironmentSetting as SubEnvironmentSetting } from './sub-environment-setting-model';

export interface AppSetting {
  apiQuoteUrl: string;
  subEnvironmentSettings: SubEnvironmentSetting[];
}
