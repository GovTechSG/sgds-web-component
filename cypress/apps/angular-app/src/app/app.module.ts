import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component";
import { Accordion } from "../components/accordion/accordion.component";
import { ActionCard } from "../components/actioncard/actioncard.component";
import { Alert } from "../components/alert/alert.component";
import { Badge } from "../components/badge/badge.component";
import { Breadcrumb } from "../components/breadcrumb/breadcrumb.component";
import { Button } from "../components/button/button.component";
import { Card } from "../components/card/card.component";
import { Checkbox } from "../components/checkbox/checkbox.component";
import { Combobox } from "../components/combobox/combobox.component";
import { Datepicker } from "../components/datepicker/datepicker.component";
import { Drawer } from "../components/drawer/drawer.component";
import { Dropdown } from "../components/dropdown/dropdown.component";
import { FileUpload } from "../components/fileupload/fileupload.component";
import { Footer } from "../components/footer/footer.component";
import { Input } from "../components/input/input.component";
import { Mainnav } from "../components/mainnav/mainnav.component";
import { Masthead } from "../components/masthead/masthead.component";
import { Modal } from "../components/modal/modal.component";
import { Pagination } from "../components/pagination/pagination.component";
import { Progress } from "../components/progress/progress.component";
import { QuantityToggle } from "../components/quantitytoggle/quantitytoggle.component";
import { Radio } from "../components/radio/radio.component";
import { Sidenav } from "../components/sidenav/sidenav.component";
import { Spinner } from "../components/spinner/spinner.component";
import { Stepper } from "../components/stepper/stepper.component";
import { Tab } from "../components/tab/tab.component";
import { Table } from "../components/table/table.component";
import { Textarea } from "../components/textarea/textarea.component";
import { Toast } from "../components/toast/toast.component";
import { Tooltip } from "../components/tooltip/tooltip.component";

@NgModule({
  declarations: [
    AppComponent,
    Accordion,
    ActionCard,
    Alert,
    Badge,
    Breadcrumb,
    Button,
    Card,
    Checkbox,
    Combobox,
    Datepicker,
    Drawer,
    Dropdown,
    FileUpload,
    Footer,
    Input,
    Mainnav,
    Masthead,
    Modal,
    Pagination,
    Progress,
    QuantityToggle,
    Radio,
    Sidenav,
    Spinner,
    Stepper,
    Tab,
    Table,
    Textarea,
    Toast,
    Tooltip
  ],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
