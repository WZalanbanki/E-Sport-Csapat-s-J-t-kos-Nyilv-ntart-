class Meccs {
    #AcsapatNev
    #BcsapatNev
    #csapatA
    #csapatB
    #pontA
    #pontB
    #idopont
    #MAXFO = 5
    constructor(aCsapatNev, bCsapatNev, idopont) {
        this.setAcsapatNev(aCsapatNev)
        this.setBcsapatNev(bCsapatNev)
        this.#csapatA = []
        this.#csapatB = []
        this.#pontA = 0
        this.#pontB = 0
        this.setIdopont(idopont)
    }
    setAcsapatNev(aCsapatNev){
        this.#AcsapatNev=aCsapatNev
    }
    setBcsapatNev(bCsapatNev){
        this.#BcsapatNev=bCsapatNev
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
            this.#idopont = "Invalid data"
            return
        }

        if (meccs > date) {
            this.#idopont = "Upcoming event"
        } else if (elteltIdo <= (45 * 60 * 1000)) {
            this.#idopont = "Event in progress"
        } else {
            this.#idopont = "Past event"
        }
    }
    getIdopont(){
        return this.#idopont
    }
    getAcsapatNev(){
        return this.#AcsapatNev
    }
    getBcsapatNev(){
        return this.#BcsapatNev
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
        return "The team is empty"
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
        return "The team is empty"
    }
    getPontA() {
        return this.#pontA
    }
    getPontB() {
        return this.#pontB
    }
}