# Attributes and Properties

## String

The web components uses attributes to set the properties. For example, the variant attribute is used to set the variant property of the button and in turn alters its class and changes its color

```html
<sgds-button variant="secondary"></sgds-button>
```

## Boolean

Boolean properties are usually false by default. To set it to true, add it as an attribute with no value on the custom element

```html
<sgds-accordion allowMultiple> ... </sgds-accordion>

<sgds-input disabled></sgds-input>
```

## Objects, Arrays and Functions

Functions have to be passed in via javascript. For attributes that accepts Objects or Arrays, you can pass in as a JSON string or via javascript.

```html
//via JSON string
<sgds-table rowHeader='["Name", "BirthDate"]'></sgds-table>

// via Javascript
<script>
  const table = document.querySelector("sgds-table");
  table.rowHeader = ["Name", "Birthdate"];
</script>
```
