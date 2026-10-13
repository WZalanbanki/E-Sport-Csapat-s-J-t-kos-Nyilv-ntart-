class Felhasznalo {
    #keresztnev
    #vezeteknev
    #username
    #email
    #jelszo
    #hirlevel

    constructor(adat = {}) {
        this.setKeresztnev(adat.keresztnev)
        this.setVezeteknev(adat.vezeteknev)
        this.setUsername(adat.username)
        this.setEmail(adat.email)
        this.setJelszo(adat.jelszo)
        this.setHirlevel(adat.hirlevel)
    }

    static validal(adat) {
        var hibak = []
        var nevMinta = /^\p{L}[\p{L} '-]*$/u
        var kereszt = typeof adat.keresztnev === "string" ? adat.keresztnev.trim() : ""
        var vezetek = typeof adat.vezeteknev === "string" ? adat.vezeteknev.trim() : ""
        var username = typeof adat.username === "string" ? adat.username.trim() : ""
        var email = typeof adat.email === "string" ? adat.email.trim() : ""
        var jelszo = typeof adat.jelszo === "string" ? adat.jelszo : ""

        if (kereszt.length < 2 || kereszt.length > 30 || !nevMinta.test(kereszt)) {
            hibak.push("The first name must be 2–30 characters long and contain only letters.")
        }
        if (vezetek.length < 2 || vezetek.length > 30 || !nevMinta.test(vezetek)) {
            hibak.push("The last name must be 2–30 characters long and contain only letters.")
        }
        if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) {
            hibak.push("The username must be 3–16 characters long (letters, numbers, underscore).")
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
            hibak.push("Enter a valid email address.")
        }
        if (jelszo.length < 8 || !/[A-Za-z]/.test(jelszo) || !/\d/.test(jelszo)) {
            hibak.push("The password must be at least 8 characters long and contain a letter and a number.")
        }
        if (jelszo !== adat.jelszo2) {
            hibak.push("The two passwords don't match.")
        }
        if (adat.adat !== true) {
            hibak.push("You have to accept the privacy policy.")
        }
        return hibak
    }

    setKeresztnev(nev) {
        this.#keresztnev = typeof nev === "string" && nev.trim().length >= 2 ? nev.trim() : "Unknown"
    }
    setVezeteknev(nev) {
        this.#vezeteknev = typeof nev === "string" && nev.trim().length >= 2 ? nev.trim() : "Unknown"
    }
    setUsername(username) {
        this.#username = typeof username === "string" && /^[A-Za-z0-9_]{3,16}$/.test(username.trim()) ? username.trim() : "guest"
    }
    setEmail(email) {
        this.#email = typeof email === "string" ? email.trim() : ""
    }
    setJelszo(jelszo) {
        this.#jelszo = typeof jelszo === "string" ? jelszo : ""
    }
    setHirlevel(hirlevel) {
        this.#hirlevel = hirlevel === true
    }

    getKeresztnev() {
        return this.#keresztnev
    }
    getVezeteknev() {
        return this.#vezeteknev }
    getUsername() {
        return this.#username }
    getEmail() {
        return this.#email }
    getHirlevel() {
        return this.#hirlevel }

    jelszoEgyezik(jelszo) {
        return this.#jelszo !== "" && this.#jelszo === jelszo
    }

    getTeljesNev() {
        return this.#vezeteknev + " " + this.#keresztnev
    }
    getInicialek() {
        return (this.#vezeteknev.charAt(0) + this.#keresztnev.charAt(0)).toUpperCase()
    }

    toString() {
        return "{" + this.#username + ", " + this.getTeljesNev() + "}"
    }
}
