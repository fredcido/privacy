import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'upc-text',
  styleUrl: 'text.scss',
  shadow: true
})
export class Text {
  
  /**
   * The label
   */
  @Prop() label: string;


  /**
   * The name
   */
  @Prop() name: string;

  /**
   * The initial value. Can be updated at runtime.
   */
  @Prop({ mutable: true, reflectToAttr: true })
  public value: string;

  render() {
    return (
      <label class="es-input-text">
        <input type="text" name={this.name} value={this.value} />
        <span>{this.label}</span>
      </label>
    );
  }
}
