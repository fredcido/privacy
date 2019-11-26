import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'upc-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: false
})
export class Checkbox {

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true }) checked = false;
  
  /**
   * The label
   */
  @Prop() label: string;

  render() {
    return (
      <label class="es-check">
        <input type="checkbox" class="es-check-input" checked={this.checked} />
        {this.label}
      </label>
    );
  }
}
