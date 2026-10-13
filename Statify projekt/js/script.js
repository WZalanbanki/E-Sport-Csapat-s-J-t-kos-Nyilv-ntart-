var csapat = new Csapat("Alpha Squad", 60000, 124, 38, 14)
csapat.hozzaad(new Jatekos({ nick: "donk", szerep: "Entry Fragger", status: "Active", kill: 1850, death: 1000, won: 41, lost: 9, hs: 38, rating: 1.32, fizetes: 8500, lejar: "2028-06-30", trend: [70, 74, 72, 78, 80, 79, 82, 82] }))
csapat.hozzaad(new Jatekos({ nick: "ZywOo", szerep: "AWPer", status: "Active", kill: 1720, death: 1000, won: 39, lost: 11, hs: 52, rating: 1.24, fizetes: 7800, lejar: "2027-01-31", trend: [66, 70, 68, 75, 74, 77, 76, 78] }))
csapat.hozzaad(new Jatekos({ nick: "m0NESY", szerep: "AWPer", status: "Active", kill: 1180, death: 1000, won: 36, lost: 12, hs: 41, rating: 1.12, fizetes: 7200, lejar: "2027-12-31", trend: [78, 76, 77, 74, 75, 76, 74, 75] }))
csapat.hozzaad(new Jatekos({ nick: "sh1ro", szerep: "AWPer", status: "Active", kill: 1090, death: 1000, won: 30, lost: 10, hs: 44, rating: 1.18, fizetes: 6900, lejar: "2027-09-15", trend: [60, 64, 70, 68, 74, 72, 75, 75] }))
csapat.hozzaad(new Jatekos({ nick: "blameF", szerep: "Rifler", status: "Active", kill: 1250, death: 1000, won: 28, lost: 9, hs: 47, rating: 1.08, fizetes: 6500, lejar: "2027-03-20", trend: [82, 80, 78, 79, 77, 78, 76, 75] }))
csapat.hozzaad(new Jatekos({ nick: "REZ", szerep: "Rifler", status: "Benched", kill: 760, death: 800, won: 12, lost: 8, hs: 36, rating: 0.97, fizetes: 3000, lejar: "2027-05-01", trend: [55, 52, 58, 60, 57, 61, 60, 60] }))
 
function idopont(ora) {
    var d = new Date(Date.now() + ora * 3600000)
    return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}
 
var meccsek = [
    new Meccs("Nexus", "Team Fury", idopont(3), "Match"),
    new Meccs("Nexus", "Fnatic Rising", idopont(27), "Match"),
    new Meccs("Nexus", "Dark Pulse", idopont(52), "Scrim")
]
var mezok = ["nick", "szerep", "status", "kill", "death", "won", "lost", "hs", "rating", "fizetes", "lejar"]
var szamMezok = ["kill", "death", "won", "lost", "hs", "rating", "fizetes"]
var szerkIndex = null
 
function vedett(szoveg) { return $("<div>").text(szoveg).html() }
function nagyKezdo(szoveg) { return szoveg[0].toUpperCase() + szoveg.slice(1) }
function szinArnyalat(nick) { var h = 0; for (var i = 0; i < nick.length; i++) h = (h * 31 + nick.charCodeAt(i)) % 360; return h }
function jegyOsztaly(betu) { return "r-" + betu.toLowerCase().replace("+", "plus") }
function statuszNev(status) { return { Active: "Aktív", Benched: "Padon", Injured: "Sérült" }[status] }
function ablak(nev, nyit) { var m = bootstrap.Modal.getOrCreateInstance(document.querySelector("." + nev)); nyit ? m.show() : m.hide() }
 
function diagram(trend, szel, mag, osztaly) {
    var min = Math.min(...trend), max = Math.max(...trend), pontok = ""
    for (var i = 0; i < trend.length; i++) {
        pontok += (i * szel / (trend.length - 1)) + "," + (mag - 3 - (trend[i] - min) / (max - min || 1) * (mag - 6)) + " "
    }
    return `<svg class="${osztaly}" viewBox="0 0 ${szel} ${mag}"><polyline class="spark-line chart-line" points="${pontok}"></polyline></svg>`
}
 
