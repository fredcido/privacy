/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface FormElement {
    /**
    * The id
    */
    'id': string;
    /**
    * The label
    */
    'label': string;
  }
  interface UpcButton {
    /**
    * The label
    */
    'label': string;
  }
  interface UpcCheckbox {
    /**
    * If `true`, the checkbox is selected.
    */
    'checked': boolean;
    /**
    * The id
    */
    'id': string;
    /**
    * The label
    */
    'label': string;
  }
  interface UpcRadio {
    /**
    * If `true`, the checkbox is selected.
    */
    'checked': boolean;
    /**
    * The id
    */
    'id': string;
    /**
    * The label
    */
    'label': string;
    /**
    * The name
    */
    'name': string;
  }
  interface UpcText {
    /**
    * The id
    */
    'id': string;
    /**
    * The label
    */
    'label': string;
    /**
    * The name
    */
    'name': string;
    /**
    * The initial value. Can be updated at runtime.
    */
    'value': string;
  }
}

declare global {


  interface HTMLFormElementElement extends Components.FormElement, HTMLStencilElement {}
  var HTMLFormElementElement: {
    prototype: HTMLFormElementElement;
    new (): HTMLFormElementElement;
  };

  interface HTMLUpcButtonElement extends Components.UpcButton, HTMLStencilElement {}
  var HTMLUpcButtonElement: {
    prototype: HTMLUpcButtonElement;
    new (): HTMLUpcButtonElement;
  };

  interface HTMLUpcCheckboxElement extends Components.UpcCheckbox, HTMLStencilElement {}
  var HTMLUpcCheckboxElement: {
    prototype: HTMLUpcCheckboxElement;
    new (): HTMLUpcCheckboxElement;
  };

  interface HTMLUpcRadioElement extends Components.UpcRadio, HTMLStencilElement {}
  var HTMLUpcRadioElement: {
    prototype: HTMLUpcRadioElement;
    new (): HTMLUpcRadioElement;
  };

  interface HTMLUpcTextElement extends Components.UpcText, HTMLStencilElement {}
  var HTMLUpcTextElement: {
    prototype: HTMLUpcTextElement;
    new (): HTMLUpcTextElement;
  };
  interface HTMLElementTagNameMap {
    'form-element': HTMLFormElementElement;
    'upc-button': HTMLUpcButtonElement;
    'upc-checkbox': HTMLUpcCheckboxElement;
    'upc-radio': HTMLUpcRadioElement;
    'upc-text': HTMLUpcTextElement;
  }
}

declare namespace LocalJSX {
  interface FormElement {
    /**
    * The id
    */
    'id'?: string;
    /**
    * The label
    */
    'label'?: string;
  }
  interface UpcButton {
    /**
    * The label
    */
    'label'?: string;
  }
  interface UpcCheckbox {
    /**
    * If `true`, the checkbox is selected.
    */
    'checked'?: boolean;
    /**
    * The id
    */
    'id'?: string;
    /**
    * The label
    */
    'label'?: string;
  }
  interface UpcRadio {
    /**
    * If `true`, the checkbox is selected.
    */
    'checked'?: boolean;
    /**
    * The id
    */
    'id'?: string;
    /**
    * The label
    */
    'label'?: string;
    /**
    * The name
    */
    'name'?: string;
  }
  interface UpcText {
    /**
    * The id
    */
    'id'?: string;
    /**
    * The label
    */
    'label'?: string;
    /**
    * The name
    */
    'name'?: string;
    /**
    * The initial value. Can be updated at runtime.
    */
    'value'?: string;
  }

  interface IntrinsicElements {
    'form-element': FormElement;
    'upc-button': UpcButton;
    'upc-checkbox': UpcCheckbox;
    'upc-radio': UpcRadio;
    'upc-text': UpcText;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'form-element': LocalJSX.FormElement & JSXBase.HTMLAttributes<HTMLFormElementElement>;
      'upc-button': LocalJSX.UpcButton & JSXBase.HTMLAttributes<HTMLUpcButtonElement>;
      'upc-checkbox': LocalJSX.UpcCheckbox & JSXBase.HTMLAttributes<HTMLUpcCheckboxElement>;
      'upc-radio': LocalJSX.UpcRadio & JSXBase.HTMLAttributes<HTMLUpcRadioElement>;
      'upc-text': LocalJSX.UpcText & JSXBase.HTMLAttributes<HTMLUpcTextElement>;
    }
  }
}


