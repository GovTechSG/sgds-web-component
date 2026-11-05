import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";
import "./index.css";
import SidebarLayout from "./SidebarLayout";
import AccordionPage from "./pages/accordion";
import AppnavPage from "./pages/appnav";
import AlertLinkPage from "./pages/alertlink";
import AlertPage from "./pages/alert";
import BreadcrumbPage from "./pages/breadcrumb";
import ButtonPage from "./pages/button";
import CardPage from "./pages/card";
import BadgePage from "./pages/badge";
import CloseButtonPage from "./pages/closebutton";
import CheckboxGroupPage from "./pages/checkboxgroup";
import ComboBoxPage from "./pages/combobox";
import DataTablePage from "./pages/datatable";
import DatepickerPage from "./pages/datepicker";
import DescriptionListPage from "./pages/descriptionlist";
import DropdownPage from "./pages/dropdown";
import DividerPage from "./pages/divider";
import DrawerPage from "./pages/drawer";
import FileUploadPage from "./pages/fileupload";
import FooterPage from "./pages/footer";
import IconPage from "./pages/icon";
import IconButtonPage from "./pages/iconbutton";
import IconCardPage from "./pages/iconcard";
import IconListPage from "./pages/iconlist";
import ImageCardPage from "./pages/imagecard";
import InputPage from "./pages/input";
import LinkPage from "./pages/link";
import MainnavPage from "./pages/mainnav";
import MastheadPage from "./pages/masthead";
import ModalPage from "./pages/modal";
import OverflowMenuPage from "./pages/overflowmenu";
import ProgressBarPage from "./pages/progressbar";
import PaginationPage from "./pages/pagination";
import QuantityTogglePage from "./pages/quantitytoggle";
import RadioGroupPage from "./pages/radiogroup";
import SelectPage from "./pages/select";
import SidenavPage from "./pages/sidenav";
import SidebarPage from "./pages/sidebar";
import SkeletonPage from "./pages/skeleton";
import SpinnerPage from "./pages/spinner";
import StepPage from "./pages/step";
import StepperPage from "./pages/stepper";
import SubnavPage from "./pages/subnav";
import SwitchPage from "./pages/switch";
import SystemBannerPage from "./pages/systembanner";
import TabGroupPage from "./pages/tabgroup";
import TablePage from "./pages/table";
import TableOfContentsPage from "./pages/tableofcontents";
import TextareaPage from "./pages/textarea";
import ThumbnailCardPage from "./pages/thumbnailcard";
import TooltipPage from "./pages/tooltip";
import ToastContainerPage from "./pages/toastcontainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SidebarLayout />}>
          <Route index element={<Navigate to="/accordion" replace />} />
          <Route path="/accordion" element={<AccordionPage />} />
          <Route path="/appnav" element={<AppnavPage />} />
          <Route path="/alertlink" element={<AlertLinkPage />} />
          <Route path="/alert" element={<AlertPage />} />
          <Route path="/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="/button" element={<ButtonPage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/badge" element={<BadgePage />} />
          <Route path="/closebutton" element={<CloseButtonPage />} />
          <Route path="/checkboxgroup" element={<CheckboxGroupPage />} />
          <Route path="/combobox" element={<ComboBoxPage />} />
          <Route path="/datatable" element={<DataTablePage />} />
          <Route path="/datepicker" element={<DatepickerPage />} />
          <Route path="/descriptionlist" element={<DescriptionListPage />} />
          <Route path="/dropdown" element={<DropdownPage />} />
          <Route path="/divider" element={<DividerPage />} />
          <Route path="/drawer" element={<DrawerPage />} />
          <Route path="/fileupload" element={<FileUploadPage />} />
          <Route path="/footer" element={<FooterPage />} />
          <Route path="/icon" element={<IconPage />} />
          <Route path="/iconbutton" element={<IconButtonPage />} />
          <Route path="/iconcard" element={<IconCardPage />} />
          <Route path="/iconlist" element={<IconListPage />} />
          <Route path="/imagecard" element={<ImageCardPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/link" element={<LinkPage />} />
          <Route path="/mainnav" element={<MainnavPage />} />
          <Route path="/masthead" element={<MastheadPage />} />
          <Route path="/modal" element={<ModalPage />} />
          <Route path="/overflowmenu" element={<OverflowMenuPage />} />
          <Route path="/progressbar" element={<ProgressBarPage />} />
          <Route path="/pagination" element={<PaginationPage />} />
          <Route path="/quantitytoggle" element={<QuantityTogglePage />} />
          <Route path="/radiogroup" element={<RadioGroupPage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/sidenav" element={<SidenavPage />} />
          <Route path="/sidebar" element={<SidebarPage />} />
          <Route path="/skeleton" element={<SkeletonPage />} />
          <Route path="/spinner" element={<SpinnerPage />} />
          <Route path="/step" element={<StepPage />} />
          <Route path="/stepper" element={<StepperPage />} />
          <Route path="/subnav" element={<SubnavPage />} />
          <Route path="/switch" element={<SwitchPage />} />
          <Route path="/systembanner" element={<SystemBannerPage />} />
          <Route path="/tabgroup" element={<TabGroupPage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/tableofcontents" element={<TableOfContentsPage />} />
          <Route path="/textarea" element={<TextareaPage />} />
          <Route path="/thumbnailcard" element={<ThumbnailCardPage />} />
          <Route path="/tooltip" element={<TooltipPage />} />
          <Route path="/toastcontainer" element={<ToastContainerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
