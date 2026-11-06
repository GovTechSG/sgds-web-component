'use client';

import Link from "next/link";
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
          <SgdsSidebarItem name="alertlink" title="AlertLink">
            <Link href="/alertlink"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="alert" title="Alert">
            <Link href="/alert"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="accordion" title="Accordion">
            <Link href="/accordion"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="badge" title="Badge">
            <Link href="/badge"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="appnav" title="Appnav">
            <Link href="/appnav"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="breadcrumb" title="Breadcrumb">
            <Link href="/breadcrumb"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="button" title="Button">
            <Link href="/button"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="card" title="Card">
            <Link href="/card"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="checkboxgroup" title="CheckboxGroup">
            <Link href="/checkboxgroup"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="closebutton" title="CloseButton">
            <Link href="/closebutton"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="combobox" title="ComboBox">
            <Link href="/combobox"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="datatable" title="DataTable">
            <Link href="/datatable"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="datepicker" title="Datepicker">
            <Link href="/datepicker"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="descriptionlistgroup" title="DescriptionListGroup">
            <Link href="/descriptionlistgroup"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="divider" title="Divider">
            <Link href="/divider"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="drawer" title="Drawer">
            <Link href="/drawer"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="dropdown" title="Dropdown">
            <Link href="/dropdown"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="fileupload" title="FileUpload">
            <Link href="/fileupload"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="footer" title="Footer">
            <Link href="/footer"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="icon" title="Icon">
            <Link href="/icon"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="iconbutton" title="IconButton">
            <Link href="/iconbutton"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="iconcard" title="IconCard">
            <Link href="/iconcard"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="iconlist" title="IconList">
            <Link href="/iconlist"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="imagecard" title="ImageCard">
            <Link href="/imagecard"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="input" title="Input">
            <Link href="/input"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="link" title="Link">
            <Link href="/link"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="mainnav" title="Mainnav">
            <Link href="/mainnav"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="masthead" title="Masthead">
            <Link href="/masthead"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="modal" title="Modal">
            <Link href="/modal"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="overflowmenu" title="OverflowMenu">
            <Link href="/overflowmenu"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="pagination" title="Pagination">
            <Link href="/pagination"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="progressbar" title="ProgressBar">
            <Link href="/progressbar"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="quantitytoggle" title="QuantityToggle">
            <Link href="/quantitytoggle"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="radiogroup" title="RadioGroup">
            <Link href="/radiogroup"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="select" title="Select">
            <Link href="/select"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="sidebar" title="Sidebar">
            <Link href="/sidebar"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="sidenav" title="Sidenav">
            <Link href="/sidenav"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="skeleton" title="Skeleton">
            <Link href="/skeleton"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="spinner" title="Spinner">
            <Link href="/spinner"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="step" title="Step">
            <Link href="/step"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="stepper" title="Stepper">
            <Link href="/stepper"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="subnav" title="Subnav">
            <Link href="/subnav"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="switch" title="Switch">
            <Link href="/switch"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="systembanner" title="SystemBanner">
            <Link href="/systembanner"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="tabgroup" title="TabGroup">
            <Link href="/tabgroup"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="table" title="Table">
            <Link href="/table"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="tableofcontents" title="TableOfContents">
            <Link href="/tableofcontents"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="textarea" title="Textarea">
            <Link href="/textarea"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="thumbnailcard" title="ThumbnailCard">
            <Link href="/thumbnailcard"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="toastcontainer" title="ToastContainer">
            <Link href="/toastcontainer"></Link>
          </SgdsSidebarItem>
          <SgdsSidebarItem name="tooltip" title="Tooltip">
            <Link href="/tooltip"></Link>
          </SgdsSidebarItem>
        </SgdsSidebarSection>
      </SgdsSidebar>
      <div className="sgds:flex sgds:flex-col sgds:w-full">
        {children}
      </div>
    </div>
  );
}
