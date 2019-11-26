import { Component, h } from '@stencil/core';

@Component({
  tag: 'upc-theme-secondary',
  styleUrl: 'theme-secondary.scss',
})
export class ThemeSecondary {

  render() {
    return (
      <div>
        <slot />
      </div>
    );
  }
}
