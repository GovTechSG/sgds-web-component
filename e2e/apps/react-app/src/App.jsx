import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";
import "./index.css";
import SidebarLayout from "./SidebarLayout";
import AccordionPage from "./pages/accordion";
import BadgePage from "./pages/badge";
import BreadcrumbPage from "./pages/breadcrumb";
import ButtonPage from "./pages/button";
import CardPage from "./pages/card";
import CheckboxGroupPage from "./pages/checkboxgroup";
import CloseButtonPage from "./pages/closebutton";
import ComboBoxPage from "./pages/combobox";
import AlertLinkPage from "./pages/alertlink";
import AlertPage from "./pages/alert";
import DataTablePage from "./pages/datatable";
import AppnavPage from "./pages/appnav";
import DescriptionListGroupPage from "./pages/descriptionlistgroup";
import DatepickerPage from "./pages/datepicker";
import DividerPage from "./pages/divider";
import DrawerPage from "./pages/drawer";
import FileUploadPage from "./pages/fileupload";
import IconPage from "./pages/icon";
import DropdownPage from "./pages/dropdown";
import IconButtonPage from "./pages/iconbutton";
import FooterPage from "./pages/footer";
import IconListPage from "./pages/iconlist";
import IconCardPage from "./pages/iconcard";
import InputPage from "./pages/input";
import MainnavPage from "./pages/mainnav";
import LinkPage from "./pages/link";
import ModalPage from "./pages/modal";
import MastheadPage from "./pages/masthead";
import PaginationPage from "./pages/pagination";
import OverflowMenuPage from "./pages/overflowmenu";
import ProgressBarPage from "./pages/progressbar";
import ImageCardPage from "./pages/imagecard";
import QuantityTogglePage from "./pages/quantitytoggle";
import RadioGroupPage from "./pages/radiogroup";
import SelectPage from "./pages/select";
import SidenavPage from "./pages/sidenav";
import SidebarPage from "./pages/sidebar";
import SkeletonPage from "./pages/skeleton";
import SubnavPage from "./pages/subnav";
import StepPage from "./pages/step";
import StepperPage from "./pages/stepper";
import SwitchPage from "./pages/switch";
import SpinnerPage from "./pages/spinner";
import TabGroupPage from "./pages/tabgroup";
import SystemBannerPage from "./pages/systembanner";
import TablePage from "./pages/table";
import TableOfContentsPage from "./pages/tableofcontents";
import ThumbnailCardPage from "./pages/thumbnailcard";
import ToastContainerPage from "./pages/toastcontainer";
import TextareaPage from "./pages/textarea";
import TooltipPage from "./pages/tooltip";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SidebarLayout />}>
          <Route index element={<Navigate to="/accordion" replace />} />
          <Route path="/accordion" element={<AccordionPage />} />
          <Route path="/badge" element={<BadgePage />} />
          <Route path="/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="/button" element={<ButtonPage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/checkboxgroup" element={<CheckboxGroupPage />} />
          <Route path="/closebutton" element={<CloseButtonPage />} />
          <Route path="/combobox" element={<ComboBoxPage />} />
          <Route path="/alertlink" element={<AlertLinkPage />} />
          <Route path="/alert" element={<AlertPage />} />
          <Route path="/datatable" element={<DataTablePage />} />
          <Route path="/appnav" element={<AppnavPage />} />
          <Route path="/descriptionlistgroup" element={<DescriptionListGroupPage />} />
          <Route path="/datepicker" element={<DatepickerPage />} />
          <Route path="/divider" element={<DividerPage />} />
          <Route path="/drawer" element={<DrawerPage />} />
          <Route path="/fileupload" element={<FileUploadPage />} />
          <Route path="/icon" element={<IconPage />} />
          <Route path="/dropdown" element={<DropdownPage />} />
          <Route path="/iconbutton" element={<IconButtonPage />} />
          <Route path="/footer" element={<FooterPage />} />
          <Route path="/iconlist" element={<IconListPage />} />
          <Route path="/iconcard" element={<IconCardPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/mainnav" element={<MainnavPage />} />
          <Route path="/link" element={<LinkPage />} />
          <Route path="/modal" element={<ModalPage />} />
          <Route path="/masthead" element={<MastheadPage />} />
          <Route path="/pagination" element={<PaginationPage />} />
          <Route path="/overflowmenu" element={<OverflowMenuPage />} />
          <Route path="/progressbar" element={<ProgressBarPage />} />
          <Route path="/imagecard" element={<ImageCardPage />} />
          <Route path="/quantitytoggle" element={<QuantityTogglePage />} />
          <Route path="/radiogroup" element={<RadioGroupPage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/sidenav" element={<SidenavPage />} />
          <Route path="/sidebar" element={<SidebarPage />} />
          <Route path="/skeleton" element={<SkeletonPage />} />
          <Route path="/subnav" element={<SubnavPage />} />
          <Route path="/step" element={<StepPage />} />
          <Route path="/stepper" element={<StepperPage />} />
          <Route path="/switch" element={<SwitchPage />} />
          <Route path="/spinner" element={<SpinnerPage />} />
          <Route path="/tabgroup" element={<TabGroupPage />} />
          <Route path="/systembanner" element={<SystemBannerPage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/tableofcontents" element={<TableOfContentsPage />} />
          <Route path="/thumbnailcard" element={<ThumbnailCardPage />} />
          <Route path="/toastcontainer" element={<ToastContainerPage />} />
          <Route path="/textarea" element={<TextareaPage />} />
          <Route path="/tooltip" element={<TooltipPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
