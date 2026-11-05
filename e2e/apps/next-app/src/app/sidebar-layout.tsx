'use client';

import { usePathname } from "next/navigation";
import { SgdsSidebar, SgdsSidebarItem, SgdsSidebarSection } from "@govtechsg/sgds-web-component/react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname.replace("/", "") || "accordion";

  return (
    <div className="sgds:flex sgds:min-h-screen">
      <SgdsSidebar active={active} variant="persistent" className="sgds:h-screen sgds:sticky sgds:top-0">
        <div slot="upper" className="sgds:text-subtitle-sm sgds:font-semibold">SGDS E2E NextJS</div>
        <SgdsSidebarSection name="components" title="Components">
          <SgdsSidebarItem name="accordion" title="Accordion">
            <a href="/accordion"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="alertlink" title="AlertLink">
            <a href="/alertlink"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="alert" title="Alert">
            <a href="/alert"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="badge" title="Badge">
            <a href="/badge"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="appnav" title="Appnav">
            <a href="/appnav"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="breadcrumb" title="Breadcrumb">
            <a href="/breadcrumb"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="button" title="Button">
            <a href="/button"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="card" title="Card">
            <a href="/card"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="checkboxgroup" title="CheckboxGroup">
            <a href="/checkboxgroup"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="closebutton" title="CloseButton">
            <a href="/closebutton"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="combobox" title="ComboBox">
            <a href="/combobox"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="datatable" title="DataTable">
            <a href="/datatable"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="datepicker" title="Datepicker">
            <a href="/datepicker"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="descriptionlist" title="DescriptionList">
            <a href="/descriptionlist"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="divider" title="Divider">
            <a href="/divider"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="drawer" title="Drawer">
            <a href="/drawer"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="dropdown" title="Dropdown">
            <a href="/dropdown"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="fileupload" title="FileUpload">
            <a href="/fileupload"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="footer" title="Footer">
            <a href="/footer"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="icon" title="Icon">
            <a href="/icon"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="iconbutton" title="IconButton">
            <a href="/iconbutton"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="iconcard" title="IconCard">
            <a href="/iconcard"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="iconlist" title="IconList">
            <a href="/iconlist"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="imagecard" title="ImageCard">
            <a href="/imagecard"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="input" title="Input">
            <a href="/input"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="link" title="Link">
            <a href="/link"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="masthead" title="Masthead">
            <a href="/masthead"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="mainnav" title="Mainnav">
            <a href="/mainnav"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="overflowmenu" title="OverflowMenu">
            <a href="/overflowmenu"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="modal" title="Modal">
            <a href="/modal"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="pagination" title="Pagination">
            <a href="/pagination"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="progressbar" title="ProgressBar">
            <a href="/progressbar"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="quantitytoggle" title="QuantityToggle">
            <a href="/quantitytoggle"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="radiogroup" title="RadioGroup">
            <a href="/radiogroup"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="select" title="Select">
            <a href="/select"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="sidebar" title="Sidebar">
            <a href="/sidebar"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="sidenav" title="Sidenav">
            <a href="/sidenav"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="skeleton" title="Skeleton">
            <a href="/skeleton"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="stepper" title="Stepper">
            <a href="/stepper"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="spinner" title="Spinner">
            <a href="/spinner"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="switch" title="Switch">
            <a href="/switch"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="tabgroup" title="TabGroup">
            <a href="/tabgroup"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="systembanner" title="SystemBanner">
            <a href="/systembanner"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="subnav" title="Subnav">
            <a href="/subnav"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="tableofcontents" title="TableOfContents">
            <a href="/tableofcontents"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="table" title="Table">
            <a href="/table"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="textarea" title="Textarea">
            <a href="/textarea"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="thumbnailcard" title="ThumbnailCard">
            <a href="/thumbnailcard"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="toastcontainer" title="ToastContainer">
            <a href="/toastcontainer"></a>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="tooltip" title="Tooltip">
            <a href="/tooltip"></a>
          </SgdsSidebarItem>
        </SgdsSidebarSection>
      </SgdsSidebar>
      <div className="sgds:flex sgds:flex-col sgds:w-full">
        {children}
      </div>
    </div>
  );
}
