import { Component, h } from '@stencil/core';

@Component({
  tag: 'upc-theme-primary',
  styleUrl: 'theme-primary.scss',
})
export class ThemePrimary {

  render() {
    return (
      <div>
        <slot />
      </div>
    );
  }
}
