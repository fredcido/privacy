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

  /**
   * The id
   */
  @Prop() id: string;


  render() {
    return (
      <form-element label={this.label} id={this.id}>
        <input type="checkbox" checked={this.checked} id={this.id} />
      </form-element>
    );
  }
}
