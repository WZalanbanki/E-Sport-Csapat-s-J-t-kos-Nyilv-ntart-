
var csapat1Jatekos = ["Pista", "Rozi", "Gábor", "Andrea", "Éva"]
var csapat2Jatekos = ["Pistaa", "Rozii", "Gáborr", "Andreaa", "Évaa", "Irén"]
var csapat1 = new Meccs("2026-10-10T19:59")
csapat1.csapatAhozzaad(csapat1Jatekos)
csapat1.csapatBhozzaad(csapat2Jatekos)

var csapat3Jatekos = ["Géza", "Vilmos", "Gábor", "Gréta", "Emma"]
var csapat4Jatekos = ["Anna", "Adrienn", "Gusztáv", "György", "Ágnes", "Koppen"]
var csapat2 = new Meccs("2026-10-08T19:39")
csapat2.csapatAhozzaad(csapat3Jatekos)
csapat2.csapatBhozzaad(csapat4Jatekos)

var csapat5Jatekos = ["Géza", "Vilmos", "Gábor", "Gréta", "Emma"]
var csapat6Jatekos = ["Anna", "Adrienn", "Gusztáv", "György", "Ágnes", "Koppen"]
var csapat3 = new Meccs("2026-10-05T12:39")
csapat3.csapatAhozzaad(csapat5Jatekos)
csapat3.csapatBhozzaad(csapat6Jatekos)

csapat1.setPontA()
csapat2.setPontB()
csapat2.setPontB()
csapat2.setPontB()
csapat2.setPontA()
csapat3.setPontB()
csapat3.setPontB()
csapat3.setPontA()
csapat3.setPontB()
csapat3.setPontA()

var meccsek = [csapat1, csapat2,csapat3]


console.log(csapat1)
console.log(csapat1.getCsapatA())
console.log(csapat1.getCsapatB())

function kiIr() {
    var cards = $(".cards").html("")
    for (let i = 0; i < meccsek.length; i++) {
        cards.append(`<div class="card ms-2" style="width: 18rem;">
                        <img src="https://esport1.hu/images/fb_share/64e73df70fedf_64e73df70fe96-harcba-indulnak-kihirdettek-a-magyar-e-sport-valogatott-vilagbajnoki-jatekoskeretet.jpg"
                            class="card-img-top" alt="Meccs kép" title="Meccs kép">
                        <div class="card-body text-center">
                            <h5 class="card-title text-center mb-3">Meccs ${i}</h5>
                            <div class="d-flex justify-content-around">
                                <div>
                                    <span>${meccsek[i].getPontA()}</span>
                                </div>
                                <div>
                                    <span>-</span>
                                </div>
                                <div>
                                    <span>${meccsek[i].getPontB()}</span>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary mt-3 meccs" data-index="${i}" data-bs-toggle="modal" data-bs-target="#meccsInfo">Meccs megnyitása</button>
                        </div>
                    </div>`)
    }
}

function kiIrModal(index) {
    var idoPont=$(".idoPont").html("")
    idoPont.html(meccsek[index].getIdopont())

    var pontA = $(".pontA").html("")
    var pontB = $(".pontB").html("")

    pontA.html(meccsek[index].getPontA())
    pontB.html(meccsek[index].getPontB())

    var jatekosA = $(".jatekosA").html("")
    var kimenetA = ""
    var jatekosokA = meccsek[index].getCsapatA().split(", ")
    for (let j = 0; j < jatekosokA.length; j++) {
        kimenetA += `<li>${jatekosokA[j]}</li>`
    }
    jatekosA.html(kimenetA)

    var jatekosB = $(".jatekosB").html("")
    var jatekosokB = meccsek[index].getCsapatB().split(", ")
    var kimenetB = ""
    for (let j = 0; j < jatekosokB.length; j++) {
        kimenetB += `<li>${jatekosokB[j]}</li>`
    }
    jatekosB.html(kimenetB)

}

$(document).ready(function () {
    kiIr()
   $(".meccs").on("click",   function() {
        var index = $(this).attr("data-index")
        kiIrModal(index)
    })
})
