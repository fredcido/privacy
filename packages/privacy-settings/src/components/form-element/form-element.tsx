import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'form-element',
  styleUrl: 'form-element.scss',
  shadow: true
})
export class FormElement {
  /**
   * The label
   */
  @Prop() label: string;

  /**
   * The id
   */
  @Prop() id: string;


  render() {
    return (
      <p class="form-element">
        <label htmlFor={this.id}>{this.label}</label>
        <slot />
      </p>
    );
  }
}
