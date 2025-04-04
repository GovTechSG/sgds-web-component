<template>
    <form id="radio-submit">
        <sgds-radio-group required hasFeedback invalidFeedback="wrong" label="Select an option" hintText="Hint text">
            <sgds-radio value="1">Option 1</sgds-radio>
            <sgds-radio value="2">Option 2</sgds-radio>
            <sgds-radio value="3" disabled>Option 3</sgds-radio>
        </sgds-radio-group>
        <sgds-button type="submit">Submit</sgds-button>
    </form>
</template>
