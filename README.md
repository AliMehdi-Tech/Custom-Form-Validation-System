# Custom Form Validation System

A professional and responsive registration form built with **HTML5, CSS3, and Vanilla JavaScript**, with a primary focus on developing a **custom client-side form validation system from scratch**.

The project demonstrates how validation rules, real-time feedback, input sanitization, password requirements, confirmation matching, checkbox validation, accessibility, and form submission handling can be implemented without relying on JavaScript validation libraries or frameworks.

## Project Purpose

The main purpose of this project is to build a **custom form validation system** that provides clear, consistent, and user-friendly feedback while maintaining clean and maintainable front-end code.

Instead of depending on browser-default validation messages, the application implements custom validation logic using **Vanilla JavaScript**.

The validation system controls:

- Custom validation rules
- Real-time validation
- Custom error messages
- Valid and invalid field states
- Input sanitization
- Password requirements
- Password strength detection
- Confirm password matching
- Terms and conditions validation
- Form submission validation
- Form state management
- Accessibility feedback

## Overview

This project combines a professional registration interface with a custom validation engine designed to provide a consistent user experience across different form fields.

Validation is performed during user interaction where appropriate, while a complete validation check is performed before successful form submission.

The project is intentionally developed using native web technologies to demonstrate practical understanding of:

- DOM manipulation
- Event handling
- Form validation
- Regular expressions
- Input sanitization
- Conditional logic
- State management
- Accessibility
- Responsive design
- Client-side user experience

## Core Validation Features

### Full Name Validation

The custom validation system verifies that the full name:

- Is not empty
- Contains at least 3 characters
- Does not exceed 25 characters
- Contains letters and spaces only

The input is also sanitized while typing and during paste operations to prevent unwanted characters.

### Email Validation

A custom regular expression is used to validate the email structure.

The system checks:

- Empty values
- Valid email formatting
- Valid domain structure
- Supported email characters

### Pakistani Phone Validation

The phone field uses a custom validation rule specifically for Pakistani mobile numbers.

Requirements:

- Exactly 11 digits
- Must start with `03`
- Digits only

Example: `03001234567`

Non-numeric characters are automatically removed while typing and during paste operations.

### Password Validation

The password validation system requires:

- At least 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number

The system dynamically generates a custom error message describing the missing requirements.

### Password Strength Indicator

A dynamic password strength indicator evaluates the entered password and displays:

- Weak
- Fair
- Good
- Strong

The strength calculation considers:

- Password length
- Extended password length
- Uppercase and lowercase characters
- Numbers
- Special characters

The indicator updates dynamically while the user types.

### Confirm Password Validation

The confirmation field is validated while the user enters the password.

The system verifies that:

- The field is not empty
- The confirmation password matches the original password

When both passwords match, the field receives a valid state immediately.

When they do not match, a custom validation message is displayed.

### Terms & Conditions Validation

The form includes a required Terms of Service and Privacy Policy checkbox.

The custom validation system verifies that the checkbox is selected before allowing successful submission.

If the checkbox is not selected, a custom validation message is displayed.

## Real-Time Validation

The application uses different validation triggers depending on the form field.

The validation system uses:

- `input` events for real-time feedback
- `blur` events for field-level validation
- `change` events for checkbox validation
- `submit` events for complete form validation

Validation is not unnecessarily displayed before the user interacts with a field, creating a cleaner and more professional user experience.

## Input Sanitization

The project implements custom input sanitization for fields that require strict formatting.

### Name Sanitization

Characters other than letters and spaces are automatically removed.

### Phone Sanitization

Non-numeric characters are automatically removed and the input is limited to 11 digits.

### Paste Handling

Custom paste handling is implemented for the name and phone fields so pasted content follows the same rules as manually entered data.

## Validation States

Each input can have different validation states.

### Default State

The field has not yet been validated or does not currently require feedback.

### Valid State

The entered value satisfies the defined validation rules.

### Invalid State

The entered value does not satisfy the validation rules and an appropriate error message is displayed.

The application uses the following CSS classes:

- `valid`
- `invalid`

## Accessibility

Accessibility considerations are integrated into the form structure and validation system.