function nagyDiagram(trend) {
    if (trend.length < 2) {
        return "<p>Nincs elég adat a diagramhoz.</p>"
    }

    var szel = 640
    var mag = 240
    var bal = 44
    var jobb = 18
    var fent = 18
    var lent = 32
    var rajzSzel = szel - bal - jobb
    var rajzMag = mag - fent - lent

    var legkisebb = trend[0]
    var legnagyobb = trend[0]
    for (var i = 1; i < trend.length; i++) {
        if (trend[i] < legkisebb) {
            legkisebb = trend[i]
        }
        if (trend[i] > legnagyobb) {
            legnagyobb = trend[i]
        }
    }

    var min = Math.floor((legkisebb - 5) / 10) * 10
    var max = min + Math.ceil((legnagyobb + 5 - min) / 20) * 20
 
    var svg = '<svg class="big-chart" viewBox="0 0 ' + szel + ' ' + mag + '">'

    for (var k = 0; k <= 4; k++) {
        var ertek = min + (max - min) * k / 4
        var y = fent + rajzMag - rajzMag * k / 4
        svg += '<line class="grid-line" x1="' + bal + '" y1="' + y + '" x2="' + (szel - jobb) + '" y2="' + y + '"></line>'
        svg += '<text class="axis-text" x="' + (bal - 8) + '" y="' + (y + 4) + '" text-anchor="end">' + Math.round(ertek) + '%</text>'
    }

    var pontok = ""
    var korok = ""
    var cimkek = ""
    var utolsoX = 0
    var utolsoY = 0
    for (var i = 0; i < trend.length; i++) {
        var x = bal + rajzSzel * i / (trend.length - 1)
        var y = fent + rajzMag - (trend[i] - min) / (max - min) * rajzMag
        pontok += x + "," + y + " "
        korok += '<circle class="chart-dot" cx="' + x + '" cy="' + y + '" r="4.5"><title>' + trend[i] + '%</title></circle>'
        cimkek += '<text class="axis-text" x="' + x + '" y="' + (mag - 10) + '" text-anchor="middle">' + (i + 1) + '.</text>'
        utolsoX = x
        utolsoY = y
    }

    var alja = fent + rajzMag
    svg += '<polygon class="chart-area" points="' + bal + ',' + alja + ' ' + pontok + (szel - jobb) + ',' + alja + '"></polygon>'

    svg += '<polyline class="chart-line" points="' + pontok + '"></polyline>'
    svg += korok
    svg += cimkek

    svg += '<text class="chart-last" x="' + utolsoX + '" y="' + (utolsoY - 12) + '" text-anchor="end">' + trend[trend.length - 1] + '%</text>'
 
    svg += '</svg>'
    return svg
}
 
function uzenet(tipus, cim, szoveg) {
    var t = $(`<div class="toast toast-neon t-${tipus}"><div class="toast-header"><strong class="me-auto">${vedett(cim)}</strong>
        <button class="btn-close btn-close-white" data-bs-dismiss="toast"></button></div><div class="toast-body">${vedett(szoveg)}</div></div>`)
    $(".toastHely").append(t)
    new bootstrap.Toast(t[0]).show()
}
 
function hibaDoboz(hely, hibak) {
    $(hely).html(hibak.length ? "<ul><li>" + hibak.map(vedett).join("</li><li>") + "</li></ul>" : "").toggleClass("d-none", !hibak.length)
}
 
