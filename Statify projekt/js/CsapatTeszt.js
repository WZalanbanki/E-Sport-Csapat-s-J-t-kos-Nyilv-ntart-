
function ujJatekos(nick, status, fizetes) {
    return new Jatekos({
        nick: nick,
        szerep: "Rifler",
        status: status || "Active",
        kill: 100, death: 100, won: 5, lost: 5,
        hs: 40, rating: 1.0,
        fizetes: fizetes || 1000,
        lejar: "2027-12-31"
    })
}

var cs = new Csapat("  Vitality  ", 20000, 30, 10, 3)
console.assert(cs.getNev() === "Vitality", "A csapatnevet le kell vágni a szóközöktől")
console.assert(cs.getKoltsegvetes() === 20000, "A költségvetésnek 20000-nek kell lennie")
console.assert(cs.getWins() === 30, "A győzelmek számának 30-nak kell lennie")
console.assert(cs.getLosses() === 10, "A vereségek számának 10-nek kell lennie")
console.assert(cs.getRang() === 3, "A rangnak 3-nak kell lennie")
console.assert(cs.getWinrate() === 75, "A győzelmi aránynak 75-nek kell lennie")
console.assert(cs.getJatekosok().length === 0, "Új csapatnak nem lehet játékosa")

var h = new Csapat("x", -5, 1.5, -1, 0)
console.assert(h.getNev() === "Unnamed Squad", "Túl rövid névnél Unnamed Squad az alapérték")
console.assert(h.getKoltsegvetes() === 0, "Negatív költségvetésnél 0 az alapérték")
console.assert(h.getWins() === 0, "Nem egész győzelemszámnál 0 az alapérték")
console.assert(h.getRang() === 0, "0-s rangnál 0 az alapérték")
console.assert(h.getWinrate() === 0, "Meccs nélkül a győzelmi arány 0")
console.assert(new Csapat("Teszt", 1, 1, 2, 1).getWinrate() === 33.3, "A győzelmi arányt egy tizedesre kell kerekíteni")

console.assert(cs.hozzaad("nem játékos").ok === false, "Csak Jatekos példány adható hozzá")
console.assert(cs.hozzaad(ujJatekos("ZywOo", "Active", 5000)).ok === true, "Az első játékost hozzá kell tudni adni")
console.assert(cs.hozzaad(ujJatekos("zywoo")).ok === false, "Ugyanaz a becenév kétszer nem szerepelhet (kis-nagybetűtől függetlenül)")
console.assert(cs.getOsszFizetes() === 5000, "Az összfizetésnek 5000-nek kell lennie")
console.assert(cs.getMaradekKeret() === 15000, "A maradék keretnek 15000-nek kell lennie")
console.assert(cs.hozzaad(ujJatekos("Draga", "Active", 16000)).ok === false, "Keret feletti fizetésnél a hozzáadás nem sikerülhet")

for (var i = 1; i <= 4; i++) {
    console.assert(cs.hozzaad(ujJatekos("Aktiv" + i)).ok === true, "Az aktív játékos hozzáadásának sikerülnie kell: " + i)
}
console.assert(cs.getAktiv().length === 5, "Öt aktív játékosnak kell lennie")
console.assert(cs.hozzaad(ujJatekos("Hatodik", "Active")).ok === false, "Hatodik aktív játékos nem adható hozzá")
console.assert(cs.hozzaad(ujJatekos("Padon1", "Benched")).ok === true, "Padon ülő játékost hozzá kell tudni adni")
console.assert(cs.hozzaad(ujJatekos("Serult1", "Injured")).ok === true, "Sérült játékost hozzá kell tudni adni")
console.assert(cs.hozzaad(ujJatekos("Padon2", "Benched")).ok === true, "A nyolcadik játékost hozzá kell tudni adni")
console.assert(cs.getJatekosok().length === 8, "A keretnek 8 fősnek kell lennie")
console.assert(cs.hozzaad(ujJatekos("Kilencedik", "Benched")).ok === false, "Tele keretbe nem lehet több játékost felvenni")

console.assert(cs.getPadon().length === 2, "Két padon ülő játékosnak kell lennie")
console.assert(cs.getSerult().length === 1, "Egy sérült játékosnak kell lennie")

cs.getJatekosok().pop()
console.assert(cs.getJatekosok().length === 8, "A getJatekosok másolatot kell adjon")

console.assert(cs.statuszValt(5).ok === false, "Öt aktív mellett nem lehet padról aktiválni")
console.assert(cs.statuszValt(6).ok === false, "Sérült játékost nem lehet aktiválni")
console.assert(cs.statuszValt(0).ok === true, "Aktív játékost padra lehet ültetni")
console.assert(cs.getJatekosok()[0].getStatus() === "Benched", "Az első játékosnak padon kell lennie")
console.assert(cs.statuszValt(5).ok === true, "Négy aktív mellett padról aktiválni lehet")
console.assert(cs.getAktiv().length === 5, "Újra öt aktív játékosnak kell lennie")
console.assert(cs.statuszValt(99).ok === false, "Nem létező indexnél hibát kell adni")

console.assert(cs.lecserel(99, ujJatekos("Valaki")).ok === false, "Nem létező indexnél a csere nem sikerülhet")
console.assert(cs.lecserel(1, ujJatekos("Aktiv3")).ok === false, "Másik játékos becenevére nem lehet cserélni")
console.assert(cs.lecserel(1, ujJatekos("Aktiv1", "Active", 2000)).ok === true, "Saját becenévvel és nagyobb fizetéssel a cserének sikerülnie kell")
console.assert(cs.getOsszFizetes() === 13000, "A csere után az összfizetésnek 13000-nek kell lennie")
console.assert(cs.lecserel(1, ujJatekos("Aktiv1", "Active", 10000)).ok === false, "Keretet túllépő fizetésemelésnél a csere nem sikerülhet")
console.assert(cs.lecserel(0, ujJatekos("ZywOo", "Active")).ok === false, "Öt aktív mellett padon ülőt nem lehet aktívra cserélni")

console.assert(cs.eltavolit(99) === false, "Nem létező indexnél az eltávolítás nem sikerülhet")
console.assert(cs.eltavolit(0) === true, "Létező játékost el kell tudni távolítani")
console.assert(cs.getJatekosok().length === 7, "Eltávolítás után 7 játékosnak kell maradnia")
console.assert(cs.getJatekosok()[0].getNick() === "Aktiv1", "Az eltávolítás után a következő játékosnak kell elöl lennie")

console.log("Csapat tesztek lefutottak")
