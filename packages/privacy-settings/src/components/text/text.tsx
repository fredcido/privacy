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
   * The id
   */
  @Prop() id: string;

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
      <form-element label={this.label} id={this.id}>
        <input type="text" id={this.id} name={this.name} value={this.value} />
      </form-element>
    );
  }
}
