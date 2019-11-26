import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'upc-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
  
  /**
   * The label
   */
  @Prop() label: string;

  render() {
    return (
      <button>
        {this.label}
      </button>
    );
  }
}
