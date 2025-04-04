<template>
    <sgds-checkbox id="hehe">1</sgds-checkbox>
    <sgds-checkbox>2</sgds-checkbox>
    <sgds-checkbox>3</sgds-checkbox>
    <sgds-checkbox disabled>disabled</sgds-checkbox>

    <form>
        <sgds-checkbox-group hasFeedback invalidFeedback="Please correct the invalid options above"
            label="Select Your Preferences" hintText="Please choose one or more options:">
            <sgds-checkbox value="option1" hasFeedback required>Option 1</sgds-checkbox>
            <sgds-checkbox indeterminate value="option2" required>Option 2 indeterminate</sgds-checkbox>
            <sgds-checkbox disabled value="option3" required>Option 3</sgds-checkbox>
        </sgds-checkbox-group>
        <sgds-button type="submit">Submit</sgds-button>
    </form>
</template>
