<script setup lang="ts">
import "@webcomponents/scoped-custom-element-registry"
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component"
import Accordion from './components/Accordion.vue'
import Alert from './components/Alert.vue'
import Badge from './components/Badge.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Button from './components/Button.vue'
import Card from './components/Card.vue'
import Checkbox from './components/Checkbox.vue'
import Combobox from './components/Combobox.vue'
import Datepicker from './components/Datepicker.vue'
import DescriptionList from './components/DescriptionList.vue'
import Divider from './components/Divider.vue'
import Drawer from './components/Drawer.vue'
import Dropdown from './components/Dropdown.vue'
import FileUpload from './components/FileUpload.vue'
import Footer from './components/Footer.vue'
import Icon from './components/Icon.vue'
import IconButton from './components/IconButton.vue'
import IconList from './components/IconList.vue'
import Input from './components/Input.vue'
import Link from './components/Link.vue'
import Mainnav from './components/Mainnav.vue'
import Masthead from './components/Masthead.vue'
import Modal from './components/Modal.vue'
import Pagination from './components/Pagination.vue'
import ProgressBar from './components/ProgressBar.vue'
import QuantityToggle from './components/QuantityToggle.vue'
import Radio from './components/Radio.vue'
import Sidenav from './components/Sidenav.vue'
import Skeleton from './components/Skeleton.vue'
import Spinner from './components/Spinner.vue'
import Stepper from './components/Stepper.vue'
import Switch from './components/Switch.vue'
import Tab from './components/Tab.vue'
import Table from './components/Table.vue'
import TableOfContents from './components/TableOfContents.vue'
import Textarea from './components/Textarea.vue'
import Toast from './components/Toast.vue'
import Trigger from './components/Trigger.vue'
</script>

<template>
  <Masthead />
  <Mainnav />

  <body>
    <sgds-template-grid>
      <sgds-content-area>
        <sgds-content-body>
          <Accordion />
          <Alert />
          <Badge />
          <Breadcrumb />
          <Button />
          <Card />
          <Checkbox />
          <Combobox />
          <Datepicker />
          <DescriptionList />
          <Divider />
          <Drawer />
          <Dropdown />
          <FileUpload />
          <Icon />
          <IconButton />
          <IconList />
          <Input />
          <Link />
          <Modal />
          <Pagination />
          <ProgressBar />
          <QuantityToggle />
          <Radio />
          <Sidenav />
          <Skeleton />
          <Spinner />
          <Stepper />
          <Switch />
          <Tab />
          <Table />
          <TableOfContents />
          <Textarea />
          <Toast />
          <Trigger />
        </sgds-content-body>
      </sgds-content-area>
    </sgds-template-grid>
  </body>
  <Footer />
</template>

<style scoped>
body {
  display: flex;
  min-height: 80vh;
  flex-direction: column;
}
</style>
