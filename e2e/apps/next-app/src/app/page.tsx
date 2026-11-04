import { Accordion } from "./components/Accordion";
import { AlertLink } from "./components/AlertLink";
import { Alert } from "./components/Alert";
import { Breadcrumb } from "./components/Breadcrumb";
import { Button } from "./components/Button";
import { Appnav } from "./components/Appnav";
import { Badge } from "./components/Badge";
import { Card } from "./components/Card";
import { CheckboxGroup } from "./components/CheckboxGroup";
import { CloseButton } from "./components/CloseButton";
import { ComboBox } from "./components/ComboBox";
import { DataTable } from "./components/DataTable";
import { DescriptionList } from "./components/DescriptionList";
import { Divider } from "./components/Divider";
import { Drawer } from "./components/Drawer";
import { Datepicker } from "./components/Datepicker";
import { Dropdown } from "./components/Dropdown";
import { FileUpload } from "./components/FileUpload";
import { Icon } from "./components/Icon";
import { Footer } from "./components/Footer";
import { IconButton } from "./components/IconButton";
import { IconCard } from "./components/IconCard";
import { IconList } from "./components/IconList";
import { ImageCard } from "./components/ImageCard";
import { Input } from "./components/Input";
import { Link } from "./components/Link";
import { Mainnav } from "./components/Mainnav";
import { OverflowMenu } from "./components/OverflowMenu";
import { Modal } from "./components/Modal";
import { Masthead } from "./components/Masthead";
import { Pagination } from "./components/Pagination";
import { QuantityToggle } from "./components/QuantityToggle";
import { RadioGroup } from "./components/RadioGroup";
import { ProgressBar } from "./components/ProgressBar";
import { Select } from "./components/Select";
import { Sidebar } from "./components/Sidebar";
import { Sidenav } from "./components/Sidenav";
import { Skeleton } from "./components/Skeleton";
import { Spinner } from "./components/Spinner";
import { Stepper } from "./components/Stepper";
import { Subnav } from "./components/Subnav";
import { Switch } from "./components/Switch";
import { SystemBanner } from "./components/SystemBanner";
import { TabGroup } from "./components/TabGroup";
import { Table } from "./components/Table";
import { TableOfContents } from "./components/TableOfContents";
import { Textarea } from "./components/Textarea";
import { ThumbnailCard } from "./components/ThumbnailCard";
import { ToastContainer } from "./components/ToastContainer";
import { Tooltip } from "./components/Tooltip";
import { ComponentNav } from "./components/ComponentNav";

export default function Home() {
  return (
    <main className="sgds-container sgds:py-layout-md">
      <div className="sgds-grid sgds:gap-layout-md">
        <nav className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
          <ComponentNav />
        </nav>
        <div className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:py-layout-md" style={{ display: "grid", rowGap: "var(--sgds-layout-gap-lg)" }}>
          <section id="accordion">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Accordion</h2>
            <Accordion />
          </section>
          <section id="alertlink">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">AlertLink</h2>
            <AlertLink />
          </section>
          <section id="alert">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Alert</h2>
            <Alert />
          </section>
          <section id="breadcrumb">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Breadcrumb</h2>
            <Breadcrumb />
          </section>
          <section id="button">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Button</h2>
            <Button />
          </section>
          <section id="appnav">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Appnav</h2>
            <Appnav />
          </section>
          <section id="badge">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Badge</h2>
            <Badge />
          </section>
          <section id="card">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Card</h2>
            <Card />
          </section>
          <section id="checkboxgroup">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">CheckboxGroup</h2>
            <CheckboxGroup />
          </section>
          <section id="closebutton">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">CloseButton</h2>
            <CloseButton />
          </section>
          <section id="combobox">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">ComboBox</h2>
            <ComboBox />
          </section>
          <section id="datatable">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">DataTable</h2>
            <DataTable />
          </section>
          <section id="descriptionlist">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">DescriptionList</h2>
            <DescriptionList />
          </section>
          <section id="divider">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Divider</h2>
            <Divider />
          </section>
          <section id="drawer">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Drawer</h2>
            <Drawer />
          </section>
          <section id="datepicker">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Datepicker</h2>
            <Datepicker />
          </section>
          <section id="dropdown">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Dropdown</h2>
            <Dropdown />
          </section>
          <section id="fileupload">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">FileUpload</h2>
            <FileUpload />
          </section>
          <section id="icon">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Icon</h2>
            <Icon />
          </section>
          <section id="footer">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Footer</h2>
            <Footer />
          </section>
          <section id="iconbutton">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">IconButton</h2>
            <IconButton />
          </section>
          <section id="iconcard">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">IconCard</h2>
            <IconCard />
          </section>
          <section id="iconlist">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">IconList</h2>
            <IconList />
          </section>
          <section id="imagecard">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">ImageCard</h2>
            <ImageCard />
          </section>
          <section id="input">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Input</h2>
            <Input />
          </section>
          <section id="link">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Link</h2>
            <Link />
          </section>
          <section id="mainnav">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Mainnav</h2>
            <Mainnav />
          </section>
          <section id="overflowmenu">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">OverflowMenu</h2>
            <OverflowMenu />
          </section>
          <section id="modal">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Modal</h2>
            <Modal />
          </section>
          <section id="masthead">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Masthead</h2>
            <Masthead />
          </section>
          <section id="pagination">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Pagination</h2>
            <Pagination />
          </section>
          <section id="quantitytoggle">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">QuantityToggle</h2>
            <QuantityToggle />
          </section>
          <section id="radiogroup">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">RadioGroup</h2>
            <RadioGroup />
          </section>
          <section id="progressbar">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">ProgressBar</h2>
            <ProgressBar />
          </section>
          <section id="select">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Select</h2>
            <Select />
          </section>
          <section id="sidebar">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Sidebar</h2>
            <Sidebar />
          </section>
          <section id="sidenav">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Sidenav</h2>
            <Sidenav />
          </section>
          <section id="skeleton">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Skeleton</h2>
            <Skeleton />
          </section>
          <section id="spinner">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Spinner</h2>
            <Spinner />
          </section>
          <section id="stepper">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Stepper</h2>
            <Stepper />
          </section>
          <section id="subnav">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Subnav</h2>
            <Subnav />
          </section>
          <section id="switch">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Switch</h2>
            <Switch />
          </section>
          <section id="systembanner">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">SystemBanner</h2>
            <SystemBanner />
          </section>
          <section id="tabgroup">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">TabGroup</h2>
            <TabGroup />
          </section>
          <section id="table">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Table</h2>
            <Table />
          </section>
          <section id="tableofcontents">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">TableOfContents</h2>
            <TableOfContents />
          </section>
          <section id="textarea">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Textarea</h2>
            <Textarea />
          </section>
          <section id="thumbnailcard">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">ThumbnailCard</h2>
            <ThumbnailCard />
          </section>
          <section id="toastcontainer">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">ToastContainer</h2>
            <ToastContainer />
          </section>
          <section id="tooltip">
            <h2 className="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-gap-text-sm">Tooltip</h2>
            <Tooltip />
          </section>
        </div>
      </div>
    </main>
  );
}
