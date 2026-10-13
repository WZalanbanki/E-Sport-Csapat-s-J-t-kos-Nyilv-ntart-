var jatekos1 = new Jatekos({ nick: "donk", szerep: "Entry Fragger", status: "Active", kill: 1850, death: 1000, won: 41, lost: 9, hs: 38, rating: 1.32, fizetes: 8500, lejar: "2028-06-30", trend: [70, 74, 72, 78, 80, 79, 82, 82] })
var jatekos2 = new Jatekos({ nick: "ZywOo", szerep: "AWPer", status: "Active", kill: 1720, death: 1000, won: 39, lost: 11, hs: 52, rating: 1.24, fizetes: 7800, lejar: "2027-01-31", trend: [66, 70, 68, 75, 74, 77, 76, 78] })
var jatekos3 = new Jatekos({ nick: "m0NESY", szerep: "AWPer", status: "Active", kill: 1180, death: 1000, won: 36, lost: 12, hs: 41, rating: 1.12, fizetes: 7200, lejar: "2027-12-31", trend: [78, 76, 77, 74, 75, 76, 74, 75] })
var jatekos4 = new Jatekos({ nick: "sh1ro", szerep: "AWPer", status: "Active", kill: 1090, death: 1000, won: 30, lost: 10, hs: 44, rating: 1.18, fizetes: 6900, lejar: "2027-09-15", trend: [60, 64, 70, 68, 74, 72, 75, 75] })
var jatekos5 = new Jatekos({ nick: "blameF", szerep: "Rifler", status: "Active", kill: 1250, death: 1000, won: 28, lost: 9, hs: 47, rating: 1.08, fizetes: 6500, lejar: "2027-03-20", trend: [82, 80, 78, 79, 77, 78, 76, 75] })
var jatekos6 = new Jatekos({ nick: "REZ", szerep: "Rifler", status: "Benched", kill: 760, death: 800, won: 12, lost: 8, hs: 36, rating: 0.97, fizetes: 3000, lejar: "2027-05-01", trend: [55, 52, 58, 60, 57, 61, 60, 60] })


var csapat = new Csapat("Alpha Squad", 60000, 124, 38, 14)
var jatekosokLista = [jatekos1, jatekos2, jatekos3, jatekos4, jatekos5, jatekos6]
for (let i = 0; i < jatekosokLista.length; i++) {
    csapat.hozzaad(jatekosokLista[i])
}

function idoPlusz(ora) {
    var d = new Date(Date.now() + ora * 3600 * 1000)
    var p = n => String(n).padStart(2, "0")
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "T" + p(d.getHours()) + ":" + p(d.getMinutes())
}

var meccsek = [
    new Meccs("Nexus", "Team Fury", idoPlusz(3), "Match"),
    new Meccs("Nexus", "Fnatic Rising", idoPlusz(27), "Match"),
    new Meccs("Nexus", "Dark Pulse", idoPlusz(52), "Scrim")
]

var szerkesztettIndex = null
var torlendoIndex = null

console.log(csapat)
console.log(csapat.getAktiv().length)

function esc(szoveg) {
    return $("<div>").text(String(szoveg)).html()
}

function hue(nick) {
    var h = 0
    for (let i = 0; i < nick.length; i++) {
        h = (h * 31 + nick.charCodeAt(i)) % 360
    }
    return h
}

function penz(ertek) {
    return ertek.toLocaleString("hu-HU") + " €"
}

function betuOsztaly(betu) {
    var osztalyok = { "A+": "r-aplus", "A": "r-a", "B+": "r-bplus", "B": "r-b", "C": "r-c" }
    return osztalyok[betu]
}

function statuszSzoveg(status) {
    var szovegek = { "Active": "Active", "Benched": "Benched", "Injured": "Injured" }
    return szovegek[status]
}

function statuszOsztaly(status) {
    return "st-" + status.toLowerCase()
}

function sparkline(trend) {
    if (trend.length < 2) {
        return ""
    }
    var w = 72
    var h = 26
    var min = Math.min.apply(null, trend)
    var max = Math.max.apply(null, trend)
    var tav = max - min || 1
    var pontok = []
    for (let i = 0; i < trend.length; i++) {
        var x = i / (trend.length - 1) * w
        var y = h - 3 - (trend[i] - min) / tav * (h - 6)
        pontok.push(x.toFixed(1) + "," + y.toFixed(1))
    }
    var vonal = pontok.join(" ")
    return `<svg class="spark" viewBox="0 0 ${w} ${h}" aria-hidden="true">
                <polygon class="spark-area" points="0,${h} ${vonal} ${w},${h}"></polygon>
                <polyline class="spark-line" points="${vonal}"></polyline>
            </svg>`
}

