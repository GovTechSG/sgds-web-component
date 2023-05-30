# Slots

The [HTMl slot elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) are placeholders inside the web components that you can fill up with your own HTML markups.

There are two kinds of slots: default and named slots. In the storybook documentation, slots are found under the API table with their names. If the name of a slot is <bold>default</bold>, it means that it is a default slot. For all other names, they are named slots.

 Handle the usage of the default slot and named slot as below

1. default slot : `<slot></slot>`

   ```html

   <sgds-button><span>Hello World</span></sgds-button>

   ```

   "Hello World" span element is placed in the default slot

2. named slot : `<slot name="icon"></slot>`

```html

<sgds-button>
  <span>Hello World</span>
  <svg slot="icon"></svg>
</sgds-button>

```

    The svg element with attribute `slot=icon` is placed in the named slot
