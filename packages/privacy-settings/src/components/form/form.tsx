import { Component, Prop, h } from '@stencil/core';
import uuidv4 from "uuid/v4";
import { Setting } from '../../models/Setting';
import { Type } from '../../models/Type';

@Component({
  tag: 'upc-form',
  shadow: false
})
export class Form {

  @Prop() settings: Setting;

  render() {
    return (
      <form novalidate>
        {this.settings.elements.map((element) => {
          let node = null;
          switch (element.type) {
            case Type.TEXT:
              node = <upc-text label={element.label} id={uuidv4()} name={element.label}></upc-text>;
              break;
            case Type.CHECKBOX:
              node = <upc-checkbox label={element.label} id={uuidv4()}></upc-checkbox>;
              break;
            case Type.RADIO:
              const name = `${this.settings.id}-${element.label}`;
              node = (
                <fieldset>
                  <legend>{element.label}</legend>
                  {element.options.map(option => <p><upc-radio name={name} label={option.label} id={uuidv4()}></upc-radio></p>)}
                </fieldset>
              );
              break;
          }

          return (
            <div class="element">
              {node}
            </div>
          )
        })}

        <div class="element">
          <upc-button label="Save"></upc-button>
        </div>
      </form>
    );
  }
}
