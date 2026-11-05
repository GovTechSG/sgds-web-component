import { Outlet, useLocation, Link } from "react-router-dom";
import { SgdsSidebar, SgdsSidebarItem, SgdsSidebarSection } from "@govtechsg/sgds-web-component/react";

export default function SidebarLayout() {
  const location = useLocation();
  const active = location.pathname.replace("/", "") || "accordion";

  return (
    <div className="sgds:flex sgds:min-h-screen">
      <SgdsSidebar active={active} variant="persistent" className="sgds:h-screen sgds:sticky sgds:top-0">
        <div slot="upper" className="sgds:text-subtitle-sm sgds:font-semibold">SGDS E2E React</div>
        <SgdsSidebarSection name="components" title="Components">
          <SgdsSidebarItem name="accordion" title="Accordion">
            <Link to="/accordion"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="alertlink" title="AlertLink">
            <Link to="/alertlink"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="alert" title="Alert">
            <Link to="/alert"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="badge" title="Badge">
            <Link to="/badge"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="appnav" title="Appnav">
            <Link to="/appnav"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="breadcrumb" title="Breadcrumb">
            <Link to="/breadcrumb"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="button" title="Button">
            <Link to="/button"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="card" title="Card">
            <Link to="/card"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="checkboxgroup" title="CheckboxGroup">
            <Link to="/checkboxgroup"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="closebutton" title="CloseButton">
            <Link to="/closebutton"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="combobox" title="ComboBox">
            <Link to="/combobox"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="datatable" title="DataTable">
            <Link to="/datatable"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="datepicker" title="Datepicker">
            <Link to="/datepicker"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="descriptionlist" title="DescriptionList">
            <Link to="/descriptionlist"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="divider" title="Divider">
            <Link to="/divider"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="drawer" title="Drawer">
            <Link to="/drawer"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="dropdown" title="Dropdown">
            <Link to="/dropdown"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="fileupload" title="FileUpload">
            <Link to="/fileupload"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="footer" title="Footer">
            <Link to="/footer"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="icon" title="Icon">
            <Link to="/icon"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="iconbutton" title="IconButton">
            <Link to="/iconbutton"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="iconcard" title="IconCard">
            <Link to="/iconcard"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="iconlist" title="IconList">
            <Link to="/iconlist"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="imagecard" title="ImageCard">
            <Link to="/imagecard"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="input" title="Input">
            <Link to="/input"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="link" title="Link">
            <Link to="/link"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="masthead" title="Masthead">
            <Link to="/masthead"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="mainnav" title="Mainnav">
            <Link to="/mainnav"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="overflowmenu" title="OverflowMenu">
            <Link to="/overflowmenu"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="modal" title="Modal">
            <Link to="/modal"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="pagination" title="Pagination">
            <Link to="/pagination"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="progressbar" title="ProgressBar">
            <Link to="/progressbar"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="quantitytoggle" title="QuantityToggle">
            <Link to="/quantitytoggle"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="radiogroup" title="RadioGroup">
            <Link to="/radiogroup"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="select" title="Select">
            <Link to="/select"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="sidebar" title="Sidebar">
            <Link to="/sidebar"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="sidenav" title="Sidenav">
            <Link to="/sidenav"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="skeleton" title="Skeleton">
            <Link to="/skeleton"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="stepper" title="Stepper">
            <Link to="/stepper"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="spinner" title="Spinner">
            <Link to="/spinner"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="switch" title="Switch">
            <Link to="/switch"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="tabgroup" title="TabGroup">
            <Link to="/tabgroup"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="systembanner" title="SystemBanner">
            <Link to="/systembanner"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="subnav" title="Subnav">
            <Link to="/subnav"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="tableofcontents" title="TableOfContents">
            <Link to="/tableofcontents"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="table" title="Table">
            <Link to="/table"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="textarea" title="Textarea">
            <Link to="/textarea"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="thumbnailcard" title="ThumbnailCard">
            <Link to="/thumbnailcard"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="toastcontainer" title="ToastContainer">
            <Link to="/toastcontainer"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="tooltip" title="Tooltip">
            <Link to="/tooltip"></Link>
          </SgdsSidebarItem>
        </SgdsSidebarSection>
      </SgdsSidebar>
      <div className="sgds:flex sgds:flex-col sgds:w-full">
        <Outlet />
      </div>
    </div>
  );
}
