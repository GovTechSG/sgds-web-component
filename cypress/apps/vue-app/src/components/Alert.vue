<template>
  <sgds-alert variant="info" show dismissible title="Title">
    <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
    <span>This is an Alert component. You may add the dismissible option</span>
  </sgds-alert>
  <sgds-alert variant="success" outlined title="Hello, nice to meet you">
    <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
    <div>
      <p>
        Aww yeah, you successfully read this important
        <sgds-alert-link href="#" target="undefined">alert message</sgds-alert-link>. This example text is going to run
        a bit longer so that you can see how spacing within an alert works with this kind of content.
      </p>
      <hr />
      <p>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>
  </sgds-alert>
</template>
