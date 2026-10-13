var nav = $("nav");
var hamburger = $(".hamburger");

function setMenu(open) {
    nav.toggleClass("menu-open", open);
    hamburger
        .attr("aria-expanded", open ? "true" : "false")
        .attr("aria-label", open ? "Close menu" : "Open menu");
}

function toggleMenu() {
    setMenu(!nav.hasClass("menu-open"));
}

hamburger.on("click", toggleMenu);

nav.on("click", "a, .login, .register, .logoutButton", function () {
    setMenu(false);
});

$(document).on("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
});
$(window).on("resize", function () {
    if (window.innerWidth >= 768) setMenu(false);
});

var registrationForm = $(".modal-body-register");
var loginForm = $(".modal-body-login");
var registerTab = $(".register-tab h2");
var loginTab = $(".login-tab h2");
var accountModal = document.getElementById("exampleModal");

function loginOpenform() {
    loginForm.addClass("active-form-tab");
    loginTab.addClass("active-tab");
    registrationForm.removeClass("active-form-tab");
    registerTab.removeClass("active-tab");
}

function registerOpenform() {
    registrationForm.addClass("active-form-tab");
    registerTab.addClass("active-tab");
    loginForm.removeClass("active-form-tab");
    loginTab.removeClass("active-tab");
}

$(".register-tab, .login-tab")
    .attr({ role: "tab", tabindex: "0" })
    .on("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            $(this).trigger("click");
        }
    });

accountModal.addEventListener("show.bs.modal", function () {
    if (!registrationForm.hasClass("active-form-tab") && !loginForm.hasClass("active-form-tab")) {
        registerOpenform();
    }
});

accountModal.addEventListener("shown.bs.modal", function () {
    $(".active-form-tab .form-control").first().trigger("focus");
});

accountModal.addEventListener("hidden.bs.modal", function () {
    clearErrors(registrationForm);
    clearErrors(loginForm);
    $(".loginPass, .registerPass, .registerPassConfirm").val("");
});

function showFieldError(input, message) {
    var $input = $(input);
    var feedback = $input.siblings(".invalid-feedback");
    if (!feedback.length) {
        feedback = $('<div class="invalid-feedback"></div>');
        $input.parent().append(feedback);
    }
    feedback.text(message);
    $input.addClass("is-invalid");
}

function showErrors(formBody, fieldSelectors, errors) {
    $.each(errors, function (field, message) {
        if (fieldSelectors[field]) {
            showFieldError(formBody.find(fieldSelectors[field]), message);
        }
    });
    formBody.find(".is-invalid").first().trigger("focus");
}

function clearErrors(formBody) {
    formBody.find(".is-invalid").removeClass("is-invalid");
    formBody.find(".invalid-feedback").text("");
    formBody.find(".form-message").remove();
}

function showFormMessage(formBody, text, type) {
    formBody.find(".form-message").remove();
    $('<div class="form-message" role="alert"></div>')
        .addClass(type === "success" ? "form-message-success" : "form-message-error")
        .text(text)
        .prependTo(formBody.find("form"));
}

$(".modal-content").on("input change", ".is-invalid", function () {
    $(this).removeClass("is-invalid");
});

var registerFields = {
    firstName: ".registerKNev",
    lastName: ".registerVNev",
    username: ".registerIGN",
    email: ".registerEmail",
    password: ".registerPass",
    passwordConfirm: ".registerPassConfirm",
    acceptedPrivacy: "#acceptPrivacy"
};

function registration() {
    clearErrors(registrationForm);

    var account;
    try {
        account = new Account({
            firstName: $(".registerKNev").val(),
            lastName: $(".registerVNev").val(),
            username: $(".registerIGN").val(),
            email: $(".registerEmail").val(),
            password: $(".registerPass").val(),
            passwordConfirm: $(".registerPassConfirm").val(),
            acceptedPrivacy: $("#acceptPrivacy").is(":checked"),
            newsletter: $("#newsletterSignup").is(":checked")
        });
        AccountStore.register(account);
    } catch (error) {
        if (error instanceof AccountValidationError) {
            showErrors(registrationForm, registerFields, error.errors);
            return;
        }
        throw error;
    }

    registrationForm.find("form")[0].reset();
    loginOpenform();
    $(".loginIdentifier").val(account.username);
    showFormMessage(loginForm, "Registration successful! You can log in now.", "success");
    $(".loginPass").trigger("focus");
}

registrationForm.find("form").on("submit", function (e) {
    e.preventDefault();
    registration();
});

function login() {
    clearErrors(loginForm);

    var identifierInput = $(".loginIdentifier");
    var passwordInput = $(".loginPass");
    var identifier = String(identifierInput.val() || "").trim();
    var password = passwordInput.val();
    var hasError = false;

    if (!identifier) {
        showFieldError(identifierInput, "Enter your username or email address.");
        hasError = true;
    }
    if (!password) {
        showFieldError(passwordInput, "Enter your password.");
        hasError = true;
    }
    if (hasError) {
        loginForm.find(".is-invalid").first().trigger("focus");
        return;
    }

    var account = AccountStore.login(identifier, password);
    if (!account) {
        showFormMessage(loginForm, "Wrong username / email address or password.", "error");
        passwordInput.val("").trigger("focus");
        return;
    }

    loginForm.find("form")[0].reset();
    bootstrap.Modal.getOrCreateInstance(accountModal).hide();
    showLoggedIn(account);
}

loginForm.find("form").on("submit", function (e) {
    e.preventDefault();
    login();
});

function showLoggedIn(account) {
    $(".authButtons").addClass("d-none");
    $(".userBox").removeClass("d-none");
    $(".userName").text(account.username);
}

function logout() {
    AccountStore.logout();
    $(".userBox").addClass("d-none");
    $(".userName").text("");
    $(".authButtons").removeClass("d-none");
}