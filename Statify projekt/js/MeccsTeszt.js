function idoEltolas(percek) {
    return new Date(Date.now() + percek * 60 * 1000);
}

var meccs = new Meccs("Alpha", "Bravo", idoEltolas(60));
 
console.assert(meccs.getAcsapatNev() === "Alpha", "Hiba: a konstruktorban nem megfelelően lett beállítva az A csapat neve");
 
console.assert(meccs.getBcsapatNev() === "Bravo", "Hiba: a konstruktorban nem megfelelően lett beállítva a B csapat neve");
 
console.assert(meccs.getCsapatA() === "A csapat üres", "Hiba: a konstruktorban az A csapatnak üresnek kell lennie");
 
console.assert(meccs.getCsapatB() === "A csapat üres", "Hiba: a konstruktorban a B csapatnak üresnek kell lennie");
 
console.assert(meccs.getPontA() === 0, "Hiba: a konstruktorban az A csapat pontszámának 0-nak kell lennie");
 
console.assert(meccs.getPontB() === 0, "Hiba: a konstruktorban a B csapat pontszámának 0-nak kell lennie");
 
console.assert(meccs.getIdopont() === "Közelgő esemény", "Hiba: a konstruktorban a jövőbeli időpontnak közelgő eseménynek kell lennie");

meccs.setAcsapatNev("Charlie");
console.assert(meccs.getAcsapatNev() === "Charlie", "Hiba: a setAcsapatNev() metódusban");
 
meccs.setBcsapatNev("Delta");
console.assert(meccs.getBcsapatNev() === "Delta", "Hiba: a setBcsapatNev() metódusban");

meccs.csapatAhozzaad(["Pisti"]);
console.assert(meccs.getCsapatA() === "Pisti", "Hiba: egy játékos esetén nem szabad vessző a névlistába");
 
meccs.csapatAhozzaad(["Gabi", "Laci"]);
console.assert(meccs.getCsapatA() === "Pisti, Gabi, Laci", "Hiba: a játékosokat vesszővel és szóközzel kell elválasztani");
 
console.assert(meccs.getCsapatB() === "A csapat üres", "Hiba: az A csapathoz adott játékos nem kerülhet a B csapatba");
 
meccs.csapatBhozzaad(["Anna", "Bea"]);
console.assert(meccs.getCsapatB() === "Anna, Bea", "Hiba: a csapatBhozzaad() metódusban");
 
console.assert(meccs.getCsapatA() === "Pisti, Gabi, Laci", "Hiba: a B csapathoz adott játékos nem kerülhet az A csapatba");
 
var meccs2 = new Meccs("Echo", "Foxtrot", idoEltolas(60));
 
meccs2.csapatAhozzaad([]);
console.assert(meccs2.getCsapatA() === "A csapat üres", "Hiba: üres tömb hozzáadása után a csapatnak üresnek kell maradnia");
 
meccs2.csapatAhozzaad(["J1", "J2", "J3", "J4", "J5"]);
console.assert(meccs2.getCsapatA().split(", ").length === 5, "Hiba: pontosan 5 játékost fel kell venni az A csapatba");
 
var meccs3 = new Meccs("Golf", "Hotel", idoEltolas(60));
 
meccs3.csapatAhozzaad(["J1", "J2", "J3", "J4", "J5", "J6", "J7"]);
console.assert(meccs3.getCsapatA().split(", ").length === 5, "Hiba: az A csapatba legfeljebb 5 játékos kerülhet");
console.assert(!meccs3.getCsapatA().includes("J6"), "Hiba: az 5. utáni játékost nem szabad felvenni az A csapatba");
 
meccs3.csapatBhozzaad(["K1", "K2", "K3", "K4", "K5", "K6", "K7"]);
console.assert(meccs3.getCsapatB().split(", ").length === 5, "Hiba: a B csapatba legfeljebb 5 játékos kerülhet");
console.assert(!meccs3.getCsapatB().includes("K6"), "Hiba: az 5. utáni játékost nem szabad felvenni a B csapatba");

var meccs4 = new Meccs("India", "Juliett", idoEltolas(60));
 
meccs4.setPontA();
console.assert(meccs4.getPontA() === 1, "Hiba: a setPontA() metódusban");
 
meccs4.setPontA();
meccs4.setPontA();
console.assert(meccs4.getPontA() === 3, "Hiba: a setPontA() többszöri hívás után nem megfelelő");
 
console.assert(meccs4.getPontB() === 0, "Hiba: az A csapat pontja nem változtathatja a B csapat pontját");
 
meccs4.setPontB();
meccs4.setPontB();
console.assert(meccs4.getPontB() === 2, "Hiba: a setPontB() metódusban");
 
console.assert(meccs4.getPontA() === 3, "Hiba: a B csapat pontja nem változtathatja az A csapat pontját");

var meccs5 = new Meccs("Kilo", "Lima", idoEltolas(-10));
console.assert(meccs5.getIdopont() === "Folyamatben lévő esemény", "Hiba: a 10 perccel ezelőtt kezdődött meccsnek folyamatban lévőnek kell lennie");
 
meccs5.setIdopont(idoEltolas(-120));
console.assert(meccs5.getIdopont() === "Már megtörtént esemény", "Hiba: a 2 órával ezelőtti meccsnek már megtörténtnek kell lennie");
 
meccs5.setIdopont(idoEltolas(120));
console.assert(meccs5.getIdopont() === "Közelgő esemény", "Hiba: a setIdopont() metódusban jövőbeli időpont esetén");
 
meccs5.setIdopont("2020-01-01T10:00:00");
console.assert(meccs5.getIdopont() === "Már megtörtént esemény", "Hiba: a setIdopont() metódusban szöveges múltbeli dátum esetén");
 
meccs5.setIdopont("nem dátum");
console.assert(meccs5.getIdopont() === "Hibás adat", "Hiba: a setIdopont() metódusban érvénytelen dátum esetén");
 
meccs5.setIdopont("");
console.assert(meccs5.getIdopont() === "Hibás adat", "Hiba: a setIdopont() metódusban üres szöveg esetén");
 
meccs5.setIdopont(undefined);
console.assert(meccs5.getIdopont() === "Hibás adat", "Hiba: a setIdopont() metódusban undefined esetén");
 
var meccs6 = new Meccs("Mike", "November", "valami hibás");
console.assert(meccs6.getIdopont() === "Hibás adat", "Hiba: a konstruktorban érvénytelen időpont esetén");

var meccs7 = new Meccs("Oscar", "Papa", idoEltolas(60));
 
meccs7.csapatAhozzaad(["J1", "J2", "J3"]);
meccs7.csapatAhozzaad(["J4", "J5", "J6"]);
console.assert(meccs7.getCsapatA().split(", ").length === 5, "Hiba: több hívás után is legfeljebb 5 játékos lehet az A csapatban");
 
meccs7.csapatBhozzaad(["K1", "K2", "K3"]);
meccs7.csapatBhozzaad(["K4", "K5", "K6"]);
console.assert(meccs7.getCsapatB().split(", ").length === 5, "Hiba: több hívás után is legfeljebb 5 játékos lehet a B csapatban");