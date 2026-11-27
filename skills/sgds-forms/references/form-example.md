# Full Form Example

```html
<form id="my-form" class="d-flex-column">
  <sgds-input
    label="First Name"
    name="firstName"
    required
    hasFeedback="both"
    pattern="[A-Za-z ]+"
    invalidFeedback="Letters only"
  ></sgds-input>

  <sgds-datepicker label="Appointment Date" name="appointmentDate" required hasFeedback></sgds-datepicker>

  <sgds-radio-group label="Gender" name="gender" required hasFeedback>
    <sgds-radio value="female">Female</sgds-radio>
    <sgds-radio value="male">Male</sgds-radio>
  </sgds-radio-group>

  <sgds-checkbox-group label="Food Preference" name="food" required hasFeedback hintText="Select at least one option">
    <sgds-checkbox value="vegetarian">Vegetarian</sgds-checkbox>
    <sgds-checkbox value="halal">Halal</sgds-checkbox>
  </sgds-checkbox-group>

  <sgds-textarea label="Comments" name="comments" required minlength="3" hasFeedback></sgds-textarea>

  <sgds-button type="submit">Submit</sgds-button>
  <sgds-button type="reset" variant="ghost">Reset</sgds-button>
</form>
```

## Reading Form Values via FormData

Use the native `FormData` API in the submit handler. Access `sgds-file-upload` files separately via the component's `selectedFiles` property:

```html
<script>
  const form = document.getElementById("my-form");

  form.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const firstName = formData.get("firstName");
    const gender = formData.get("gender");
    const comments = formData.get("comments");

    // File upload files are not in FormData automatically
    const fileUpload = document.querySelector("sgds-file-upload");
    for (let i = 0; i < fileUpload.selectedFiles.length; i++) {
      formData.append("file" + i, fileUpload.selectedFiles[i]);
    }

    // Submit formData to server
  });
</script>
```