function nagyDiagram(trend) {
    if (trend.length < 2) {
        return `<p class="text-muted mb-0">Not enough data for the chart.</p>`
    }
    var w = 640, h = 240, bal = 44, jobb = 18, fent = 18, lent = 32
    var min = Math.floor((Math.min.apply(null, trend) - 5) / 10) * 10
    var max = min + Math.ceil((Math.max.apply(null, trend) + 5 - min) / 20) * 20
    var szel = w - bal - jobb
    var mag = h - fent - lent
    var racs = ""
    for (let k = 0; k <= 4; k++) {
        var ertek = min + (max - min) * k / 4
        var y = fent + mag - mag * k / 4
        racs += `<line class="grid-line" x1="${bal}" y1="${y}" x2="${w - jobb}" y2="${y}"></line>
                 <text class="axis-text" x="${bal - 8}" y="${y + 4}" text-anchor="end">${Math.round(ertek)}%</text>`
    }
    var pontok = []
    var korok = ""
    var cimkek = ""
    for (let i = 0; i < trend.length; i++) {
        var px = bal + szel * i / (trend.length - 1)
        var py = fent + mag - (trend[i] - min) / (max - min) * mag
        pontok.push(px.toFixed(1) + "," + py.toFixed(1))
        korok += `<circle class="chart-dot" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4.5"><title>${trend[i]}%</title></circle>`
        cimkek += `<text class="axis-text" x="${px.toFixed(1)}" y="${h - 10}" text-anchor="middle">${i + 1}.</text>`
    }
    var vonal = pontok.join(" ")
    var utolso = pontok[pontok.length - 1].split(",")
    return `<svg class="big-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Winrate trend">
                ${racs}
                <polygon class="chart-area" points="${bal},${fent + mag} ${vonal} ${w - jobb},${fent + mag}"></polygon>
                <polyline class="chart-line" points="${vonal}"></polyline>
                ${korok}${cimkek}
                <text class="chart-last" x="${utolso[0]}" y="${Number(utolso[1]) - 12}" text-anchor="end">${trend[trend.length - 1]}%</text>
            </svg>`
}

function napiCimke(meccs) {
    var most = new Date()
    var d = new Date(meccs.getIdopont())
    var napEltolas = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - new Date(most.getFullYear(), most.getMonth(), most.getDate())) / 86400000)
    if (napEltolas === 0) return "Today " + meccs.getIdoRovid()
    if (napEltolas === 1) return "Tomorrow " + meccs.getIdoRovid()
    return meccs.getDatum().slice(5).replace("-", ".") + ". " + meccs.getIdoRovid()
}

function uzenet(tipus, cim, szoveg) {
    var ikonok = { error: "bi-exclamation-octagon-fill", success: "bi-check-circle-fill", info: "bi-info-circle-fill" }
    var toast = $(`<div class="toast toast-neon t-${tipus}" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <i class="bi ${ikonok[tipus]} me-2"></i>
                            <strong class="me-auto toastCim"></strong>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body"></div>
                    </div>`)
    toast.find(".toastCim").text(cim)
    toast.find(".toast-body").text(szoveg)
    $(".toastHely").append(toast)
    toast.on("hidden.bs.toast", function () { toast.remove() })
    new bootstrap.Toast(toast[0], { animation: false, delay: tipus === "error" ? 6000 : 3500 }).show()
}

function hibaDoboz(selector, hibak) {
    var doboz = $(selector)
    if (hibak.length === 0) {
        doboz.addClass("d-none").html("")
        return
    }
    var lista = ""
    for (let i = 0; i < hibak.length; i++) {
        lista += `<li>${esc(hibak[i])}</li>`
    }
    doboz.html("<ul>" + lista + "</ul>").removeClass("d-none")
}

function hibaSzam(db) {
    return db + " error(s) in the form, please fix them."
}

