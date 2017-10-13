import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { OverviewPage } from '../overview/overview';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OverviewPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
