"use client";

import { useState } from "react";

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
        <sgds-input
          type="text"
          label="Full Name"
          hintText="Enter your full name as per NRIC"
          name="fullName"
          value="John Doe"
          placeholder="e.g. Tan Ah Kow"
          onsgds-change={(e: any) => setFullName(e.target.value)}
          suppressHydrationWarning
        ></sgds-input>
        <div>Value: {fullName}</div>
      </section>

      <section>
        <h2>Input — Email</h2>
        <sgds-input
          type="email"
          label="Email Address"
          hintText="We will send a confirmation to this address"
          name="email"
          value="john.doe@example.com"
          placeholder="you@example.com"
          onsgds-change={(e: any) => setEmail(e.target.value)}
          suppressHydrationWarning
        ></sgds-input>
        <div>Value: {email}</div>
      </section>

      <section>
        <h2>Input — Number</h2>
        <sgds-input
          type="number"
          label="Age"
          name="age"
          value="28"
          min="0"
          max="120"
          placeholder="0"
          onsgds-change={(e: any) => setAge(e.target.value)}
          suppressHydrationWarning
        ></sgds-input>
        <div>Value: {age}</div>
      </section>

      <section>
        <h2>Textarea</h2>
        <sgds-textarea
          label="Feedback"
          hintText="Tell us what you think"
          name="feedback"
          rows="4"
          value="This is some default feedback text. You can edit it freely."
          placeholder="Enter your feedback here"
          maxlength="500"
          onsgds-change={(e: any) => setFeedback(e.target.value)}
          suppressHydrationWarning
        ></sgds-textarea>
        <div>Value: {feedback}</div>
      </section>

      <section>
        <h2>Select</h2>
        <sgds-select
          label="Country"
          hintText="Select your country of residence"
          name="country"
          placeholder="Select a country"
          value="sg"
          onsgds-change={(e: any) => setCountry(e.target.value)}
          suppressHydrationWarning
        >
          <sgds-select-option value="sg" suppressHydrationWarning>Singapore</sgds-select-option>
          <sgds-select-option value="my" suppressHydrationWarning>Malaysia</sgds-select-option>
          <sgds-select-option value="au" suppressHydrationWarning>Australia</sgds-select-option>
          <sgds-select-option value="uk" suppressHydrationWarning>United Kingdom</sgds-select-option>
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
          onsgds-change={(e: any) => setDepartment(e.target.value)}
          suppressHydrationWarning
        >
          <sgds-combo-box-option value="engineering" suppressHydrationWarning>Engineering</sgds-combo-box-option>
          <sgds-combo-box-option value="design" suppressHydrationWarning>Design</sgds-combo-box-option>
          <sgds-combo-box-option value="product" suppressHydrationWarning>Product</sgds-combo-box-option>
          <sgds-combo-box-option value="operations" suppressHydrationWarning>Operations</sgds-combo-box-option>
        </sgds-combo-box>
        <div>Value: {department}</div>
      </section>

      <section>
        <h2>Combo Box — Multi Select</h2>
        <sgds-combo-box
          label="Skills"
          hintText="Select all that apply"
          name="skills"
          placeholder="Search or select"
          value="design;engineering"
          multiselect
          clearable
          onsgds-change={(e: any) => setSkills(e.target.value)}
          suppressHydrationWarning
        >
          <sgds-combo-box-option value="engineering" suppressHydrationWarning>Engineering</sgds-combo-box-option>
          <sgds-combo-box-option value="design" suppressHydrationWarning>Design</sgds-combo-box-option>
          <sgds-combo-box-option value="product" suppressHydrationWarning>Product</sgds-combo-box-option>
          <sgds-combo-box-option value="operations" suppressHydrationWarning>Operations</sgds-combo-box-option>
        </sgds-combo-box>
        <div>Value: {skills}</div>
      </section>

      <section>
        <h2>Checkbox Group</h2>
        <sgds-checkbox-group
          label="Dietary Requirements"
          hintText="Check all that apply"
          name="dietary"
          onsgds-change={(e: any) => setDietary(e.target.value)}
          suppressHydrationWarning
        >
          <sgds-checkbox value="vegetarian" checked suppressHydrationWarning>Vegetarian</sgds-checkbox>
          <sgds-checkbox value="halal" suppressHydrationWarning>Halal</sgds-checkbox>
          <sgds-checkbox value="vegan" checked suppressHydrationWarning>Vegan</sgds-checkbox>
          <sgds-checkbox value="gluten-free" suppressHydrationWarning>Gluten-free</sgds-checkbox>
        </sgds-checkbox-group>
        <div>Value: {dietary}</div>
      </section>

      <section>
        <h2>Radio Group</h2>
        <sgds-radio-group
          label="Priority"
          hintText="Select one option"
          name="priority"
          value="medium"
          onsgds-change={(e: any) => setPriority(e.detail.value)}
          suppressHydrationWarning
        >
          <sgds-radio value="low" suppressHydrationWarning>Low</sgds-radio>
          <sgds-radio value="medium" suppressHydrationWarning>Medium</sgds-radio>
          <sgds-radio value="high" suppressHydrationWarning>High</sgds-radio>
        </sgds-radio-group>
        <div>Value: {priority}</div>
      </section>

      <section>
        <h2>Datepicker</h2>
        <sgds-datepicker
          label="Appointment Date"
          hintText="Select your preferred date"
          name="appointmentDate"
          dateFormat="DD/MM/YYYY"
          mode="single"
          value="06/04/2026"
          onsgds-change-date={(e: any) => setAppointmentDate(e.target.value)}
          suppressHydrationWarning
        ></sgds-datepicker>
        <div>Value: {appointmentDate}</div>
      </section>

      <section>
        <h2>File Upload</h2>
        <sgds-file-upload
          name="attachment"
          accept=".pdf,.jpg,.png"
          onsgds-change={(e: any) => setFileName(e.target.files?.[0]?.name ?? "")}
          suppressHydrationWarning
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
          </svg>
          Choose a file
        </sgds-file-upload>
        <div>Value: {fileName || "(no file selected)"}</div>
      </section>

      <section>
        <h2>Quantity Toggle</h2>
        <sgds-quantity-toggle
          label="Quantity"
          name="quantity"
          step="1"
          min="0"
          max="99"
          defaultValue="5"
          buttonVariant="primary"
          onsgds-change={(e: any) => setQuantity(e.target.value)}
          suppressHydrationWarning
        ></sgds-quantity-toggle>
        <div>Value: {quantity}</div>
      </section>

      <section>
        <h2>Switch</h2>
        <sgds-switch
          name="notifications"
          value="on"
          checked
          onsgds-change={(e: any) => setNotifications(e.detail.checked)}
          suppressHydrationWarning
        >
          Enable email notifications
        </sgds-switch>
        <div>Value: {notifications ? "on" : "off"}</div>
      </section>
    </main>
  );
}