function kiIr() {
    var jatekosok = csapat.getJatekosok()
    var lista = $(".jatekosok").html("")

    if (jatekosok.length === 0) {
        lista.append(`<div class="empty-roster"><i class="bi bi-person-x fs-2"></i><p>There are no players on the roster yet.</p></div>`)
    }

    for (let i = 0; i < jatekosok.length; i++) {
        var j = jatekosok[i]
        var betu = j.getBetu()
        var padGomb = j.getStatus() === "Active" ? "Bench" : "Activate"
        lista.append(`<div class="roster-row ${betuOsztaly(betu)} ${j.getStatus() === "Active" ? "" : "sidelined"}" style="--h:${hue(j.getNick())}">
                        <div class="cell cell-player">
                            <div>
                                <div class="nick">${esc(j.getNick())}</div>
                                <div class="sub">${j.getMeccsek()} matches</div>
                            </div>
                        </div>
                        <div class="cell role" data-label="Role">
                            ${j.getSzerep()}
                            <div class="sub">HLTV ${j.getRating().toFixed(2)} · HS ${j.getHs()}%</div>
                        </div>
                        <div class="cell" data-label="Status"><span class="status-badge ${statuszOsztaly(j.getStatus())}">${statuszSzoveg(j.getStatus())}</span></div>
                        <div class="cell kd" data-label="K/D">${j.getKD().toFixed(2)}</div>
                        <div class="cell winrate" data-label="Winrate" data-index="${i}" role="button" tabindex="0" title="Open detailed stats"><span>${j.getWinrate()}%</span>${sparkline(j.getTrend())}</div>
                        <div class="cell" data-label="Grade"><span class="letter">${betu}</span></div>
                        <div class="cell salary" data-label="Salary">${penz(j.getFizetes())}/mo<span class="sub">expires: ${esc(j.getLejar())}</span></div>
                        <div class="cell cell-actions">
                            <div class="actions">
                                <button type="button" class="act btn-edit" data-index="${i}">Edit</button>
                                <button type="button" class="act btn-bench" data-index="${i}">${padGomb}</button>
                                <button type="button" class="act btn-contact" data-index="${i}">Contact</button>
                            </div>
                        </div>
                    </div>`)
    }

    kiIrOldalso()
}

function kiIrOldalso() {
    var jatekosok = csapat.getJatekosok()

    $(".squad-name").html(esc(csapat.getNev()))
    $(".keretSzam").html(jatekosok.length + "/" + Csapat.MAX_KERET)
    $(".rank-num").html("#" + csapat.getRang())
    $(".csWins").html(csapat.getWins())
    $(".csLosses").html(csapat.getLosses())
    $(".csWinrate").html(String(csapat.getWinrate()).replace(".", ",") + "%")

    var aktiv = csapat.getAktiv()
    var csempek = ""
    for (let i = 0; i < Csapat.MAX_AKTIV; i++) {
        if (i < aktiv.length) {
            csempek += `<div class="tile" style="--h:${hue(aktiv[i].getNick())}" title="${esc(aktiv[i].getNick())}">${esc(aktiv[i].getNick().charAt(0))}</div>`
        } else {
            csempek += `<div class="tile empty"><i class="bi bi-plus"></i></div>`
        }
    }
    $(".squad-tiles").html(csempek)

    $(".aktivSzam").html(aktiv.length + " active players")
    $(".padSzam").html(csapat.getPadon().length + " benched")
    var serult = csapat.getSerult().length
    $(".serultSzam").html(serult + " injured").toggleClass("d-none", serult === 0)

    var arany = Math.min(100, Math.round(csapat.getOsszFizetes() / csapat.getKoltsegvetes() * 100))
    $(".budgetSzoveg").html(penz(csapat.getOsszFizetes()) + " / " + penz(csapat.getKoltsegvetes()))
    $(".budgetCsik").css("width", arany + "%").toggleClass("veszely", arany >= 90)

    kiIrMeccsek()
}

function kiIrMeccsek() {
    meccsek.sort((a, b) => a.getMillis() - b.getMillis())
    var lista = $(".matches").html("")
    for (let i = 0; i < meccsek.length; i++) {
        lista.append(`<li>
                        <i class="bi bi-shield-shaded"></i>
                        <span>${esc(meccsek[i].getCsapatA())} vs ${esc(meccsek[i].getCsapatB())}${meccsek[i].getTipus() === "Scrim" ? '<span class="tag-scrim">SCRIM</span>' : ""}</span>
                        <span class="when">${napiCimke(meccsek[i])}</span>
                    </li>`)
    }
}

