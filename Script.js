"use strict";

(function () {
    const form = document.getElementById("registrationForm");

    const nameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");
    const termsInput = document.getElementById("terms");

    const nameError = document.getElementById("fullNameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmPasswordError");
    const termsError = document.getElementById("termsError");

    const strengthMeter = document.getElementById("strengthMeter");
    const strengthLabel = document.getElementById("strengthLabel");

    const touched = new Set();

    const passwordToggles = document.querySelectorAll(".password-toggle");

    passwordToggles.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            const input = this.parentElement.querySelector("input");

            if (input.type === "password") {
                input.type = "text";

                this.classList.add("is-visible");
                this.setAttribute("aria-label", "Hide password");
                this.setAttribute("title", "Hide password");
            } else {
                input.type = "password";

                this.classList.remove("is-visible");
                this.setAttribute("aria-label", "Show password");
                this.setAttribute("title", "Show password");
            }
        });
    });

    function validateFullName(value) {
        const trimmed = value.trim();

        if (!trimmed) {
            return "Enter your full name.";
        }

        if (trimmed.length < 3) {
            return "Name must be at least 3 characters.";
        }

        if (trimmed.length > 25) {
            return "Name must not exceed 25 characters.";
        }

        if (!/^[\p{L}]+(?:[ ]+[\p{L}]+)*$/u.test(trimmed)) {
            return "Use letters and spaces only.";
        }

        return "";
    }

    function validateEmail(value) {
        const trimmed = value.trim();

        if (!trimmed) {
            return "Enter your email address.";
        }

        const pattern =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

        if (!pattern.test(trimmed)) {
            return "Enter a valid email address.";
        }

        return "";
    }

    function validatePhone(value) {
        const trimmed = value.trim();

        if (!trimmed) {
            return "Enter your Pakistani phone number.";
        }

        if (!/^03\d{9}$/.test(trimmed)) {
            return "Enter a valid Pakistani number, e.g. 03400000000.";
        }

        return "";
    }

    function validatePassword(value) {
        if (!value) {
            return "Enter a password.";
        }

        const missing = [];

        if (value.length < 8) {
            missing.push("at least 8 characters");
        }

        if (!/[a-z]/.test(value)) {
            missing.push("a lowercase letter");
        }

        if (!/[A-Z]/.test(value)) {
            missing.push("an uppercase letter");
        }

        if (!/[0-9]/.test(value)) {
            missing.push("a number");
        }

        if (missing.length === 0) {
            return "";
        }

        if (missing.length === 1) {
            return "Password needs " + missing[0] + ".";
        }

        const last = missing.pop();

        return "Password needs " + missing.join(", ") + " and " + last + ".";
    }

    function validateConfirmPassword(value, password) {
        if (!value) {
            return "Confirm your password.";
        }

        if (value !== password) {
            return "Passwords do not match.";
        }

        return "";
    }

    function getPasswordStrength(value) {
        let score = 0;

        if (value.length >= 8) score++;
        if (value.length >= 12) score++;
        if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;

        if (score <= 1) {
            return {
                level: 0,
                label: "Weak"
            };
        }

        if (score === 2) {
            return {
                level: 1,
                label: "Fair"
            };
        }

        if (score <= 4) {
            return {
                level: 2,
                label: "Good"
            };
        }

        return {
            level: 3,
            label: "Strong"
        };
    }

    function setFieldState(input, errorElement, message) {
        const invalid = message !== "";

        const hasValue =
            input.type === "checkbox"
                ? input.checked
                : input.value.trim() !== "";

        input.classList.toggle("invalid", invalid);
        input.classList.toggle("valid", !invalid && hasValue);

        input.setAttribute("aria-invalid", String(invalid));

        errorElement.textContent = message;
    }

    function validateNameField() {
        const message = validateFullName(nameInput.value);

        setFieldState(nameInput, nameError, message);

        return message === "";
    }

    function validateEmailField() {
        const message = validateEmail(emailInput.value);

        setFieldState(emailInput, emailError, message);

        return message === "";
    }

    function validatePhoneField() {
        const message = validatePhone(phoneInput.value);

        setFieldState(phoneInput, phoneError, message);

        return message === "";
    }

    function validatePasswordField() {
        const message = validatePassword(passwordInput.value);

        setFieldState(passwordInput, passwordError, message);

        return message === "";
    }

    function validateConfirmField() {
        const message = validateConfirmPassword(
            confirmInput.value,
            passwordInput.value
        );

        setFieldState(confirmInput, confirmError, message);

        return message === "";
    }

    function validateTerms() {
        const message = termsInput.checked
            ? ""
            : "You must accept the terms to continue.";

        setFieldState(termsInput, termsError, message);

        return message === "";
    }

    function updateStrength() {
        const value = passwordInput.value;

        if (!value) {
            strengthMeter.hidden = true;
            strengthMeter.dataset.level = "0";
            strengthLabel.textContent = "";
            return;
        }

        const result = getPasswordStrength(value);

        strengthMeter.hidden = false;
        strengthMeter.dataset.level = String(result.level);
        strengthLabel.textContent = result.label;
    }

    function bindField(input, name, validateFunction) {
        input.addEventListener("blur", function () {
            touched.add(name);
            validateFunction();
        });

        input.addEventListener("input", function () {
            if (touched.has(name)) {
                validateFunction();
            }
        });
    }

    bindField(nameInput, "fullName", validateNameField);
    bindField(emailInput, "email", validateEmailField);
    bindField(phoneInput, "phone", validatePhoneField);

    nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^\p{L} ]/gu, "");

        if (this.value.length > 25) {
            this.value = this.value.slice(0, 25);
        }

        if (touched.has("fullName")) {
            validateNameField();
        }
    });

    nameInput.addEventListener("paste", function (event) {
        const pasted = event.clipboardData.getData("text");
        const cleaned = pasted.replace(/[^\p{L} ]/gu, "");

        event.preventDefault();

        const start = this.selectionStart;
        const end = this.selectionEnd;

        const value =
            this.value.slice(0, start) +
            cleaned +
            this.value.slice(end);

        this.value = value.slice(0, 25);

        if (touched.has("fullName")) {
            validateNameField();
        }
    });

    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 11);

        if (touched.has("phone")) {
            validatePhoneField();
        }
    });

    phoneInput.addEventListener("paste", function (event) {
        const pasted = event.clipboardData.getData("text");
        const cleaned = pasted.replace(/\D/g, "");

        event.preventDefault();

        this.value = cleaned.slice(0, 11);

        if (touched.has("phone")) {
            validatePhoneField();
        }
    });

    passwordInput.addEventListener("blur", function () {
        touched.add("password");
        validatePasswordField();
    });

    passwordInput.addEventListener("input", function () {
        updateStrength();

        if (touched.has("password")) {
            validatePasswordField();
        }

        if (confirmInput.value !== "") {
            validateConfirmField();
        }
    });

    confirmInput.addEventListener("blur", function () {
        touched.add("confirmPassword");
        validateConfirmField();
    });

    confirmInput.addEventListener("input", function () {
        if (this.value !== "") {
            validateConfirmField();
        } else {
            confirmInput.classList.remove("valid", "invalid");
            confirmInput.setAttribute("aria-invalid", "false");
            confirmError.textContent = "";
        }
    });

    termsInput.addEventListener("change", function () {
        touched.add("terms");
        validateTerms();
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        touched.add("fullName");
        touched.add("email");
        touched.add("phone");
        touched.add("password");
        touched.add("confirmPassword");
        touched.add("terms");

        const results = [
            validateNameField(),
            validateEmailField(),
            validatePhoneField(),
            validatePasswordField(),
            validateConfirmField(),
            validateTerms()
        ];

        if (!results.every(Boolean)) {
            const firstInvalid = form.querySelector(".invalid");

            if (firstInvalid) {
                firstInvalid.focus();
            }

            return;
        }

        Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "Your account has been registered successfully.",
            confirmButtonText: "Continue",
            confirmButtonColor: "#d4af6a",
            background: "#141922",
            color: "#e8eaed",
            customClass: {
                popup: "professional-alert"
            }
        }).then(function () {
            form.reset();

            touched.clear();

            [
                nameInput,
                emailInput,
                phoneInput,
                passwordInput,
                confirmInput,
                termsInput
            ].forEach(function (input) {
                input.classList.remove("invalid", "valid");
                input.setAttribute("aria-invalid", "false");
            });

            [
                nameError,
                emailError,
                phoneError,
                passwordError,
                confirmError,
                termsError
            ].forEach(function (element) {
                element.textContent = "";
            });

            document.querySelectorAll(".password-toggle").forEach(function (toggle) {
                toggle.classList.remove("is-visible");
                toggle.setAttribute("aria-label", "Show password");
                toggle.setAttribute("title", "Show password");
            });

            passwordInput.type = "password";
            confirmInput.type = "password";

            strengthMeter.hidden = true;
            strengthMeter.dataset.level = "0";
            strengthLabel.textContent = "";

            nameInput.focus();
        });
    });
})();