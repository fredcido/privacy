# upc-privacy-settings



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type      | Default     |
| ----------- | ------------ | ----------- | --------- | ----------- |
| `baseApi`   | `base-api`   |             | `string`  | `'/'`       |
| `productId` | `product-id` |             | `string`  | `undefined` |
| `settings`  | --           |             | `Setting` | `undefined` |


## Dependencies

### Depends on

- [upc-form](../form)

### Graph
```mermaid
graph TD;
  upc-privacy-settings --> upc-form
  upc-form --> upc-text
  upc-form --> upc-checkbox
  upc-form --> upc-radio
  upc-form --> upc-button
  style upc-privacy-settings fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
