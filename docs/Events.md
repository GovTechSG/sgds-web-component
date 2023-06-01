# Events

While you can listen for common HTML events like onclick, onmouseover etc., it is not recommended to do so. This is because the events emitted within a component's shadow root are retargeted to look like they've come from the host element rather than internal elements to the Shadow DOM. There are also [certain events](https://web.dev/shadowdom-301/#events-that-are-always-stopped) that will never cross the shadow boundary. See [DOM spec](https://dom.spec.whatwg.org/#retarget) and [Shadow Dom 301](https://web.dev/shadowdom-301/#event-model) for better illustration.

Tl;Dr: This may result in, for example, multiple click handlers executing even if the user clicks just once or no events emitted for certain events. 

As such, we recommend you to listen for custom events emitted by SGDS web components over the native HTML events. The emitted custom events, if present, are specified for each component under API table.

```html

<sgds-checkbox>Check me</sgds-checkbox>

<script>
  const checkbox = document.querySelector('sgds-checkbox');
  checkbox.addEventListener('sgds-change', event => {
    console.log(event.target.checked ? 'checked' : 'not checked');
  });
</script>

```