class Meccs {
    #csapatA
    #csapatB
    #idopont
    #tipus

    constructor(csapatA, csapatB, idopont, tipus = "Match") {
        this.setCsapatA(csapatA)
        this.setCsapatB(csapatB)
        this.setIdopont(idopont)
        this.setTipus(tipus)
    }

    static validal(adat, ma = new Date()) {
        var hibak = []
        var ellenfel = typeof adat.ellenfel === "string" ? adat.ellenfel.trim() : ""
        if (ellenfel.length < 2 || ellenfel.length > 24) {
            hibak.push("The opponent's name must be 2–24 characters long.")
        } else if (ellenfel.toLowerCase() === String(adat.sajat || "").toLowerCase()) {
            hibak.push("A team can't play against itself.")
        }
        var d = new Date(adat.idopont)
        if (typeof adat.idopont !== "string" || adat.idopont === "" || isNaN(d.getTime())) {
            hibak.push("Enter a valid date and time.")
        } else if (d.getTime() <= ma.getTime()) {
            hibak.push("The match must be in the future.")
        }
        return hibak
    }

    setCsapatA(nev) {
        this.#csapatA = typeof nev === "string" && nev.trim() !== "" ? nev.trim() : "Unknown"
    }
    setCsapatB(nev) {
        this.#csapatB = typeof nev === "string" && nev.trim() !== "" ? nev.trim() : "Unknown"
    }
    setIdopont(idopont) {
        this.#idopont = typeof idopont === "string" && !isNaN(new Date(idopont).getTime()) ? idopont : ""
    }
    setTipus(tipus) {
        this.#tipus = tipus === "Scrim" ? "Scrim" : "Match"
    }

    getCsapatA() {
        return this.#csapatA }
    getCsapatB() {
        return this.#csapatB }
    getIdopont() {
        return this.#idopont }
    getTipus() {
        return this.#tipus }

    getDatum() {
        return this.#idopont.slice(0, 10)
    }
    getIdoRovid() {
        return this.#idopont.slice(11, 16)
    }
    getMillis() {
        return new Date(this.#idopont).getTime()
    }
}
