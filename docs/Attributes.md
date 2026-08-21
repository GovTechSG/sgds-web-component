# Attributes and Properties

SGDS web components are configured through **HTML attributes** and their corresponding **JavaScript properties**. Attributes are set in markup; properties are set via JavaScript. They stay in sync automatically.

## String attributes

Pass string values directly in markup.

```html
<sgds-button variant="secondary">Cancel</sgds-button>
<sgds-input placeholder="Enter your name"></sgds-input>
```

Equivalent in JavaScript:

```js
const button = document.querySelector('sgds-button');
button.variant = 'secondary';
```

## Boolean attributes

Boolean properties default to `false`. To set them to `true`, add the attribute with no value. To set them back to `false`, remove the attribute entirely (do not set it to `"false"`).

```html
<!-- true -->
<sgds-input disabled></sgds-input>
<sgds-accordion allowMultiple></sgds-accordion>

<!-- false (attribute removed) -->
<sgds-input></sgds-input>
```

In JavaScript:

```js
const input = document.querySelector('sgds-input');
input.disabled = true;  // adds the attribute
input.disabled = false; // removes the attribute
```

> Setting a boolean attribute to the string `"false"` does **not** make it false. The attribute's mere presence means `true`. Always remove the attribute to disable it.

## Number attributes

Some attributes accept numeric values. Pass them as strings in markup; they are parsed internally.

```html
<sgds-pagination dataLength="50" currentPage="1" itemsPerPage="10"></sgds-pagination>
```

## Object and array attributes

For attributes that accept objects or arrays, you can either pass a JSON string in markup or set the property via JavaScript.

```html
<!-- JSON string in markup -->
<sgds-table rowHeader='["Name", "BirthDate"]'></sgds-table>
```

```js
// JavaScript (preferred for complex data)
const table = document.querySelector('sgds-table');
table.rowHeader = ['Name', 'Birthdate'];
```

> For complex data (nested objects, large arrays), always prefer setting via JavaScript to avoid escaping issues.

## Function properties

Functions cannot be set via HTML attributes. Use JavaScript to assign them.

```js
const comboBox = document.querySelector('sgds-combo-box');
comboBox.filterFunction = (item, inputValue) => item.toLowerCase().includes(inputValue.toLowerCase());
```