The project includes:

- Semantic HTML
- Proper label associations
- `aria-invalid`
- `aria-describedby`
- `aria-live`
- Keyboard-accessible controls
- Focus-visible states
- Accessible password visibility controls

Validation messages are connected to their corresponding form fields to provide meaningful feedback for assistive technologies.

## Password Visibility Toggle

Both password fields include a custom password visibility control.

Users can switch between:

- Password mode
- Text mode

The control also updates:

- `aria-label`
- `title`
- Visual eye icon state

No external password visibility library is used.

## Responsive Design

The interface is designed to provide a consistent experience across different screen sizes.

Responsive behavior includes:

- Desktop layouts
- Tablet layouts
- Mobile layouts
- Flexible form width
- Responsive typography
- Mobile-friendly spacing
- Touch-friendly controls

The project uses modern CSS techniques including:

- Flexbox
- CSS custom properties
- Media queries
- Responsive sizing

## Design System

The interface uses a professional dark visual system with CSS custom properties for consistent styling.

Reusable variables are defined for:

- Background colors
- Surface colors
- Border colors
- Text colors
- Accent colors
- Validation colors
- Border radius
- Typography

This approach improves consistency and makes the design easier to maintain.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure and form elements |
| CSS3 | Responsive UI and visual design |
| Vanilla JavaScript | Custom validation and interaction |
| SweetAlert2 | Registration success notification |
| Google Fonts | Inter and JetBrains Mono typography |

## Project Structure

    Custom-Form-Validation-System/
    │
    ├── Index.html
    ├── Style.css
    ├── Script.js
    └── README.md

## Validation Architecture

The validation system follows a structured approach where each field has its own validation function.

The general flow is:

    User Input
        ↓
    Event Listener
        ↓
    Custom Validation Function
        ↓
    Validation Result
        ↓
    Field State Update
        ↓
    Custom Error Feedback

On form submission, all validation functions are executed together before the form can proceed.

## Form Submission Flow

When the user submits the form:

1. All required fields are marked for validation.
2. Each validation function is executed.
3. Invalid fields receive the `invalid` state.
4. Valid fields receive the `valid` state.
5. Custom error messages are displayed where required.
6. The first invalid field receives focus.
7. Submission stops if any validation fails.
8. If every field is valid, a success notification is displayed.
9. After confirmation, the form is reset.

This creates a controlled and predictable client-side validation process.

## User Experience

The project is designed to avoid unnecessary validation feedback.

For example:

- Empty fields are not immediately marked invalid when the page loads.
- Fields are validated after user interaction.
- Confirm password is checked while typing.
- Password strength updates instantly.
- Input formatting is handled automatically.
- Checkbox validation occurs when its state changes.
- The first invalid field is automatically focused after submission.

This approach improves usability while keeping the validation behavior clear.

## Project Goals

This project was created to strengthen practical front-end development skills, particularly:

- JavaScript fundamentals
- DOM manipulation
- Event-driven programming
- Regular expressions
- Form validation
- Input sanitization
- State management
- Accessibility
- Responsive UI development
- Clean code organization

The primary goal is not simply to create a registration form, but to demonstrate how a **custom validation system can be designed and implemented from scratch**.

## Limitations

This is a **client-side validation project**.

It does not include:

- Backend authentication
- Database storage
- Server-side validation
- User account creation
- Password hashing
- API integration

Client-side validation should not be considered a security mechanism on its own.

For a production authentication system, all important validation and security checks must also be implemented on the server.

## Future Improvements

Potential future improvements include:

- Backend integration
- Database registration
- Server-side validation
- User authentication
- Email verification
- API integration
- Secure password hashing
- Rate limiting
- CSRF protection
- Advanced password security checks
- Multi-step registration
- International phone number support
- Server-side error handling

## Learning Outcome

This project demonstrates the practical implementation of a **custom client-side form validation architecture** using native web technologies.

It focuses on creating validation behavior that is:

- Custom
- Responsive
- Accessible
- Interactive
- Maintainable
- User-friendly

The project provides a strong foundation that can later be extended into a complete full-stack registration and authentication system.