function kiIrReszlet(index) {
    var j = csapat.getJatekosok()[index]
    var modal = $(".reszletModal .detail-wrap")
    modal.removeClass("r-aplus r-a r-bplus r-b r-c").addClass(betuOsztaly(j.getBetu()))

    $(".modalNick").html(esc(j.getNick()))
    $(".modalSzerep").html(j.getSzerep())
    $(".modalStatusz").html(statuszSzoveg(j.getStatus()))
    $(".modalBetu").html(j.getBetu())

    $(".modalKD").html(j.getKD().toFixed(2))
    $(".modalKillDeath").html(j.getKill() + " kills / " + j.getDeath() + " deaths")
    $(".modalWinrate").html(j.getWinrate() + "%")
    $(".modalWL").html(j.getWon() + " wins / " + j.getLost() + " losses")
    $(".modalRating").html(j.getRating().toFixed(2))
    $(".modalHs").html("HS " + j.getHs() + "% · " + j.getBetu() + " tier")
    $(".modalFizetes").html(penz(j.getFizetes()) + "/mo")
    $(".modalLejar").html("expires: " + esc(j.getLejar()))

    $(".modalDiagram").html(nagyDiagram(j.getTrend()))
}

function modalMegnyit(nev) {
    bootstrap.Modal.getOrCreateInstance(document.querySelector("." + nev)).show()
}
function modalBezar(nev) {
    bootstrap.Modal.getOrCreateInstance(document.querySelector("." + nev)).hide()
}

function urlapUrit() {
    $(".pNick").val("")
    $(".pSzerep").val("Entry")
    $(".pStatus").val("Benched")
    $(".pKill").val("")
    $(".pDeath").val("")
    $(".pWon").val("")
    $(".pLost").val("")
    $(".pHs").val("")
    $(".pRating").val("")
    $(".pFizetes").val("")
    $(".pLejar").val("")
    hibaDoboz(".jatekosHiba", [])
}

function kiIrModal(index) {
    urlapUrit()
    if (index === null) {
        $(".jatekosModalLabel").html("Add player")
        $(".btnKiad").addClass("d-none")
        return
    }
    var j = csapat.getJatekosok()[index]
    $(".jatekosModalLabel").html("Edit player")
    $(".btnKiad").removeClass("d-none")
    $(".pNick").val(j.getNick())
    $(".pSzerep").val(j.getSzerep())
    $(".pStatus").val(j.getStatus())
    $(".pKill").val(j.getKill())
    $(".pDeath").val(j.getDeath())
    $(".pWon").val(j.getWon())
    $(".pLost").val(j.getLost())
    $(".pHs").val(j.getHs())
    $(".pRating").val(j.getRating())
    $(".pFizetes").val(j.getFizetes())
    $(".pLejar").val(j.getLejar())
}

function szam(ertek) {
    var szoveg = String(ertek).trim()
    return szoveg === "" ? NaN : Number(szoveg)
}

function urlapAdat() {
    return {
        nick: $(".pNick").val(),
        szerep: $(".pSzerep").val(),
        status: $(".pStatus").val(),
        kill: szam($(".pKill").val()),
        death: szam($(".pDeath").val()),
        won: szam($(".pWon").val()),
        lost: szam($(".pLost").val()),
        hs: szam($(".pHs").val()),
        rating: szam($(".pRating").val()),
        fizetes: szam($(".pFizetes").val()),
        lejar: $(".pLejar").val()
    }
}

function jatekosMent() {
    var adat = urlapAdat()
    var hibak = Jatekos.validal(adat)
    if (hibak.length > 0) {
        hibaDoboz(".jatekosHiba", hibak)
        uzenet("error", "Invalid data", hibaSzam(hibak.length))
        return
    }

    var eredmeny
    if (szerkesztettIndex === null) {
        adat.trend = Array(8).fill(Math.round(adat.won / Math.max(1, adat.won + adat.lost) * 100))
        eredmeny = csapat.hozzaad(new Jatekos(adat))
    } else {
        var regi = csapat.getJatekosok()[szerkesztettIndex]
        adat.trend = regi.getTrend()
        eredmeny = csapat.lecserel(szerkesztettIndex, new Jatekos(adat))
    }

    if (!eredmeny.ok) {
        hibaDoboz(".jatekosHiba", [eredmeny.hiba])
        uzenet("error", "Not possible", eredmeny.hiba)
        return
    }

    modalBezar("jatekosModal")
    kiIr()
    uzenet("success", "Saved", adat.nick.trim() + (szerkesztettIndex === null ? " has joined the roster." : "'s details have been updated."))
}

