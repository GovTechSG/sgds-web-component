<script setup lang="ts">
import "@govtechsg/sgds-web-component";
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
      <div slot="upper" class="sgds:text-subtitle-sm sgds:font-semibold">SGDS E2E Vue</div>
      <sgds-sidebar-section name="components" title="Components">
          <sgds-sidebar-item name="accordion" title="Accordion">
              <router-link to="/accordion"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="appnav" title="Appnav">
              <router-link to="/appnav"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="alertlink" title="AlertLink">
              <router-link to="/alertlink"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="alert" title="Alert">
              <router-link to="/alert"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="breadcrumb" title="Breadcrumb">
              <router-link to="/breadcrumb"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="button" title="Button">
              <router-link to="/button"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="card" title="Card">
              <router-link to="/card"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="badge" title="Badge">
              <router-link to="/badge"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="closebutton" title="CloseButton">
              <router-link to="/closebutton"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="checkboxgroup" title="CheckboxGroup">
              <router-link to="/checkboxgroup"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="combobox" title="ComboBox">
              <router-link to="/combobox"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="datatable" title="DataTable">
              <router-link to="/datatable"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="datepicker" title="Datepicker">
              <router-link to="/datepicker"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="descriptionlistgroup" title="DescriptionListGroup">
              <router-link to="/descriptionlistgroup"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="dropdown" title="Dropdown">
              <router-link to="/dropdown"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="divider" title="Divider">
              <router-link to="/divider"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="drawer" title="Drawer">
              <router-link to="/drawer"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="fileupload" title="FileUpload">
              <router-link to="/fileupload"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="footer" title="Footer">
              <router-link to="/footer"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="icon" title="Icon">
              <router-link to="/icon"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="iconbutton" title="IconButton">
              <router-link to="/iconbutton"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="iconcard" title="IconCard">
              <router-link to="/iconcard"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="iconlist" title="IconList">
              <router-link to="/iconlist"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="imagecard" title="ImageCard">
              <router-link to="/imagecard"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="input" title="Input">
              <router-link to="/input"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="link" title="Link">
              <router-link to="/link"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="mainnav" title="Mainnav">
              <router-link to="/mainnav"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="masthead" title="Masthead">
              <router-link to="/masthead"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="modal" title="Modal">
              <router-link to="/modal"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="overflowmenu" title="OverflowMenu">
              <router-link to="/overflowmenu"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="progressbar" title="ProgressBar">
              <router-link to="/progressbar"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="pagination" title="Pagination">
              <router-link to="/pagination"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="quantitytoggle" title="QuantityToggle">
              <router-link to="/quantitytoggle"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="radiogroup" title="RadioGroup">
              <router-link to="/radiogroup"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="select" title="Select">
              <router-link to="/select"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="sidenav" title="Sidenav">
              <router-link to="/sidenav"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="sidebar" title="Sidebar">
              <router-link to="/sidebar"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="skeleton" title="Skeleton">
              <router-link to="/skeleton"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="spinner" title="Spinner">
              <router-link to="/spinner"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="step" title="Step">
              <router-link to="/step"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="stepper" title="Stepper">
              <router-link to="/stepper"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="subnav" title="Subnav">
              <router-link to="/subnav"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="switch" title="Switch">
              <router-link to="/switch"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="systembanner" title="SystemBanner">
              <router-link to="/systembanner"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="tabgroup" title="TabGroup">
              <router-link to="/tabgroup"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="table" title="Table">
              <router-link to="/table"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="tableofcontents" title="TableOfContents">
              <router-link to="/tableofcontents"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="textarea" title="Textarea">
              <router-link to="/textarea"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="thumbnailcard" title="ThumbnailCard">
              <router-link to="/thumbnailcard"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="tooltip" title="Tooltip">
              <router-link to="/tooltip"></router-link>
            </sgds-sidebar-item>
          <sgds-sidebar-item name="toastcontainer" title="ToastContainer">
              <router-link to="/toastcontainer"></router-link>
            </sgds-sidebar-item>
      </sgds-sidebar-section>
    </sgds-sidebar>
    <div class="sgds:flex sgds:flex-col sgds:w-full">
      <router-view />
    </div>
  </div>
</template>