function kiIr() {
    var lista = csapat.getJatekosok(), aktivak = csapat.getAktiv(), html = "", csempek = ""
    lista.forEach(function (j, i) {
        var aktiv = j.getStatus() == "Active"
        html += `<div class="roster-row ${jegyOsztaly(j.getBetu())} ${aktiv ? "" : "sidelined"}" style="--h:${szinArnyalat(j.getNick())}">
            <div class="cell cell-player"><div class="nick">${vedett(j.getNick())}</div><div class="sub">${j.getMeccsek()} meccs</div></div>
            <div class="cell role">${j.getSzerep()}<div class="sub">HLTV ${j.getRating().toFixed(2)} · HS ${j.getHs()}%</div></div>
            <div class="cell"><span class="status-badge st-${j.getStatus().toLowerCase()}">${statuszNev(j.getStatus())}</span></div>
            <div class="cell kd">${j.getKD().toFixed(2)}</div>
            <div class="cell winrate" data-index="${i}">${j.getWinrate()}% ${diagram(j.getTrend(), 72, 26, "spark")}</div>
            <div class="cell"><span class="letter">${j.getBetu()}</span></div>
            <div class="cell salary">${j.getFizetes()} €/hó <span class="sub">lejár: ${vedett(j.getLejar())}</span></div>
            <div class="cell cell-actions">
                <button class="act btn-edit" data-index="${i}">Szerkesztés</button>
                <button class="act btn-bench" data-index="${i}">${aktiv ? "Padra" : "Aktiválás"}</button>
                <button class="act btn-contact" data-index="${i}">Kapcsolat</button>
            </div></div>`
    })
    $(".jatekosok").html(html || "<p>Még nincs játékos a keretben.</p>")
 
    for (var i = 0; i < Csapat.MAX_AKTIV; i++) {
        csempek += i < aktivak.length ? `<div class="tile" style="--h:${szinArnyalat(aktivak[i].getNick())}">${vedett(aktivak[i].getNick()[0])}</div>` : `<div class="tile empty">+</div>`
    }
    var arany = Math.min(100, Math.round(csapat.getOsszFizetes() / csapat.getKoltsegvetes() * 100))
    $(".squad-tiles").html(csempek)
    $(".squad-name").html(vedett(csapat.getNev()))
    $(".keretSzam").html(lista.length + "/" + Csapat.MAX_KERET)
    $(".rank-num").html("#" + csapat.getRang())
    $(".csWins").html(csapat.getWins())
    $(".csLosses").html(csapat.getLosses())
    $(".csWinrate").html(csapat.getWinrate() + "%")
    $(".aktivSzam").html(aktivak.length + " aktív játékos")
    $(".padSzam").html(csapat.getPadon().length + " padon")
    $(".serultSzam").html(csapat.getSerult().length + " sérült")
    $(".serultSzam").removeClass("d-none")
    $(".budgetSzoveg").html(csapat.getOsszFizetes() + " € / " + csapat.getKoltsegvetes() + " €")
    $(".budgetCsik").css("width", arany + "%").toggleClass("veszely", arany >= 90)
 
    meccsek.sort(function (a, b) { return a.getMillis() - b.getMillis() })
    $(".matches").html(meccsek.map(function (m) {
        return `<li>${vedett(m.getCsapatA())} vs ${vedett(m.getCsapatB())}${m.getTipus() == "Scrim" ? '<span class="tag-scrim">EDZŐMECCS</span>' : ""}
            <span class="when">${m.getDatum()} ${m.getIdoRovid()}</span></li>`
    }).join(""))
}
 
function jatekosMent() {
    var adat = {}
    var hibak = []

    for (var i = 0; i < mezok.length; i++) {
        var mezo = mezok[i]
        var ertek = $(".p" + nagyKezdo(mezo)).val().trim()
 
        if (szamMezok.includes(mezo)) {
            if (ertek == "") {
                hibak.push("A(z) " + mezo + " mező kitöltése kötelező.")
                adat[mezo] = 0
            } else {
                adat[mezo] = Number(ertek)
            }
        } else {
            adat[mezo] = ertek
        }
    }

    if (hibak.length > 0) {
        hibaDoboz(".jatekosHiba", hibak)
        return
    }

    hibak = Jatekos.validal(adat)
    if (hibak.length > 0) {
        hibaDoboz(".jatekosHiba", hibak)
        return
    }
 
    var eredmeny
    if (szerkIndex == null) {
        var osszes = adat.won + adat.lost
        var winrate = 0
        if (osszes > 0) {
            winrate = Math.round(adat.won / osszes * 100)
        }
        adat.trend = []
        for (var k = 0; k < 8; k++) {
            adat.trend.push(winrate)
        }
        eredmeny = csapat.hozzaad(new Jatekos(adat))
    } else {
        adat.trend = csapat.getJatekosok()[szerkIndex].getTrend()
        eredmeny = csapat.lecserel(szerkIndex, new Jatekos(adat))
    }
 
    if (!eredmeny.ok) {
        hibaDoboz(".jatekosHiba", [eredmeny.hiba])
        return
    }
 
    ablak("jatekosModal", false)
    kiIr()
    uzenet("success", "Mentve", adat.nick + " adatai elmentve.")
}
 
function urlapNyit(index) {
    szerkIndex = index
    var j = csapat.getJatekosok()[index]
    mezok.forEach(function (m) { $(".p" + nagyKezdo(m)).val(j ? j["get" + nagyKezdo(m)]() : "") })
    if (!j) { $(".pSzerep").val("Entry"); $(".pStatus").val("Benched") }
    $(".jatekosModalLabel").html(j ? "Játékos szerkesztése" : "Új játékos")
    $(".btnKiad").toggleClass("d-none", !j)
    hibaDoboz(".jatekosHiba", [])
    ablak("jatekosModal", true)
}
 