function kiIrSzerzodesek() {
    var jatekosok = csapat.getJatekosok()
    var kimenet = ""
    var ma = new Date()
    for (let i = 0; i < jatekosok.length; i++) {
        var nap = Math.ceil((new Date(jatekosok[i].getLejar() + "T00:00:00") - ma) / 86400000)
        var szin = nap < 120 ? "text-red" : (nap < 270 ? "text-cyan" : "text-green")
        kimenet += `<tr>
                        <td><b>${esc(jatekosok[i].getNick())}</b></td>
                        <td>${jatekosok[i].getSzerep()}</td>
                        <td>${penz(jatekosok[i].getFizetes())}/mo</td>
                        <td>${esc(jatekosok[i].getLejar())}</td>
                        <td class="${szin}">${nap} days</td>
                    </tr>`
    }
    $(".szerzodesek").html(kimenet)
}

function scrimMent() {
    var adat = { ellenfel: $(".sEllenfel").val(), sajat: "Nexus", idopont: $(".sIdopont").val() }
    var hibak = Meccs.validal(adat)
    if (hibak.length > 0) {
        hibaDoboz(".scrimHiba", hibak)
        uzenet("error", "Invalid data", hibak[0])
        return
    }
    meccsek.push(new Meccs("Nexus", adat.ellenfel.trim(), adat.idopont, "Scrim"))
    modalBezar("scrimModal")
    kiIrMeccsek()
    uzenet("success", "Scrim scheduled", "Scrim against " + adat.ellenfel.trim() + " added to the calendar.")
}

function scrimMegnyit() {
    $(".sEllenfel").val("")
    $(".sIdopont").val("")
    hibaDoboz(".scrimHiba", [])
    modalMegnyit("scrimModal")
}

$(document).ready(function () {
    kiIr()

    $(".btnUjJatekos").on("click", function () {
        szerkesztettIndex = null
        kiIrModal(null)
        modalMegnyit("jatekosModal")
    })

    $(".jatekosok").on("click", ".btn-edit", function () {
        szerkesztettIndex = Number($(this).attr("data-index"))
        kiIrModal(szerkesztettIndex)
        modalMegnyit("jatekosModal")
    })

    $(".jatekosok").on("click", ".winrate", function () {
        var index = Number($(this).attr("data-index"))
        kiIrReszlet(index)
        modalMegnyit("reszletModal")
    })
    $(".jatekosok").on("keydown", ".winrate", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            $(this).trigger("click")
        }
    })

    $(".jatekosok").on("click", ".btn-bench", function () {
        var index = Number($(this).attr("data-index"))
        var nick = csapat.getJatekosok()[index].getNick()
        var eredmeny = csapat.statuszValt(index)
        if (!eredmeny.ok) {
            uzenet("error", "Not possible", eredmeny.hiba)
            return
        }
        var uj = csapat.getJatekosok()[index].getStatus() === "Active" ? "active" : "benched"
        kiIr()
        uzenet("info", "Status changed", nick + " is now " + uj + ".")
    })

    $(".jatekosok").on("click", ".btn-contact", function () {
        var index = Number($(this).attr("data-index"))
        uzenet("info", "Message sent", "Contact request sent to " + csapat.getJatekosok()[index].getNick() + ".")
    })

    $(".btnMent").on("click", jatekosMent)
    $(".jatekosUrlap").on("submit", function (e) { e.preventDefault(); jatekosMent() })

    $(".btnKiad").on("click", function () {
        torlendoIndex = szerkesztettIndex
        $(".torlesNev").html(esc(csapat.getJatekosok()[torlendoIndex].getNick()))
        modalBezar("jatekosModal")
        modalMegnyit("torlesModal")
    })
    $(".btnTorol").on("click", function () {
        var nick = csapat.getJatekosok()[torlendoIndex].getNick()
        csapat.eltavolit(torlendoIndex)
        modalBezar("torlesModal")
        kiIr()
        uzenet("info", "Player released", nick + " has left the roster.")
    })

    $(".btnScrim, .btnScrimMini").on("click", scrimMegnyit)
    $(".btnScrimMent").on("click", scrimMent)

    $(".btnSzerzodes").on("click", function () {
        kiIrSzerzodesek()
        modalMegnyit("szerzodesModal")
    })

})
