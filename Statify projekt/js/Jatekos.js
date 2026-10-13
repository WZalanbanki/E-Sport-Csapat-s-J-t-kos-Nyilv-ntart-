function szamE(x) {
    return typeof x === "number" && isFinite(x)
}

function datumE(s) {
    if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        return false
    }
    var d = new Date(s + "T00:00:00Z")
    return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s
}

class Jatekos {
    static SZEREPEK = ["Entry Fragger", "AWPer", "Rifler"]
    static STATUSOK = ["Active", "Benched", "Injured"]

    #nick
    #szerep
    #status
    #kill
    #death
    #won
    #lost
    #hs
    #rating
    #fizetes
    #lejar
    #trend

    constructor(adat = {}) {
        this.setNick(adat.nick)
        this.setSzerep(adat.szerep)
        this.setStatus(adat.status)
        this.setKill(adat.kill)
        this.setDeath(adat.death)
        this.setWon(adat.won)
        this.setLost(adat.lost)
        this.setHs(adat.hs)
        this.setRating(adat.rating)
        this.setFizetes(adat.fizetes)
        this.setLejar(adat.lejar)
        this.setTrend(adat.trend)
    }

    static validal(adat, ma = new Date().toISOString().slice(0, 10)) {
        var hibak = []
        var nick = typeof adat.nick === "string" ? adat.nick.trim() : ""
        if (nick.length < 2 || nick.length > 16) {
            hibak.push("The nickname must be 2–16 characters long.")
        }
        if (!Jatekos.SZEREPEK.includes(adat.szerep)) {
            hibak.push("Choose a valid role.")
        }
        if (!Jatekos.STATUSOK.includes(adat.status)) {
            hibak.push("Choose a valid status.")
        }
        if (!szamE(adat.kill) || adat.kill < 0) {
            hibak.push("Kills must be a number, at least 0.")
        }
        if (!szamE(adat.death) || adat.death < 0) {
            hibak.push("Deaths must be a number, at least 0.")
        }
        if (!Number.isInteger(adat.won) || adat.won < 0) {
            hibak.push("Wins must be a whole number, at least 0.")
        }
        if (!Number.isInteger(adat.lost) || adat.lost < 0) {
            hibak.push("Losses must be a whole number, at least 0.")
        }
        if (!szamE(adat.hs) || adat.hs < 0 || adat.hs > 100) {
            hibak.push("HS% must be between 0 and 100.")
        }
        if (!szamE(adat.rating) || adat.rating < 0.3 || adat.rating > 2.5) {
            hibak.push("The rating must be between 0.3 and 2.5.")
        }
        if (!szamE(adat.fizetes) || adat.fizetes < 500 || adat.fizetes > 30000) {
            hibak.push("The salary must be between €500 and €30,000 per month.")
        }
        if (!datumE(adat.lejar)) {
            hibak.push("Enter a valid contract end date.")
        } else if (adat.lejar <= ma) {
            hibak.push("The contract end date must be in the future.")
        }
        return hibak
    }

    setNick(nick) {
        if (typeof nick !== "string" || nick.trim().length < 2) {
            this.#nick = "Unknown"
        } else {
            this.#nick = nick.trim().slice(0, 16)
        }
    }
    setSzerep(szerep) {
        this.#szerep = Jatekos.SZEREPEK.includes(szerep) ? szerep : "Entry Fragger"
    }
    setStatus(status) {
        this.#status = Jatekos.STATUSOK.includes(status) ? status : "Benched"
    }
    setKill(kill) {
        this.#kill = szamE(kill) && kill >= 0 ? kill : 0
    }
    setDeath(death) {
        this.#death = szamE(death) && death >= 0 ? death : 0
    }
    setWon(won) {
        this.#won = Number.isInteger(won) && won >= 0 ? won : 0
    }
    setLost(lost) {
        this.#lost = Number.isInteger(lost) && lost >= 0 ? lost : 0
    }
    setHs(hs) {
        this.#hs = szamE(hs) && hs >= 0 && hs <= 100 ? hs : 0
    }
    setRating(rating) {
        this.#rating = szamE(rating) && rating >= 0.3 && rating <= 2.5 ? rating : 1
    }
    setFizetes(fizetes) {
        this.#fizetes = szamE(fizetes) && fizetes >= 0 ? fizetes : 0
    }
    setLejar(lejar) {
        this.#lejar = datumE(lejar) ? lejar : ""
    }
    setTrend(trend) {
        if (Array.isArray(trend) && trend.length > 1 && trend.every(szamE)) {
            this.#trend = trend.slice()
        } else {
            this.#trend = []
        }
    }

    getNick() {
        return this.#nick }
    getSzerep() {
        return this.#szerep }
    getStatus() {
        return this.#status }
    getKill() {
        return this.#kill }
    getDeath() {
        return this.#death }
    getWon() {
        return this.#won }
    getLost() {
        return this.#lost }
    getHs() {
        return this.#hs }
    getRating() {
        return this.#rating }
    getFizetes() {
        return this.#fizetes }
    getLejar() {
        return this.#lejar }
    getTrend() {
        return this.#trend.slice() }

    getMeccsek() {
        return this.#won + this.#lost
    }
    getKD() {
        if (this.#death === 0) {
            return this.#kill
        }
        return Math.round(this.#kill / this.#death * 100) / 100
    }
    getWinrate() {
        if (this.getMeccsek() === 0) {
            return 0
        }
        return Math.round(this.#won / this.getMeccsek() * 100)
    }
    getBetu() {
        if (this.#rating >= 1.25) return "A+"
        if (this.#rating >= 1.15) return "A"
        if (this.#rating >= 1.05) return "B+"
        if (this.#rating >= 0.95) return "B"
        return "C"
    }

    toString() {
        return "{" + this.#nick + ", " + this.#szerep + ", " + this.#status + "}"
    }
}