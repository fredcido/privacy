import { Component, Prop, h, Watch } from '@stencil/core';
import { Setting } from '../../models/Setting';

import api from '../../utils/api';
import { Theme } from '../../models/Theme';

@Component({
  tag: 'upc-privacy-settings',
  styleUrl: 'privacy-settings.scss',
  shadow: false
})
export class PrivacySettings {

  @Prop()
  public settings: Setting;

  @Prop()
  public productId: string;

  @Prop()
  public baseApi: string = '/';

  @Watch('productId')
  public idChanged() { this.fetchSettings(); }

  fetchSettings() {
    if (!this.productId) return;

    api.get(this.productId, this.baseApi)
    .then(res => res.json())
    .then(settings => {
      this.settings = settings;  
      
    });
  }

  componentWillLoad() {
    this.fetchSettings();
  }

  render() {
    if (!this.settings) {
      return <span>Loading settings...</span>;
    } else {
      let ThemeProvider = 'div';
      switch(this.settings.theme) {
        case Theme.SECONDARY:
          ThemeProvider = 'upc-theme-secondary';
          break;
        default:
          ThemeProvider = 'upc-theme-primary';
      }
      return (
        <ThemeProvider>
          <section class="privacy-settings">
            <h2>{this.settings.label}</h2>
            <upc-form settings={this.settings}></upc-form>
          </section>
        </ThemeProvider>
      );
    }
  }
}
