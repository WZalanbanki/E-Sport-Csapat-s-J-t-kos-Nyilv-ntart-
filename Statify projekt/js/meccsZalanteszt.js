
var MOST = new Date("2026-10-13T20:00:00")

console.assert(Meccs.validal({ ellenfel: "NaVi", sajat: "FaZe", idopont: "2026-11-01T18:00" }, MOST).length === 0,
    "Érvényes meccsnél nem lehet hiba")
console.assert(Meccs.validal({ ellenfel: "N", sajat: "FaZe", idopont: "2026-11-01T18:00" }, MOST).length === 1,
    "Túl rövid ellenfélnévnél hibának kell lennie")
console.assert(Meccs.validal({ ellenfel: "a".repeat(25), sajat: "FaZe", idopont: "2026-11-01T18:00" }, MOST).length === 1,
    "Túl hosszú ellenfélnévnél hibának kell lennie")
console.assert(Meccs.validal({ ellenfel: "faze", sajat: "FaZe", idopont: "2026-11-01T18:00" }, MOST).length === 1,
    "Egy csapat nem játszhat saját maga ellen (kis-nagybetűtől függetlenül)")
console.assert(Meccs.validal({ ellenfel: "NaVi", sajat: "FaZe", idopont: "2026-10-01T18:00" }, MOST).length === 1,
    "Múltbeli időpontnál hibának kell lennie")
console.assert(Meccs.validal({ ellenfel: "NaVi", sajat: "FaZe", idopont: "" }, MOST).length === 1,
    "Üres időpontnál hibának kell lennie")
console.assert(Meccs.validal({ ellenfel: "NaVi", sajat: "FaZe", idopont: "valami" }, MOST).length === 1,
    "Érvénytelen időpontnál hibának kell lennie")
console.assert(Meccs.validal({}, MOST).length === 2, "Üres objektumnál két hibának kell lennie")



var m = new Meccs("  FaZe ", "NaVi", "2026-11-01T18:30", "Scrim")
console.assert(m.getCsapatA() === "FaZe", "Az A csapat nevét le kell vágni a szóközöktől")
console.assert(m.getCsapatB() === "NaVi", "A B csapat neve nem egyezik")
console.assert(m.getIdopont() === "2026-11-01T18:30", "Az időpont nem egyezik")
console.assert(m.getTipus() === "Scrim", "A típusnak Scrim-nek kell lennie")
console.assert(m.getDatum() === "2026-11-01", "A dátumrésznek 2026-11-01-nek kell lennie")
console.assert(m.getIdoRovid() === "18:30", "A rövid időnek 18:30-nak kell lennie")
console.assert(m.getMillis() === new Date("2026-11-01T18:30").getTime(), "Az ezredmásodperc érték nem egyezik")



var h = new Meccs("", null, "rossz")
console.assert(h.getCsapatA() === "Unknown", "Üres csapatnévnél Unknown az alapérték")
console.assert(h.getCsapatB() === "Unknown", "Hiányzó csapatnévnél Unknown az alapérték")
console.assert(h.getIdopont() === "", "Érvénytelen időpontnál üres szöveg az alapérték")
console.assert(h.getTipus() === "Match", "Alapértelmezett típusnak Match-nek kell lennie")
console.assert(new Meccs("A", "B", "2026-11-01T18:00", "Valami").getTipus() === "Match",
    "Ismeretlen típusnál Match az alapérték")

console.log("Meccs tesztek lefutottak")