$(document).ready(function () {
    kiIr()
    var jatekosa = function (gomb) { return csapat.getJatekosok()[$(gomb).data("index")] }
 
    $(".btnUjJatekos").click(function () { urlapNyit(null) })
    $(".jatekosok").on("click", ".btn-edit", function () { urlapNyit($(this).data("index")) })
    $(".jatekosok").on("click", ".btn-contact", function () { uzenet("info", "Üzenet elküldve", jatekosa(this).getNick() + " megkapta a megkeresést.") })
 
    $(".jatekosok").on("click", ".btn-bench", function () {
        var eredmeny = csapat.statuszValt($(this).data("index"))
        if (!eredmeny.ok) return uzenet("error", "Nem lehetséges", eredmeny.hiba)
        uzenet("info", "Státusz módosítva", jatekosa(this).getNick() + " mostantól: " + statuszNev(jatekosa(this).getStatus()) + ".")
        kiIr()
    })
 
    $(".jatekosok").on("click", ".winrate", function () {
        var j = jatekosa(this)
        $(".reszletModal .detail-wrap").removeClass("r-aplus r-a r-bplus r-b r-c").addClass(jegyOsztaly(j.getBetu()))
        $(".modalNick").html(vedett(j.getNick()))
        $(".modalSzerep").html(j.getSzerep())
        $(".modalStatusz").html(statuszNev(j.getStatus()))
        $(".modalBetu").html(j.getBetu())
        $(".modalKD").html(j.getKD().toFixed(2))
        $(".modalKillDeath").html(j.getKill() + " ölés / " + j.getDeath() + " halál")
        $(".modalWinrate").html(j.getWinrate() + "%")
        $(".modalWL").html(j.getWon() + " győzelem / " + j.getLost() + " vereség")
        $(".modalRating").html(j.getRating().toFixed(2))
        $(".modalHs").html("HS " + j.getHs() + "%")
        $(".modalFizetes").html(j.getFizetes() + " €/hó")
        $(".modalLejar").html("lejár: " + vedett(j.getLejar()))
        $(".modalDiagram").html(nagyDiagram(j.getTrend()))
        ablak("reszletModal", true)
    })
 
    $(".btnMent").click(jatekosMent)
    $(".jatekosUrlap").submit(function (e) { e.preventDefault(); jatekosMent() })
 
    $(".btnKiad").click(function () {
        $(".torlesNev").html(vedett(csapat.getJatekosok()[szerkIndex].getNick()))
        ablak("jatekosModal", false)
        ablak("torlesModal", true)
    })
    $(".btnTorol").click(function () {
        var nick = csapat.getJatekosok()[szerkIndex].getNick()
        csapat.eltavolit(szerkIndex)
        ablak("torlesModal", false)
        kiIr()
        uzenet("info", "Játékos elengedve", nick + " elhagyta a keretet.")
    })
 
    $(".btnScrim, .btnScrimMini").click(function () {
        $(".sEllenfel, .sIdopont").val("")
        hibaDoboz(".scrimHiba", [])
        ablak("scrimModal", true)
    })
    $(".btnScrimMent").click(function () {
        var adat = { ellenfel: $(".sEllenfel").val().trim(), sajat: "Nexus", idopont: $(".sIdopont").val() }
        var hibak = Meccs.validal(adat)
        if (hibak.length) return hibaDoboz(".scrimHiba", hibak)
        meccsek.push(new Meccs("Nexus", adat.ellenfel, adat.idopont, "Scrim"))
        ablak("scrimModal", false)
        kiIr()
        uzenet("success", "Edzőmeccs felvéve", "Edzőmeccs a(z) " + adat.ellenfel + " ellen bekerült a naptárba.")
    })
 
    $(".btnSzerzodes").click(function () {
        $(".szerzodesek").html(csapat.getJatekosok().map(function (j) {
            var nap = Math.ceil((new Date(j.getLejar()) - new Date()) / 86400000)
            var szin = nap < 120 ? "text-red" : nap < 270 ? "text-cyan" : "text-green"
            return `<tr><td><b>${vedett(j.getNick())}</b></td><td>${j.getSzerep()}</td><td>${j.getFizetes()} €/hó</td>
                <td>${vedett(j.getLejar())}</td><td class="${szin}">${nap} nap</td></tr>`
        }).join(""))
        ablak("szerzodesModal", true)
    })
})