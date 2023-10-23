import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { appSetting, subEnvironmentSetting, baseUrl, DetectSubEnvironment } from '@env/appsettings';
import { Logger } from '@shared';

const log = new Logger('About');

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;
  appSettingValue = JSON.stringify(appSetting);
  subEnvironmentSettingValue = JSON.stringify(subEnvironmentSetting);
  baseUrlValue = baseUrl();
  detectSubEnvironment = DetectSubEnvironment();
  environmentValue = JSON.stringify(environment);

  constructor() {}

  ngOnInit() {
    log.debug('appSetting', this.appSettingValue);
    log.debug('subEnvironmentSetting', this.subEnvironmentSettingValue);
    log.debug('baseUrl', this.baseUrlValue);
    log.debug('detectSubEnvironment', this.detectSubEnvironment);
  }
}
