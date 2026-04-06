"use client";

import { useState } from "react";
import {
  SgdsInput,
  SgdsTextarea,
  // SgdsSelect,
  // SgdsSelectOption,
  // SgdsComboBox,
  // SgdsComboBoxOption,
  SgdsCheckboxGroup,
  SgdsCheckbox,
  SgdsRadioGroup,
  SgdsRadio,
  SgdsDatepicker,
  SgdsFileUpload,
  SgdsQuantityToggle,
  SgdsSwitch
} from "@govtechsg/sgds-web-component/react";

export default function FormPreviewPage() {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [age, setAge] = useState("28");
  const [feedback, setFeedback] = useState("This is some default feedback text. You can edit it freely.");
  const [country, setCountry] = useState("sg");
  const [department, setDepartment] = useState("design");
  const [skills, setSkills] = useState("design;engineering");
  const [dietary, setDietary] = useState("vegetarian,vegan");
  const [priority, setPriority] = useState("medium");
  const [appointmentDate, setAppointmentDate] = useState("06/04/2026");
  const [fileName, setFileName] = useState("");
  const [quantity, setQuantity] = useState("5");
  const [notifications, setNotifications] = useState(true);

  return (
    <main>
      <h1>Form Components Preview</h1>
      <p>All SGDS form components rendered with a default value. Change any field to see the value update below it.</p>

      <hr />

      <section>
        <h2>Input — Text</h2>
        <SgdsInput
          type="text"
          label="Full Name"
          hintText="Enter your full name as per NRIC"
          name="fullName"
          value="John Doe"
          placeholder="e.g. Tan Ah Kow"
          onSgdsChange={(e: any) => setFullName(e.target.value)}
        ></SgdsInput>
        <div>Value: {fullName}</div>
      </section>

      <section>
        <h2>Input — Email</h2>
        <SgdsInput
          type="email"
          label="Email Address"
          hintText="We will send a confirmation to this address"
          name="email"
          value="john.doe@example.com"
          placeholder="you@example.com"
          onSgdsChange={(e: any) => setEmail(e.target.value)}
        ></SgdsInput>
        <div>Value: {email}</div>
      </section>

      <section>
        <h2>Input — Number</h2>
        <SgdsInput
          type="number"
          label="Age"
          name="age"
          value="28"
          min="0"
          max="120"
          placeholder="0"
          onSgdsChange={(e: any) => setAge(e.target.value)}
        ></SgdsInput>
        <div>Value: {age}</div>
      </section>

      <section>
        <h2>Textarea</h2>
        <SgdsTextarea
          label="Feedback"
          hintText="Tell us what you think"
          name="feedback"
          rows="4"
          value="This is some default feedback text. You can edit it freely."
          placeholder="Enter your feedback here"
          maxlength="500"
          onSgdsChange={(e: any) => setFeedback(e.target.value)}
        ></SgdsTextarea>
        <div>Value: {feedback}</div>
      </section>

      {/* <section>
        <h2>Select</h2>
        <sgds-select
          label="Country"
          hintText="Select your country of residence"
          name="country"
          placeholder="Select a country"
          value="sg"
          onSgdsChange={(e: any) => setCountry(e.target.value)}
        >
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
          <sgds-select-option value="au">Australia</sgds-select-option>
          <sgds-select-option value="uk">United Kingdom</sgds-select-option>
        </sgds-select>
        <div>Value: {country}</div>
      </section>

      <section>
        <h2>Combo Box — Single Select</h2>
        <sgds-combo-box
          label="Department"
          hintText="Select your department"
          name="department"
          placeholder="Search or select"
          value="design"
          onSgdsChange={(e: any) => setDepartment(e.target.value)}
        >
          <sgds-combo-boxOption value="engineering">Engineering</sgds-combo-boxOption>
          <sgds-combo-boxOption value="design">Design</sgds-combo-boxOption>
          <sgds-combo-boxOption value="product">Product</sgds-combo-boxOption>
          <sgds-combo-boxOption value="operations">Operations</SgdsComboBoxOption>
        </sgds-combo-box>
        <div>Value: {department}</div>
      </section> */}
{/* 
      <section>
        <h2>Combo Box — Multi Select</h2>
        <SgdsComboBox
          label="Skills"
          hintText="Select all that apply"
          name="skills"
          placeholder="Search or select"
          value="design;engineering"
          multiselect
          clearable
          onSgdsChange={(e: any) => setSkills(e.target.value)}
        >
          <SgdsComboBoxOption value="engineering">Engineering</SgdsComboBoxOption>
          <SgdsComboBoxOption value="design">Design</SgdsComboBoxOption>
          <SgdsComboBoxOption value="product">Product</SgdsComboBoxOption>
          <SgdsComboBoxOption value="operations">Operations</SgdsComboBoxOption>
        </SgdsComboBox>
        <div>Value: {skills}</div>
      </section> */}

      <section>
        <h2>Checkbox Group</h2>
        <SgdsCheckboxGroup
          label="Dietary Requirements"
          hintText="Check all that apply"
          name="dietary"
          onSgdsChange={(e: any) => setDietary(e.target.value)}
        >
          <SgdsCheckbox value="vegetarian" checked>Vegetarian</SgdsCheckbox>
          <SgdsCheckbox value="halal">Halal</SgdsCheckbox>
          <SgdsCheckbox value="vegan" checked>Vegan</SgdsCheckbox>
          <SgdsCheckbox value="gluten-free">Gluten-free</SgdsCheckbox>
        </SgdsCheckboxGroup>
        <div>Value: {dietary}</div>
      </section>

      <section>
        <h2>Radio Group</h2>
        <SgdsRadioGroup
          label="Priority"
          hintText="Select one option"
          name="priority"
          value="medium"
          onSgdsChange={(e: any) => setPriority(e.detail.value)}
        >
          <SgdsRadio value="low">Low</SgdsRadio>
          <SgdsRadio value="medium">Medium</SgdsRadio>
          <SgdsRadio value="high">High</SgdsRadio>
        </SgdsRadioGroup>
        <div>Value: {priority}</div>
      </section>

      <section>
        <h2>Datepicker</h2>
        <SgdsDatepicker
          label="Appointment Date"
          hintText="Select your preferred date"
          name="appointmentDate"
          dateFormat="DD/MM/YYYY"
          mode="single"
          value="06/04/2026"
          onSgdsChangeDate={(e: any) => setAppointmentDate(e.target.value)}
        ></SgdsDatepicker>
        <div>Value: {appointmentDate}</div>
      </section>

      <section>
        <h2>File Upload</h2>
        <SgdsFileUpload
          name="attachment"
          accept=".pdf,.jpg,.png"
          onSgdsChange={(e: any) => setFileName(e.target.files?.[0]?.name ?? "")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
          </svg>
          Choose a file
        </SgdsFileUpload>
        <div>Value: {fileName || "(no file selected)"}</div>
      </section>

      <section>
        <h2>Quantity Toggle</h2>
        <SgdsQuantityToggle
          label="Quantity"
          name="quantity"
          step="1"
          min="0"
          max="99"
          defaultValue="5"
          buttonVariant="primary"
          onSgdsChange={(e: any) => setQuantity(e.target.value)}
        ></SgdsQuantityToggle>
        <div>Value: {quantity}</div>
      </section>

      <section>
        <h2>Switch</h2>
        <SgdsSwitch
          name="notifications"
          value="on"
          checked
          onSgdsChange={(e: any) => setNotifications(e.detail.checked)}
        >
          Enable email notifications
        </SgdsSwitch>
        <div>Value: {notifications ? "on" : "off"}</div>
      </section>
    </main>
  );
}
