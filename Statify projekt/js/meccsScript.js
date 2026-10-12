var kepek = [
    "img/playersSideView.jpg",
    "img/stadionFront.jpg",
    "img/stadionFrontLow.png"
]

var aktualis = 0

var jatekosA1 = ["Pista", "Rozi", "Gábor", "Andrea", "Éva"]
var jatekosB1 = ["Pistaa", "Rozii", "Gáborr", "Andreaa", "Évaa", "Irén"]
var meccs1 = new Meccs("Kassa", "Köln", "2026-10-10T19:59")
meccs1.csapatAhozzaad(jatekosA1)
meccs1.csapatBhozzaad(jatekosB1)
meccs1.setPontA()

var jatekosA2 = ["Géza", "Vilmos", "Gábor", "Gréta", "Emma"]
var jatekosB2 = ["Anna", "Adrienn", "Gusztáv", "György", "Ágnes", "Koppen"]
var meccs2 = new Meccs("Kis Várad", "Nagy Várad", "2026-10-08T19:39")
meccs2.csapatAhozzaad(jatekosA2)
meccs2.csapatBhozzaad(jatekosB2)
meccs2.setPontA()
meccs2.setPontB()
meccs2.setPontB()
meccs2.setPontB()
meccs2.setPontA()

var jatekosA3 = ["Géza", "Vilmos", "Gábor", "Gréta", "Lidl"]
var jatekosB3 = ["Anna", "Adrienn", "Gusztáv", "György", "Éva", "Koppen"]
var meccs3 = new Meccs("Budapest", "Magdolna", "2026-10-12T19:00")
meccs3.csapatAhozzaad(jatekosA3)
meccs3.csapatBhozzaad(jatekosB3)
meccs3.setPontA()
meccs3.setPontA()
meccs3.setPontB()
meccs3.setPontB()
meccs3.setPontB()

var jatekosA4 = ["Kiss Bence", "Nagy Dóra", "Tóth Máté"]
var jatekosB4 = ["Horváth Zsolt", "Kovács Lilla", "Molnár Ádám", "Farkas Eszter"]
var meccs4 = new Meccs("Sólymok", "Farkasok", "2026-10-20T12:39")
meccs4.csapatAhozzaad(jatekosA4)
meccs4.csapatBhozzaad(jatekosB4)
meccs4.setPontA()
meccs4.setPontB()

var jatekosA5 = ["Gál Márk", "Rácz Vivien", "Fehér Bálint", "Kelemen Lilla", "Szűcs Ábel"]
var jatekosB5 = ["Bíró Hanna", "Sándor Olivér", "Pál Nóra", "Vincze Csaba", "Antal Réka"]
var meccs5 = new Meccs("Tigrisek", "Oroszlánok", "2026-10-14T09:39")
meccs5.csapatAhozzaad(jatekosA5)
meccs5.csapatBhozzaad(jatekosB5)

var jatekosA6 = ["Soós Dávid", "Hegedűs Anna"]
var jatekosB6 = ["Pintér Hanna", "Oláh Bálint", "Mészáros Kata"]
var meccs6 = new Meccs("Pumák", "Leopárdok", "2026-10-14T08:39")
meccs6.csapatAhozzaad(jatekosA6)
meccs6.csapatBhozzaad(jatekosB6)

var meccsek = [meccs1, meccs2, meccs3, meccs4, meccs5, meccs6]

function kiIr() {
    var lista = $(".meccsLista").html("")

    for (let i = 0; i < meccsek.length; i++) {
        lista.append(`
            <div class="meccsOszlop">
                <button type="button" class="kartya meccs" data-index="${i}" data-bs-toggle="modal" data-bs-target=".reszletek">
                    <img class="kep" src="${kepek[i % kepek.length]}" alt="Meccs kép">
                    <div class="adat">
                        <span class="statusz">${meccsek[i].getIdopont()}</span>
                        <div class="nevek">
                            <span class="doboz">${meccsek[i].getAcsapatNev()}</span>
                            <span>-</span>
                            <span class="doboz">${meccsek[i].getBcsapatNev()}</span>
                        </div>
                        <div class="reszletGomb">Részletek</div>
                    </div>
                </button>
            </div>
        `)
    }
}

function kiIrJatekosokA(jatekosok) {
    var lista = $(".mListaA").html("")
    var nevek = jatekosok.split(", ")

    for (let i = 0; i < nevek.length; i++) {
        if (nevek[i] != "A csapat üres") {
            lista.append("<li>" + nevek[i] + "</li>")
        }
    }
}

function kiIrJatekosokB(jatekosok) {
    var lista = $(".mListaB").html("")
    var nevek = jatekosok.split(", ")

    for (let i = 0; i < nevek.length; i++) {
        if (nevek[i] != "A csapat üres") {
            lista.append("<li>" + nevek[i] + "</li>")
        }
    }
}

function kiIrModal(index) {
    $(".mKep").attr("src", kepek[index % kepek.length])
    $(".reszletCim").html(meccsek[index].getAcsapatNev() + " - " + meccsek[index].getBcsapatNev())
    $(".mIdopont").html(meccsek[index].getIdopont())
    if (meccsek[index].getIdopont() == ("Folyamatben lévő esemény")) {
        $(".mPlusA").removeClass("disable")
        $(".mPlusB").removeClass("disable")
    } else {
        $(".mPlusA").addClass("disable")
        $(".mPlusB").addClass("disable")
    }
    $(".mPontA").html(meccsek[index].getPontA())
    $(".mPontB").html(meccsek[index].getPontB())
    $(".mNevA").html(meccsek[index].getAcsapatNev())
    $(".mNevB").html(meccsek[index].getBcsapatNev())

    kiIrJatekosokA(meccsek[index].getCsapatA())
    kiIrJatekosokB(meccsek[index].getCsapatB())
}



$(document).ready(() => {
    kiIr()

    $(".meccs").on("click", function () {
        aktualis = $(this).attr("data-index")
        kiIrModal(aktualis)
    })

    $(".mPlusA").on("click", function () {
        if (!$(this).hasClass("disable")) {
            meccsek[aktualis].setPontA()
            kiIrModal(aktualis)
        }
    })

    $(".mPlusB").on("click", function () {
        if (!$(this).hasClass("disable")) {
            meccsek[aktualis].setPontB()
            kiIrModal(aktualis)
        }
    })
})
