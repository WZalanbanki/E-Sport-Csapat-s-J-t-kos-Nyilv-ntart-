class AccountValidationError extends Error {
    constructor(errors) {
        super("Invalid account data");
        this.name = "AccountValidationError";
        this.errors = errors;
    }
}

class Account {
    #firstName;
    #lastName;
    #username;
    #email;
    #password;
    #newsletter;

    static USERNAME_MIN = 8;
    static USERNAME_MAX = 20;
    static NAME_MIN = 2;
    static NAME_MAX = 30;
    static PASSWORD_MIN = 8;
    static PASSWORD_MAX = 64;

    constructor(data) {
        var errors = Account.validate(data);
        if (Object.keys(errors).length > 0) {
            throw new AccountValidationError(errors);
        }

        this.#firstName = data.firstName.trim();
        this.#lastName = data.lastName.trim();
        this.#username = data.username.trim();
        this.#email = data.email.trim().toLowerCase();
        this.#password = data.password;
        this.#newsletter = Boolean(data.newsletter);

        Object.freeze(this);
    }

    static validate(data) {
        var errors = {};
        var text = (value) => (typeof value === "string" ? value.trim() : "");

        var namePattern = /^\p{L}+(?:[ '-]\p{L}+)*$/u;
        var checkName = (field, value, emptyMsg, label) => {
            if (!value) {
                errors[field] = emptyMsg;
            } else if (value.length < Account.NAME_MIN || value.length > Account.NAME_MAX || !namePattern.test(value)) {
                errors[field] = `The ${label} must be ${Account.NAME_MIN}–${Account.NAME_MAX} letters long.`;
            }
        };
        checkName("firstName", text(data.firstName), "Enter your first name.", "first name");
        checkName("lastName", text(data.lastName), "Enter your last name.", "last name");

        var username = text(data.username);
        if (!username) {
            errors.username = "Enter a username.";
        } else if (username.length < Account.USERNAME_MIN || username.length > Account.USERNAME_MAX) {
            errors.username = `The username must be ${Account.USERNAME_MIN}–${Account.USERNAME_MAX} characters long.`;
        } else if (!/^[A-Za-z0-9_.]+$/.test(username)) {
            errors.username = "Only letters, numbers, dots and underscores are allowed.";
        }

        var email = text(data.email);
        if (!email) {
            errors.email = "Enter your email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
            errors.email = "This is not a valid email address.";
        }

        var password = typeof data.password === "string" ? data.password : "";
        if (!password) {
            errors.password = "Enter a password.";
        } else if (password.length < Account.PASSWORD_MIN) {
            errors.password = `The password must be at least ${Account.PASSWORD_MIN} characters long.`;
        } else if (password.length > Account.PASSWORD_MAX) {
            errors.password = `The password can be at most ${Account.PASSWORD_MAX} characters long.`;
        } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            errors.password = "Use a lowercase letter, an uppercase letter and a number.";
        }

        if (!data.passwordConfirm) {
            errors.passwordConfirm = "Enter the password again.";
        } else if (data.passwordConfirm !== password) {
            errors.passwordConfirm = "The two passwords don't match.";
        }

        if (!data.acceptedPrivacy) {
            errors.acceptedPrivacy = "You have to accept the privacy policy to register.";
        }

        return errors;
    }

    get firstName() { return this.#firstName; }
    get lastName() { return this.#lastName; }
    get fullName() { return `${this.#lastName} ${this.#firstName}`; }
    get username() { return this.#username; }
    get email() { return this.#email; }
    get newsletter() { return this.#newsletter; }

    checkPassword(password) {
        return password === this.#password;
    }

    matches(identifier) {
        var id = String(identifier).trim().toLowerCase();
        return id === this.#username.toLowerCase() || id === this.#email;
    }

    toJSON() {
        return {
            username: this.#username,
            email: this.#email,
            firstName: this.#firstName,
            lastName: this.#lastName,
            newsletter: this.#newsletter
        };
    }

    toString() {
        return `Account(${this.#username})`;
    }
}

class AccountStore {
    static #accounts = [];
    static #currentUser = null;

    static register(account) {
        if (!(account instanceof Account)) {
            throw new TypeError("AccountStore.register expects an Account");
        }
        const errors = {};
        if (AccountStore.#accounts.some((a) => a.matches(account.username))) {
            errors.username = "This username is already taken.";
        }
        if (AccountStore.#accounts.some((a) => a.matches(account.email))) {
            errors.email = "An account with this email address already exists.";
        }
        if (Object.keys(errors).length > 0) {
            throw new AccountValidationError(errors);
        }
        AccountStore.#accounts.push(account);
        return account;
    }

    static login(identifier, password) {
        const account = AccountStore.#accounts.find((a) => a.matches(identifier));
        if (account && account.checkPassword(password)) {
            AccountStore.#currentUser = account;
            return account;
        }
        return null;
    }

    static logout() {
        AccountStore.#currentUser = null;
    }

    static get currentUser() {
        return AccountStore.#currentUser;
    }

    static get count() {
        return AccountStore.#accounts.length;
    }
}