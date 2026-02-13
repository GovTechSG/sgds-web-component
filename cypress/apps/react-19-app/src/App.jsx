import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component";

import "./index.css";
import { Accordion } from "./components/Accordion";
import { Alert } from "./components/Alert";
import { Badge } from "./components/Badge";
import { Breadcrumb } from "./components/Breadcrumb";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Combobox } from "./components/Combobox";
import { Datepicker } from "./components/Datepicker";
import { Divider } from "./components/Divider";
import { Drawer } from "./components/Drawer";
import { Dropdown } from "./components/Dropdown";
import { FileUpload } from "./components/FileUpload";
import { Footer } from "./components/Footer";
import { Input } from "./components/Input";
import { Mainnav } from "./components/Mainnav";
import { Masthead } from "./components/Masthead";
import { Modal } from "./components/Modal";
import { Pagination } from "./components/Pagination";
import { ProgressBar } from "./components/ProgressBar";
import { QuantityToggle } from "./components/QuantityToggle";
import { Radio } from "./components/Radio";
import { Select } from "./components/Select";
import { Sidenav } from "./components/Sidenav";
import { Spinner } from "./components/Spinner";
import { Skeleton } from "./components/Skeleton";
import { Stepper } from "./components/Stepper";
import { Tab } from "./components/Tab";
import { Table } from "./components/Table";
import { Textarea } from "./components/Textarea";
import { Toast } from "./components/Toast";
import { Tooltip } from "./components/Tooltip";
import { IconButton } from "./components/IconButton";
import { SgdsTokensShowcase } from "./components/SgdsTokensShowcase";


function App() {

  return (
    <>
    <SgdsTokensShowcase />
    <Select />
    <Masthead />
      <Mainnav />
      <IconButton />
      <Accordion />
      <Alert />
      <Badge />
      <Breadcrumb />
      <Button />
      <Card />
      <Combobox />
      <Datepicker />
      <Drawer />
      <Divider />
      <Dropdown />
      <FileUpload />
      <Input />
      <Modal />
      <Pagination />
      <ProgressBar />
      <QuantityToggle />
      <Radio />
      <Sidenav />
      <Spinner />
      <Skeleton />
      <Stepper />
      <Tab />
      <Table />
      <Textarea />
      <Toast />
      <Tooltip />
      <Footer />
    </>
  )
}

export default App
