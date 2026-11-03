"use client";

import { useState, useRef } from "react";
import {
  SgdsInput,
  SgdsTextarea,
  SgdsSelect,
  SgdsSelectOption,
  SgdsComboBox,
  SgdsComboBoxOption,
  SgdsDatepicker,
  SgdsRadioGroup,
  SgdsRadio,
  SgdsCheckboxGroup,
  SgdsCheckbox,
  SgdsQuantityToggle,
  SgdsFileUpload,
  SgdsButton
} from "@govtechsg/sgds-web-component/react";

export default function FormValidationPage() {
  const [submittedData, setSubmittedData] = useState<Record<string, string> | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    setSubmittedData(data);
  };

  const handleReset = () => {
    setSubmittedData(null);
  };

  return (
    <main>
      <h1>Form Constraint Validation</h1>
      <p>Test SGDS form constraint validation in Next.js SSR. Click Submit without filling fields to trigger validation errors.</p>

      <hr />

      <form ref={formRef} onSubmit={handleSubmit} onReset={handleReset}>
        <section>
          <h2>Input — Text (required, pattern)</h2>
          <SgdsInput
            label="First Name"
            name="firstName"
            required
            hasFeedback="both"
            pattern="[A-Za-z ]+"
            invalidFeedback="Letters only"
            hintText="Enter your first name"
            placeholder="e.g. Tan Ah Kow"
          />
        </section>

        <section>
          <h2>Input — Email (required)</h2>
          <SgdsInput
            type="email"
            label="Email Address"
            name="email"
            required
            hasFeedback="both"
            invalidFeedback="Please enter a valid email"
            hintText="We will send a confirmation to this address"
            placeholder="you@example.com"
          />
        </section>

        <section>
          <h2>Textarea (required, minlength)</h2>
          <SgdsTextarea
            label="Comments"
            name="comments"
            required
            minlength={10}
            hasFeedback
            hintText="At least 10 characters"
            placeholder="Enter your comments here"
          />
        </section>

        <section>
          <h2>Select (required)</h2>
          <SgdsSelect
            label="Country"
            name="country"
            required
            hasFeedback={true}
            hintText="Select your country of residence"
            placeholder="Select a country"
          >
            <SgdsSelectOption value="sg">Singapore</SgdsSelectOption>
            <SgdsSelectOption value="my">Malaysia</SgdsSelectOption>
            <SgdsSelectOption value="au">Australia</SgdsSelectOption>
          </SgdsSelect>
        </section>

        <section>
          <h2>Combo Box (required)</h2>
          <SgdsComboBox
            label="Department"
            name="department"
            required
            hasFeedback={true}
            hintText="Select your department"
            placeholder="Search or select"
          >
            <SgdsComboBoxOption value="engineering">Engineering</SgdsComboBoxOption>
            <SgdsComboBoxOption value="design">Design</SgdsComboBoxOption>
            <SgdsComboBoxOption value="product">Product</SgdsComboBoxOption>
          </SgdsComboBox>
        </section>

        <section>
          <h2>Datepicker (required)</h2>
          <SgdsDatepicker
            label="Appointment Date"
            name="appointmentDate"
            required
            hasFeedback={true}
            hintText="Select your preferred date"
            mode="single"
          />
        </section>

        <section>
          <h2>Radio Group (required)</h2>
          <SgdsRadioGroup
            label="Priority"
            name="priority"
            required
            hasFeedback
            hintText="Select one option"
          >
            <SgdsRadio value="low">Low</SgdsRadio>
            <SgdsRadio value="medium">Medium</SgdsRadio>
            <SgdsRadio value="high">High</SgdsRadio>
          </SgdsRadioGroup>
        </section>

        <section>
          <h2>Checkbox Group (required)</h2>
          <SgdsCheckboxGroup
            label="Dietary Requirements"
            name="dietary"
            required
            hasFeedback
            hintText="Select at least one option"
          >
            <SgdsCheckbox value="vegetarian">Vegetarian</SgdsCheckbox>
            <SgdsCheckbox value="halal">Halal</SgdsCheckbox>
            <SgdsCheckbox value="vegan">Vegan</SgdsCheckbox>
          </SgdsCheckboxGroup>
        </section>

        <section>
          <h2>Quantity Toggle (min/max)</h2>
          <SgdsQuantityToggle
            label="Quantity"
            name="quantity"
            min={3}
            max={10}
            value={1}
            hasFeedback="both"
          />
        </section>

        <section>
          <h2>File Upload (required)</h2>
          <SgdsFileUpload
            name="attachment"
            required
            hasFeedback={true}
            accept=".pdf,.jpg,.png"
          >
            Choose a file
          </SgdsFileUpload>
        </section>

        <hr />

        <section style={{ display: "flex", gap: "1rem" }}>
          <SgdsButton type="submit">Submit</SgdsButton>
          <SgdsButton type="reset" variant="ghost">Reset</SgdsButton>
        </section>
      </form>

      {submittedData && (
        <section>
          <h2>Submitted FormData</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </section>
      )}
    </main>
  );
}
