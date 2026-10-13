// Jatekos osztály tesztjei – feltételezi, hogy a Jatekos.js már be van töltve

var MA = "2026-10-13"

function joAdat() {
    return {
        nick: "s1mple",
        szerep: "AWPer",
        status: "Active",
        kill: 300,
        death: 200,
        won: 15,
        lost: 5,
        hs: 45,
        rating: 1.2,
        fizetes: 10000,
        lejar: "2027-06-30",
        trend: [1.1, 1.2, 1.3]
    }
}

console.assert(szamE(5) === true, "Az 5 számnak kell lennie")
console.assert(szamE(NaN) === false, "A NaN nem lehet szám")
console.assert(szamE(Infinity) === false, "A végtelen nem lehet szám")
console.assert(szamE("5") === false, "A szövegként megadott 5 nem lehet szám")
console.assert(datumE("2026-10-13") === true, "A 2026-10-13 érvényes dátum")
console.assert(datumE("2026-02-30") === false, "A február 30. nem érvényes dátum")
console.assert(datumE("2026/10/13") === false, "Rossz formátumú dátum nem fogadható el")
console.assert(datumE(20261013) === false, "Szám nem lehet dátum")

console.assert(Jatekos.validal(joAdat(), MA).length === 0, "Érvényes adatnál nem lehet hiba")

var a = joAdat(); a.nick = "x"
console.assert(Jatekos.validal(a, MA).length === 1, "Túl rövid becenévnél egy hibának kell lennie")
a = joAdat(); a.nick = "abcdefghijklmnopq"
console.assert(Jatekos.validal(a, MA).length === 1, "Túl hosszú becenévnél egy hibának kell lennie")
a = joAdat(); a.szerep = "Support"
console.assert(Jatekos.validal(a, MA).length === 1, "Ismeretlen szerepnél hibának kell lennie")
a = joAdat(); a.status = "Retired"
console.assert(Jatekos.validal(a, MA).length === 1, "Ismeretlen státusznál hibának kell lennie")
a = joAdat(); a.kill = -1
console.assert(Jatekos.validal(a, MA).length === 1, "Negatív killnél hibának kell lennie")
a = joAdat(); a.won = 2.5
console.assert(Jatekos.validal(a, MA).length === 1, "Nem egész győzelemszámnál hibának kell lennie")
a = joAdat(); a.hs = 101
console.assert(Jatekos.validal(a, MA).length === 1, "100 feletti HS%-nál hibának kell lennie")
a = joAdat(); a.rating = 0.2
console.assert(Jatekos.validal(a, MA).length === 1, "0.3 alatti ratingnél hibának kell lennie")
a = joAdat(); a.fizetes = 400
console.assert(Jatekos.validal(a, MA).length === 1, "500 alatti fizetésnél hibának kell lennie")
a = joAdat(); a.fizetes = 30001
console.assert(Jatekos.validal(a, MA).length === 1, "30000 feletti fizetésnél hibának kell lennie")
a = joAdat(); a.lejar = MA
console.assert(Jatekos.validal(a, MA).length === 1, "A mai lejárati dátum nem fogadható el")
a = joAdat(); a.lejar = "nem dátum"
console.assert(Jatekos.validal(a, MA).length === 1, "Érvénytelen lejárati dátumnál hibának kell lennie")
console.assert(Jatekos.validal({}, MA).length === 11, "Üres objektumnál 11 hibának kell lennie")

var j = new Jatekos(joAdat())
console.assert(j.getNick() === "s1mple", "A becenévnek s1mple-nek kell lennie")
console.assert(j.getSzerep() === "AWPer", "A szerepnek AWPer-nek kell lennie")
console.assert(j.getStatus() === "Active", "A státusznak Active-nak kell lennie")
console.assert(j.getFizetes() === 10000, "A fizetésnek 10000-nek kell lennie")
console.assert(j.getLejar() === "2027-06-30", "A lejárati dátum nem egyezik")

console.assert(j.getMeccsek() === 20, "A meccsek számának 20-nak kell lennie")
console.assert(j.getKD() === 1.5, "A K/D-nek 1.5-nek kell lennie")
console.assert(j.getWinrate() === 75, "A győzelmi aránynak 75%-nak kell lennie")
console.assert(j.getBetu() === "A", "1.2-es ratingnél a betűjegynek A-nak kell lennie")
console.assert(j.toString() === "{s1mple, AWPer, Active}", "A toString kimenete nem megfelelő")

var b = new Jatekos(joAdat())
b.setRating(1.25); console.assert(b.getBetu() === "A+", "1.25-nél A+ jár")
b.setRating(1.05); console.assert(b.getBetu() === "B+", "1.05-nél B+ jár")
b.setRating(0.95); console.assert(b.getBetu() === "B", "0.95-nél B jár")
b.setRating(0.94); console.assert(b.getBetu() === "C", "0.94-nél C jár")

var n = new Jatekos({ nick: "Nulla", kill: 7, death: 0, won: 0, lost: 0 })
console.assert(n.getKD() === 7, "0 halálnál a K/D a killek száma")
console.assert(n.getWinrate() === 0, "Meccs nélkül a győzelmi arány 0")

var h = new Jatekos({})
console.assert(h.getNick() === "Unknown", "Hiányzó becenévnél Unknown az alapérték")
console.assert(h.getStatus() === "Benched", "Hiányzó státusznál Benched az alapérték")
console.assert(Jatekos.SZEREPEK.includes(h.getSzerep()), "Az alapértelmezett szerepnek érvényes szerepnek kell lennie")
console.assert(h.getRating() === 1, "Hiányzó ratingnél 1 az alapérték")
console.assert(h.getLejar() === "", "Hiányzó lejáratnál üres szöveg az alapérték")
console.assert(h.getTrend().length === 0, "Hiányzó trendnél üres tömb az alapérték")

var hosszu = new Jatekos({ nick: "  nagyonhosszubecenev123  " })
console.assert(hosszu.getNick().length === 16, "A becenevet 16 karakterre kell vágni")

var t = j.getTrend()
t.push(99)
console.assert(j.getTrend().length === 3, "A getTrend másolatot kell adjon, nem az eredeti tömböt")
j.setTrend([1])
console.assert(j.getTrend().length === 0, "Egyelemű trend nem fogadható el")

console.log("Jatekos tesztek lefutottak")
