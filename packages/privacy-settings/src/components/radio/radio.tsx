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
   * The id
   */
  @Prop() id: string;

  /**
   * The name
   */
  @Prop() name: string;

  render() {
    return (
      <form-element label={this.label} id={this.id}>
        <input type="radio" name={this.name} checked={this.checked} />
      </form-element>
    );
  }
}
