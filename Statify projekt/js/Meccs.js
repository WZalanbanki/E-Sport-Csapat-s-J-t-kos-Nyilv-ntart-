class Meccs {
    #csapatA
    #csapatB
    #pontA
    #pontB
    #idopont
    #MAXFO = 5
    constructor(idopont) {
        this.#csapatA = []
        this.#csapatB = []
        this.#pontA = 0
        this.#pontB = 0
        this.setIdopont(idopont)
    }
    csapatAhozzaad(jatekos) {
        for (let i = 0; i < jatekos.length; i++) {
            if (i < this.#MAXFO) {
                this.#csapatA.push(jatekos[i])
            }
        }
    }
    csapatBhozzaad(jatekos) {
        for (let i = 0; i < jatekos.length; i++) {
            if (i < this.#MAXFO) {
                this.#csapatB.push(jatekos[i])
            }
        }

    }
    setPontA() {
        this.#pontA++
    }
    setPontB() {
        this.#pontB++
    }
    setIdopont(idopont) {
        var date = new Date()
        var meccs = new Date(idopont)
        var elteltIdo = date - meccs

        if (isNaN(meccs.getTime())) {
            this.#idopont = "Hibás adat"
            return
        }

        if (meccs > date) {
            this.#idopont = "Közelgő esemény"
        } else if (elteltIdo <= (45 * 60 * 1000)) {
            this.#idopont = "Folyamatben lévő esemény"
        } else {
            this.#idopont = "Már megtörtént esemény"
        }
    }
    getIdopont(){
        return this.#idopont
    }
    getCsapatA() {
        var er = ""
        for (let i = 0; i < this.#csapatA.length; i++) {
            if ((i + 1) >= this.#csapatA.length) {
                er += this.#csapatA[i]
            } else {
                er += this.#csapatA[i] + ", "
            }
        }
        if (er != "") {
            return er
        }
        return "A csapat üres"
    }
    getCsapatB() {
        var er = ""
        for (let i = 0; i < this.#csapatB.length; i++) {
            if ((i + 1) >= this.#csapatB.length) {
                er += this.#csapatB[i]
            } else {
                er += this.#csapatB[i] + ", "
            }

        }
        if (er != "") {
            return er
        }
        return "A csapat üres"
    }
    getPontA() {
        return this.#pontA
    }
    getPontB() {
        return this.#pontB
    }
}
