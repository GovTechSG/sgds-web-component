# Stylings 

## Global Styles and Theming

Customize the styles at the `:root` level by overriding the values of css tokens defined in file 
`@govtechsg/sgds-web-component/themes/day.css` file. This file contains the primitive and semantic css tokens. For system level UI changes, we encourage you to make primitive and semantic level style changes at the `:root` rather than component specific changes. 

```css
// yourCustomCss.css
:root {
  --sgds-primary: #1f69ff;
  --sgds-success-500: #3bb346;
  --sgds-gray-500: #667085;
}
``` 
``` jsx
import "@govtechsg/sgds-web-component/themes/day.css";
//import your custom css after the themes/day.css .
import "./yourCustomCss.css"
```

### root.css

Primitives and semantic values are defined here. These tokens can also be found in `@govtechsg/sgds-web-component/themes` folder.

<iframe
  src='https://gist.github.com/clukhei/425e29332ec837d9ea4bbe90ff8d4a37.pibb?file=root.css'
  style="width: 100%; height: 300px; border: 0;"
>
</iframe>

### day.css

<iframe
  src='https://gist.github.com/clukhei/425e29332ec837d9ea4bbe90ff8d4a37.pibb?file=day.css'
  style="width: 100%; height: 300px; border: 0;"
>
</iframe>

### night.css

<iframe
  src='https://gist.github.com/clukhei/425e29332ec837d9ea4bbe90ff8d4a37.pibb?file=night.css'
  style="width: 100%; height: 300px; border: 0;"
>
</iframe>



## Component specific styles <sgds-badge show>work in progress</sgds-badge>

<!-- The styles of components are built in and can be modified via cssparts or css custom properties whenever we specify for such styling modificiations. This information will be specified under API section for each component

You will require some knowledge of web components and css to do so and the information can be readily available online like mdn web docs for [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [css](https://developer.mozilla.org/en-US/docs/Web/CSS)

### css custom variable <sgds-badge show>work in progress</sgds-badge>

Some components have defined css custom variable for styling of selected aspects of the element in the shadow DOM. See the API table for the available css custom variables

```css
sgds-sidenav {
  --sidenav-theme-color: pink;
}
```

### cssparts <sgds-badge show>work in progress</sgds-badge>

Some components expose cssparts on selected elements of the shadow DOM. See the API table for each component on the css parts exposed.

```css
sgds-footer::part(footer-bottom) {
  background-color: grey;
  font-family: "Times New Roman", Times, serif;
  border: 10px dotted red;
}
``` -->


