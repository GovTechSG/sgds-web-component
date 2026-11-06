<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Sidebar/index.js";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const active = computed(() => {
  const path = route.path.replace("/", "");
  return path || "accordion";
});
</script>

<template>
  <div class="sgds:flex sgds:min-h-screen">
    <sgds-sidebar :active="active" variant="persistent" class="sgds:h-screen sgds:sticky sgds:top-0">
      <div slot="upper" class="sgds:text-subtitle-sm sgds:font-semibold">SGDS E2E Nuxt</div>
      <sgds-sidebar-section name="components" title="Components">
          <sgds-sidebar-item name="accordion" title="Accordion">
              <NuxtLink to="/accordion"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="alertlink" title="AlertLink">
              <NuxtLink to="/alertlink"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="alert" title="Alert">
              <NuxtLink to="/alert"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="appnav" title="Appnav">
              <NuxtLink to="/appnav"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="badge" title="Badge">
              <NuxtLink to="/badge"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="breadcrumb" title="Breadcrumb">
              <NuxtLink to="/breadcrumb"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="button" title="Button">
              <NuxtLink to="/button"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="card" title="Card">
              <NuxtLink to="/card"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="checkboxgroup" title="CheckboxGroup">
              <NuxtLink to="/checkboxgroup"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="closebutton" title="CloseButton">
              <NuxtLink to="/closebutton"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="combobox" title="ComboBox">
              <NuxtLink to="/combobox"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="datatable" title="DataTable">
              <NuxtLink to="/datatable"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="datepicker" title="Datepicker">
              <NuxtLink to="/datepicker"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="descriptionlistgroup" title="DescriptionListGroup">
              <NuxtLink to="/descriptionlistgroup"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="drawer" title="Drawer">
              <NuxtLink to="/drawer"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="divider" title="Divider">
              <NuxtLink to="/divider"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="dropdown" title="Dropdown">
              <NuxtLink to="/dropdown"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="fileupload" title="FileUpload">
              <NuxtLink to="/fileupload"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="footer" title="Footer">
              <NuxtLink to="/footer"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="icon" title="Icon">
              <NuxtLink to="/icon"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="iconbutton" title="IconButton">
              <NuxtLink to="/iconbutton"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="iconlist" title="IconList">
              <NuxtLink to="/iconlist"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="iconcard" title="IconCard">
              <NuxtLink to="/iconcard"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="input" title="Input">
              <NuxtLink to="/input"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="imagecard" title="ImageCard">
              <NuxtLink to="/imagecard"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="link" title="Link">
              <NuxtLink to="/link"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="mainnav" title="Mainnav">
              <NuxtLink to="/mainnav"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="masthead" title="Masthead">
              <NuxtLink to="/masthead"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="modal" title="Modal">
              <NuxtLink to="/modal"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="overflowmenu" title="OverflowMenu">
              <NuxtLink to="/overflowmenu"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="pagination" title="Pagination">
              <NuxtLink to="/pagination"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="progressbar" title="ProgressBar">
              <NuxtLink to="/progressbar"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="quantitytoggle" title="QuantityToggle">
              <NuxtLink to="/quantitytoggle"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="radiogroup" title="RadioGroup">
              <NuxtLink to="/radiogroup"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="select" title="Select">
              <NuxtLink to="/select"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="sidenav" title="Sidenav">
              <NuxtLink to="/sidenav"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="sidebar" title="Sidebar">
              <NuxtLink to="/sidebar"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="skeleton" title="Skeleton">
              <NuxtLink to="/skeleton"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="spinner" title="Spinner">
              <NuxtLink to="/spinner"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="step" title="Step">
              <NuxtLink to="/step"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="stepper" title="Stepper">
              <NuxtLink to="/stepper"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="subnav" title="Subnav">
              <NuxtLink to="/subnav"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="switch" title="Switch">
              <NuxtLink to="/switch"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="systembanner" title="SystemBanner">
              <NuxtLink to="/systembanner"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="tabgroup" title="TabGroup">
              <NuxtLink to="/tabgroup"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="table" title="Table">
              <NuxtLink to="/table"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="tableofcontents" title="TableOfContents">
              <NuxtLink to="/tableofcontents"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="textarea" title="Textarea">
              <NuxtLink to="/textarea"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="thumbnailcard" title="ThumbnailCard">
              <NuxtLink to="/thumbnailcard"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="toastcontainer" title="ToastContainer">
              <NuxtLink to="/toastcontainer"></NuxtLink>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="tooltip" title="Tooltip">
              <NuxtLink to="/tooltip"></NuxtLink>
            </sgds-sidebar-item>
      </sgds-sidebar-section>
    </sgds-sidebar>
    <div class="sgds:flex sgds:flex-col sgds:w-full">
      <slot />
    </div>
  </div>
</template>
