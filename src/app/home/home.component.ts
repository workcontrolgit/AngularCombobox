import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

import { Logger } from '@shared';

const log = new Logger('Home');

import { appSetting, subEnvironmentSetting, baseUrl, DetectSubEnvironment } from '@env/appsettings';
import { environment } from '@env/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  appSettingValue = JSON.stringify(appSetting);
  subEnvironmentSettingValue = JSON.stringify(subEnvironmentSetting);
  baseUrlValue = baseUrl();
  detectSubEnvironment = DetectSubEnvironment();
  environmentValue = JSON.stringify(environment);

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });

    log.debug('appSetting', this.appSettingValue);
    log.debug('subEnvironmentSetting', this.subEnvironmentSettingValue);
    log.debug('baseUrl', this.baseUrlValue);
    log.debug('detectSubEnvironment', this.detectSubEnvironment);
  }
}
