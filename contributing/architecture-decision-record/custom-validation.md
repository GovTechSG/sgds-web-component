# Custom Validation

## Status

Accepted

## Context

We provide an opinionated native validation behaviour using ElementInternals but should also allow users to opt-out and hook in their own custom validation library 

## Decision

Add noValidate prop in form components. When true, it should not trigger the attachInternals of ElementsInternal API. 
Any components with constraint validation and sgds validation built into the class, should also be disabled when noValidate is true. 

Additionally the validatorMixin will detect closest `<form novalidate>` and disables constraint and sgds validation. This helps to make it easier for users to set noValidate once. 

## Consequences

It is easier to implement custom validation without the interference of sgds opinionated validation behaviour. 

Components requiring the update: 
1. Input (Done on 23/09/2025)
2. ComboBox
3. Select
4. CheckboxGroup
5. Checkbox
6. RadioGroup
7. QuantityToggle
8. Datepicker
9. FileUpload
10. Textarea


## Date of proposal 

23/09/2025