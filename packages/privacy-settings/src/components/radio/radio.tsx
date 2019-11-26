import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'upc-radio',
  styleUrl: 'radio.scss',
  shadow: true
})
export class Radio {

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true, reflectToAttr: true }) checked = false;
  
  /**
   * The label
   */
  @Prop() label: string;

  /**
   * The name
   */
  @Prop() name: string;

  render() {
    return (
      <label class="es-check">
        <input type="radio" class="es-check-input" name={this.name} checked={this.checked} />
        {this.label}
      </label>
    );
  }
}
