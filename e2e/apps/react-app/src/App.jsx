import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";
import "./index.css";
import SidebarLayout from "./SidebarLayout";
import AccordionPage from "./pages/accordion";
import AlertLinkPage from "./pages/alertlink";
import AlertPage from "./pages/alert";
import AppnavPage from "./pages/appnav";
import BadgePage from "./pages/badge";
import BreadcrumbPage from "./pages/breadcrumb";
import ButtonPage from "./pages/button";
import CardPage from "./pages/card";
import CheckboxGroupPage from "./pages/checkboxgroup";
import CloseButtonPage from "./pages/closebutton";
import ComboBoxPage from "./pages/combobox";
import DataTablePage from "./pages/datatable";
import DatepickerPage from "./pages/datepicker";
import DescriptionListGroupPage from "./pages/descriptionlistgroup";
import DrawerPage from "./pages/drawer";
import DropdownPage from "./pages/dropdown";
import FileUploadPage from "./pages/fileupload";
import IconPage from "./pages/icon";
import FooterPage from "./pages/footer";
import IconButtonPage from "./pages/iconbutton";
import IconListPage from "./pages/iconlist";
import DividerPage from "./pages/divider";
import IconCardPage from "./pages/iconcard";
import InputPage from "./pages/input";
import LinkPage from "./pages/link";
import MainnavPage from "./pages/mainnav";
import ImageCardPage from "./pages/imagecard";
import ModalPage from "./pages/modal";
import OverflowMenuPage from "./pages/overflowmenu";
import MastheadPage from "./pages/masthead";
import ProgressBarPage from "./pages/progressbar";
import PaginationPage from "./pages/pagination";
import QuantityTogglePage from "./pages/quantitytoggle";
import RadioGroupPage from "./pages/radiogroup";
import SelectPage from "./pages/select";
import SidebarPage from "./pages/sidebar";
import SkeletonPage from "./pages/skeleton";
import SidenavPage from "./pages/sidenav";
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
          <Route path="/alertlink" element={<AlertLinkPage />} />
          <Route path="/alert" element={<AlertPage />} />
          <Route path="/appnav" element={<AppnavPage />} />
          <Route path="/badge" element={<BadgePage />} />
          <Route path="/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="/button" element={<ButtonPage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/checkboxgroup" element={<CheckboxGroupPage />} />
          <Route path="/closebutton" element={<CloseButtonPage />} />
          <Route path="/combobox" element={<ComboBoxPage />} />
          <Route path="/datatable" element={<DataTablePage />} />
          <Route path="/datepicker" element={<DatepickerPage />} />
          <Route path="/descriptionlistgroup" element={<DescriptionListGroupPage />} />
          <Route path="/drawer" element={<DrawerPage />} />
          <Route path="/dropdown" element={<DropdownPage />} />
          <Route path="/fileupload" element={<FileUploadPage />} />
          <Route path="/icon" element={<IconPage />} />
          <Route path="/footer" element={<FooterPage />} />
          <Route path="/iconbutton" element={<IconButtonPage />} />
          <Route path="/iconlist" element={<IconListPage />} />
          <Route path="/divider" element={<DividerPage />} />
          <Route path="/iconcard" element={<IconCardPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/link" element={<LinkPage />} />
          <Route path="/mainnav" element={<MainnavPage />} />
          <Route path="/imagecard" element={<ImageCardPage />} />
          <Route path="/modal" element={<ModalPage />} />
          <Route path="/overflowmenu" element={<OverflowMenuPage />} />
          <Route path="/masthead" element={<MastheadPage />} />
          <Route path="/progressbar" element={<ProgressBarPage />} />
          <Route path="/pagination" element={<PaginationPage />} />
          <Route path="/quantitytoggle" element={<QuantityTogglePage />} />
          <Route path="/radiogroup" element={<RadioGroupPage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/sidebar" element={<SidebarPage />} />
          <Route path="/skeleton" element={<SkeletonPage />} />
          <Route path="/sidenav" element={<SidenavPage />} />
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
