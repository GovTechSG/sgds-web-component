<script lang="ts" setup>
import "@govtechsg/sgds-web-component/components/Table/index.js"
import "@govtechsg/sgds-web-component/components/Badge/index.js"
import "@govtechsg/sgds-web-component/components/Link/index.js"
import "@govtechsg/sgds-web-component/components/IconButton/index.js"
</script>

<template>
  <sgds-table rowheader="[&quot;#&quot;, &quot;First Names&quot;, &quot;Last Name&quot;, &quot;Username&quot;]"
    tabledata="[
        [&quot;1&quot;, &quot;John&quot;, &quot;Doe&quot;, &quot;@johndoe&quot;],
        [&quot;2&quot;, &quot;Jane&quot;, &quot;Doe&quot;, &quot;@janedoe&quot;],
        [&quot;3&quot;, &quot;Bob&quot;, &quot;Smith&quot;, &quot;@bobsmith&quot;]
    ]"
    hasDefaultSlot
  >
    <sgds-table-row>
      <sgds-table-head>#</sgds-table-head>
      <sgds-table-head>First name</sgds-table-head>
      <sgds-table-head>Last name</sgds-table-head>
      <sgds-table-head>Username</sgds-table-head>
      <sgds-table-head>Action</sgds-table-head>
    </sgds-table-row>

    <sgds-table-row>
      <sgds-table-cell>1</sgds-table-cell>
      <sgds-table-cell>John</sgds-table-cell>
      <sgds-table-cell>Doe</sgds-table-cell>
      <sgds-table-cell>
        <sgds-link>
          <a href="#">@johndoe</a>
        </sgds-link>
      </sgds-table-cell>
      <sgds-table-cell> </sgds-table-cell>
    </sgds-table-row>

    <sgds-table-row>
      <sgds-table-cell>2</sgds-table-cell>
      <sgds-table-cell>Jane</sgds-table-cell>
      <sgds-table-cell>Doe</sgds-table-cell>
      <sgds-table-cell>
        <sgds-link>
          <a href="#">@janedoe</a>
        </sgds-link>
      </sgds-table-cell>
      <sgds-table-cell>
        <sgds-icon-button name="three-dots-vertical"></sgds-icon-button>
      </sgds-table-cell>
    </sgds-table-row>

    <sgds-table-row>
      <sgds-table-cell>3</sgds-table-cell>
      <sgds-table-cell>Bob</sgds-table-cell>
      <sgds-table-cell>Smith</sgds-table-cell>
      <sgds-table-cell>
        <sgds-link>
          <a href="#">@bobsmith</a>
        </sgds-link>
      </sgds-table-cell>
      <sgds-table-cell>
        <sgds-badge outlined> active </sgds-badge>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
</template>