class Csapat {
    static MAX_AKTIV = 5
    static MAX_KERET = 8

    #nev
    #koltsegvetes
    #wins
    #losses
    #rang
    #jatekosok = []

    constructor(nev, koltsegvetes, wins, losses, rang) {
        this.setNev(nev)
        this.setKoltsegvetes(koltsegvetes)
        this.setWins(wins)
        this.setLosses(losses)
        this.setRang(rang)
    }

    setNev(nev) {
        this.#nev = typeof nev === "string" && nev.trim().length >= 2 ? nev.trim() : "Unnamed Squad"
    }
    setKoltsegvetes(koltsegvetes) {
        this.#koltsegvetes = szamE(koltsegvetes) && koltsegvetes > 0 ? koltsegvetes : 0
    }
    setWins(wins) {
        this.#wins = Number.isInteger(wins) && wins >= 0 ? wins : 0
    }
    setLosses(losses) {
        this.#losses = Number.isInteger(losses) && losses >= 0 ? losses : 0
    }
    setRang(rang) {
        this.#rang = Number.isInteger(rang) && rang > 0 ? rang : 0
    }

    getNev() {
        return this.#nev
    }
    getKoltsegvetes() {
        return this.#koltsegvetes
    }
    getWins() {
        return this.#wins
    }
    getLosses() {
        return this.#losses
    }
    getRang() {
        return this.#rang
    }
    getJatekosok() {
        return this.#jatekosok.slice()
    }

    getAktiv() {
        return this.#jatekosok.filter(j => j.getStatus() === "Active")
    }
    getPadon() {
        return this.#jatekosok.filter(j => j.getStatus() === "Benched")
    }
    getSerult() {
        return this.#jatekosok.filter(j => j.getStatus() === "Injured")
    }
    getOsszFizetes() {
        var osszeg = 0
        for (let i = 0; i < this.#jatekosok.length; i++) {
            osszeg += this.#jatekosok[i].getFizetes()
        }
        return osszeg
    }
    getMaradekKeret() {
        return this.#koltsegvetes - this.getOsszFizetes()
    }
    getWinrate() {
        var osszes = this.#wins + this.#losses
        if (osszes === 0) {
            return 0
        }
        return Math.round(this.#wins / osszes * 1000) / 10
    }

    #keres(nick, kiveve = -1) {
        return this.#jatekosok.findIndex((j, i) => i !== kiveve && j.getNick().toLowerCase() === nick.toLowerCase())
    }

    hozzaad(jatekos) {
        if (!(jatekos instanceof Jatekos)) {
            return { ok: false, hiba: "Only players can be added to the roster." }
        }
        if (this.#jatekosok.length >= Csapat.MAX_KERET) {
            return { ok: false, hiba: "The roster is full (" + Csapat.MAX_KERET + "/" + Csapat.MAX_KERET + ")." }
        }
        if (this.#keres(jatekos.getNick()) !== -1) {
            return { ok: false, hiba: jatekos.getNick() + " is already on the roster." }
        }
        if (jatekos.getFizetes() > this.getMaradekKeret()) {
            return { ok: false, hiba: "Not enough salary budget for " + jatekos.getNick() + "." }
        }
        if (jatekos.getStatus() === "Active" && this.getAktiv().length >= Csapat.MAX_AKTIV) {
            return { ok: false, hiba: "There are already " + Csapat.MAX_AKTIV + " active players. Add them as benched." }
        }
        this.#jatekosok.push(jatekos)
        return { ok: true, hiba: "" }
    }

    lecserel(index, uj) {
        if (!(uj instanceof Jatekos) || index < 0 || index >= this.#jatekosok.length) {
            return { ok: false, hiba: "The player to edit was not found." }
        }
        var regi = this.#jatekosok[index]
        if (this.#keres(uj.getNick(), index) !== -1) {
            return { ok: false, hiba: uj.getNick() + " is already on the roster." }
        }
        if (uj.getFizetes() - regi.getFizetes() > this.getMaradekKeret()) {
            return { ok: false, hiba: "The new salary does not fit into the budget." }
        }
        var aktivMasok = this.getAktiv().filter(j => j !== regi).length
        if (uj.getStatus() === "Active" && aktivMasok >= Csapat.MAX_AKTIV) {
            return { ok: false, hiba: "There are already " + Csapat.MAX_AKTIV + " active players." }
        }
        this.#jatekosok[index] = uj
        return { ok: true, hiba: "" }
    }

    statuszValt(index) {
        if (index < 0 || index >= this.#jatekosok.length) {
            return { ok: false, hiba: "The player was not found." }
        }
        var j = this.#jatekosok[index]
        if (j.getStatus() === "Active") {
            j.setStatus("Benched")
            return { ok: true, hiba: "" }
        }
        if (j.getStatus() === "Injured") {
            return { ok: false, hiba: j.getNick() + " is injured and can't be activated." }
        }
        if (this.getAktiv().length >= Csapat.MAX_AKTIV) {
            return { ok: false, hiba: "There are already " + Csapat.MAX_AKTIV + " active players. Bench someone first." }
        }
        j.setStatus("Active")
        return { ok: true, hiba: "" }
    }

    eltavolit(index) {
        if (index < 0 || index >= this.#jatekosok.length) {
            return false
        }
        this.#jatekosok.splice(index, 1)
        return true
    }
}
