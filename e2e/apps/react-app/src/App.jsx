import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";
import "./index.css";
import SidebarLayout from "./SidebarLayout";
import AccordionPage from "./pages/accordion";
import AlertLinkPage from "./pages/alertlink";
import AlertPage from "./pages/alert";
import BadgePage from "./pages/badge";
import BreadcrumbPage from "./pages/breadcrumb";
import ButtonPage from "./pages/button";
import CardPage from "./pages/card";
import ComboBoxPage from "./pages/combobox";
import CheckboxGroupPage from "./pages/checkboxgroup";
import CloseButtonPage from "./pages/closebutton";
import AppnavPage from "./pages/appnav";
import DataTablePage from "./pages/datatable";
import DividerPage from "./pages/divider";
import DrawerPage from "./pages/drawer";
import DescriptionListGroupPage from "./pages/descriptionlistgroup";
import DatepickerPage from "./pages/datepicker";
import FileUploadPage from "./pages/fileupload";
import IconPage from "./pages/icon";
import DropdownPage from "./pages/dropdown";
import FooterPage from "./pages/footer";
import IconButtonPage from "./pages/iconbutton";
import IconListPage from "./pages/iconlist";
import IconCardPage from "./pages/iconcard";
import ImageCardPage from "./pages/imagecard";
import InputPage from "./pages/input";
import MainnavPage from "./pages/mainnav";
import MastheadPage from "./pages/masthead";
import LinkPage from "./pages/link";
import ModalPage from "./pages/modal";
import OverflowMenuPage from "./pages/overflowmenu";
import PaginationPage from "./pages/pagination";
import ProgressBarPage from "./pages/progressbar";
import QuantityTogglePage from "./pages/quantitytoggle";
import SelectPage from "./pages/select";
import RadioGroupPage from "./pages/radiogroup";
import SidebarPage from "./pages/sidebar";
import SidenavPage from "./pages/sidenav";
import SpinnerPage from "./pages/spinner";
import SkeletonPage from "./pages/skeleton";
import StepPage from "./pages/step";
import StepperPage from "./pages/stepper";
import SubnavPage from "./pages/subnav";
import SwitchPage from "./pages/switch";
import SystemBannerPage from "./pages/systembanner";
import TabGroupPage from "./pages/tabgroup";
import TableOfContentsPage from "./pages/tableofcontents";
import TextareaPage from "./pages/textarea";
import ThumbnailCardPage from "./pages/thumbnailcard";
import TablePage from "./pages/table";
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
          <Route path="/badge" element={<BadgePage />} />
          <Route path="/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="/button" element={<ButtonPage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/combobox" element={<ComboBoxPage />} />
          <Route path="/checkboxgroup" element={<CheckboxGroupPage />} />
          <Route path="/closebutton" element={<CloseButtonPage />} />
          <Route path="/appnav" element={<AppnavPage />} />
          <Route path="/datatable" element={<DataTablePage />} />
          <Route path="/divider" element={<DividerPage />} />
          <Route path="/drawer" element={<DrawerPage />} />
          <Route path="/descriptionlistgroup" element={<DescriptionListGroupPage />} />
          <Route path="/datepicker" element={<DatepickerPage />} />
          <Route path="/fileupload" element={<FileUploadPage />} />
          <Route path="/icon" element={<IconPage />} />
          <Route path="/dropdown" element={<DropdownPage />} />
          <Route path="/footer" element={<FooterPage />} />
          <Route path="/iconbutton" element={<IconButtonPage />} />
          <Route path="/iconlist" element={<IconListPage />} />
          <Route path="/iconcard" element={<IconCardPage />} />
          <Route path="/imagecard" element={<ImageCardPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/mainnav" element={<MainnavPage />} />
          <Route path="/masthead" element={<MastheadPage />} />
          <Route path="/link" element={<LinkPage />} />
          <Route path="/modal" element={<ModalPage />} />
          <Route path="/overflowmenu" element={<OverflowMenuPage />} />
          <Route path="/pagination" element={<PaginationPage />} />
          <Route path="/progressbar" element={<ProgressBarPage />} />
          <Route path="/quantitytoggle" element={<QuantityTogglePage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/radiogroup" element={<RadioGroupPage />} />
          <Route path="/sidebar" element={<SidebarPage />} />
          <Route path="/sidenav" element={<SidenavPage />} />
          <Route path="/spinner" element={<SpinnerPage />} />
          <Route path="/skeleton" element={<SkeletonPage />} />
          <Route path="/step" element={<StepPage />} />
          <Route path="/stepper" element={<StepperPage />} />
          <Route path="/subnav" element={<SubnavPage />} />
          <Route path="/switch" element={<SwitchPage />} />
          <Route path="/systembanner" element={<SystemBannerPage />} />
          <Route path="/tabgroup" element={<TabGroupPage />} />
          <Route path="/tableofcontents" element={<TableOfContentsPage />} />
          <Route path="/textarea" element={<TextareaPage />} />
          <Route path="/thumbnailcard" element={<ThumbnailCardPage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/tooltip" element={<TooltipPage />} />
          <Route path="/toastcontainer" element={<ToastContainerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
