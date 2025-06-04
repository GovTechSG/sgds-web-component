<template>
  <h2>Table</h2>
  <sgds-table
    rowheader='[{
              "key": "first-name",
              "value": "First Name"
            },
            {
              "key": "last-name",
              "value": "Last Name"
            },
            {
              "key": "email",
              "value": "Email"
            },
            {
              "key": "button",
              "value": "Button"
            },
            {
              "key": "action",
              "value": "Actions"
            }]'
    tabledata='[
            {
              "email": "@alicedoe",
              "first-name": "John", 
              "last-name": "Doe",
              "button":  {
                "id": "email_button",
                "type": "button",
                "fullWidth": true,
                "value": "@alicedoe"
              },
              "action": [{
                "id": "edit_btn",
                "type": "icon-button",
                "value": "edit",
                "variant": "outline"
              },
              {
                "id": "add_btn",
                "type": "icon-button",
                "value": "plus",
                "variant": "outline"
              }]
            },{
              "email": "@alicedoe",
              "first-name": "John", 
              "last-name": "Doe",
              "button":  {
                "id": "email_button",
                "type": "link",
                "value": "@alicedoe",
                "variant": "outline"
              },
              "action": [
              {
                "id": "add_btn",
                "type": "icon-button",
                "value": "three-dots-vertical",
                "variant": "ghost"
              },
              {
                "id": "add_btn",
                "type": "icon-button",
                "value": "trash"
              }]
            }
        ]'
  >
  </sgds-table>

  <sgds-table
    headerPosition="both"
    columnheader='["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]'
    rowheader='[
            {
              "key": "",
              "value": "Day"
            },{
              "key": "first-name",
              "value": "First Name"
            },
            {
              "key": "last-name",
              "value": "Last Name"
            },
            {
              "key": "email",
              "value": "Email"
            },
            {
              "key": "button",
              "value": "Button"
            },
            {
              "key": "action",
              "value": "Actions"
            }]'
    tabledata='[
            {
              "email": "@alicedoe",
              "first-name": "John", 
              "last-name": "Doe",
              "button":  {
                "id": "email_button",
                "type": "button",
                "fullWidth": true,
                "value": "@alicedoe"
              },
              "action": [{
                "id": "edit_btn",
                "type": "icon-button",
                "value": "edit",
                "variant": "outline"
              },
              {
                "id": "add_btn",
                "type": "icon-button",
                "value": "plus",
                "variant": "outline"
              }]
            },{
              "email": "@alicedoe",
              "first-name": "John", 
              "last-name": "Doe",
              "button":  {
                "id": "email_button",
                "type": "link",
                "value": "@alicedoe",
                "variant": "outline"
              },
              "action": [
              {
                "id": "add_btn",
                "type": "icon-button",
                "value": "three-dots-vertical",
                "variant": "ghost"
              },
              {
                "id": "add_btn",
                "type": "icon-button",
                "value": "trash"
              }]
            }
        ]'
  >
  </sgds-table>

  <sgds-table
    headerPosition="horizontal"
    columnheader='["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]'
    rowheader='[{
              "key": "first-name",
              "value": "First Name"
            },
            {
              "key": "last-name",
              "value": "Last Name"
            },
            {
              "key": "email",
              "value": "Email"
            },
            {
              "key": "button",
              "value": "Button"
            },
            {
              "key": "action",
              "value": "Actions"
            }]'
    tabledata='[
            {
              "email": "@alicedoe",
              "first-name": "John", 
              "last-name": "Doe",
              "button":  {
                "id": "email_button",
                "type": "button",
                "fullWidth": true,
                "value": "@alicedoe"
              },
              "action": [{
                "id": "edit_btn",
                "type": "icon-button",
                "value": "edit",
                "variant": "outline"
              },
              {
                "id": "add_btn",
                "type": "icon-button",
                "value": "plus",
                "variant": "outline"
              }]
            },{
              "email": "@alicedoe",
              "first-name": "John", 
              "last-name": "Doe",
              "button":  {
                "id": "email_button",
                "type": "link",
                "value": "@alicedoe",
                "variant": "outline"
              },
              "action": [
              {
                "id": "add_btn",
                "type": "icon-button",
                "value": "three-dots-vertical",
                "variant": "ghost"
              },
              {
                "id": "add_btn",
                "type": "icon-button",
                "value": "trash"
              }]
            }
        ]'
  >
  </sgds-table>
</template>
