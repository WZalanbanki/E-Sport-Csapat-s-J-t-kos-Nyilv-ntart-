var adat = {
    keresztnev: "Zsolt",
    vezeteknev: "Verbánszky",
    username: "Zso",
    email: "verbanszky.zsolt.2023i@bankitatabanya.hu",
    jelszo: "AikgkiuibC",
    jelszo2: "AikgkiuibC",
    hirlevel: true
}

var felhasznalo1 = new Felhasznalo(adat)

console.assert(felhasznalo1.toString() === "{Zso, Verbánszky Zsolt}", "Hiba: a toString() metódusban mert az össze fűzés nem jó.")

console.assert(felhasznalo1.jelszoEgyezik("AikgkiuibC") === true, "Hiba: a jelszoEgyezik() metódusban, mert nem fogadja el ugyanazt a jelszót.")
console.assert(felhasznalo1.jelszoEgyezik("AikgkiUIbc") === false, "Hiba: a jelszoEgyezik() metódusban, mert kis nagy betű nem számít.")
console.assert(felhasznalo1.jelszoEgyezik("hahó") === false, "Hiba: a jelszoEgyezik() metódusban, mert kis nagy betű nem számít.")
console.assert(felhasznalo1.getHirlevel() === true, "Hiba: a getHirlevel() metódusban mert ha felvagy iratkozva akkor sem azt jelzi hogy felvagy iratkozva.")
console.assert(felhasznalo1.getEmail() === "verbanszky.zsolt.2023i@bankitatabanya.hu", "Hiba: a getEmail() metódusban mert az email cím nem eggyezik.")
console.assert(felhasznalo1.getVezeteknev() === "Verbánszky", "Hiba: a getVezeteknev() metódusban mert nem eggyezik a vezeték név.")
console.assert(felhasznalo1.getKeresztnev() === "Zsolt", "Hiba: a getKeresztnev() metódusban mert nem eggyezik a kereszt név.")
console.assert(felhasznalo1.getUsername() === "Zso", "Hiba: a getUsername() metódusban. ")
console.assert(felhasznalo1.getInicialek()==="VZ", "Hiba: a getInicialek() metódusban, mert nem jó a monogramm.")


var rossz = new Felhasznalo() // ez jóó

console.assert(rossz.toString() === "{guest, Unknown Unknown}", "Hiba: a toString() metódusban mert az össze fűzés nem jó.")
console.assert(rossz.jelszoEgyezik("") === false, "Hiba: a jelszoegyezik() metódusban, mert  el fogadja ugyanazt a jelszót.")
console.assert(rossz.getHirlevel() === false, "Hiba: a getHirlevel() metódusban mert ha felvagy iratkozva akkor sem azt jelzi hogy felvagy iratkozva.")
console.assert(rossz.getEmail() === "", "Hiba: a getEmail() metódusban mert az email cím nem eggyezik.")
console.assert(rossz.getVezeteknev() === "Unknown", "Hiba: a getVezeteknev() metódusban mert nem eggyezik a vezeték név.")
console.assert(rossz.getKeresztnev() === "Unknown", "Hiba: a getKeresztnev() metódusban mert nem eggyezik a vezeték név.")
console.assert(rossz.getUsername() === "guest", "Hiba: a getUsername() metódusban. ")
console.assert(rossz.getInicialek()==="UU", "Hiba: a getInicialek() metódusban, mert nem jó a monogramm.")

felhasznalo1.setVezeteknev("   Kis  ")
console.assert(felhasznalo1.getVezeteknev() === "Kis", "Hiba: a setVezeteknev() metódusban mert a trim nemműködik.")
felhasznalo1.setVezeteknev("K")
console.assert(felhasznalo1.getVezeteknev() === "Unknown", "Hiba: a setVezeteknev() metódusban mert túl rövid a név.")
felhasznalo1.setVezeteknev(142)
console.assert(felhasznalo1.getVezeteknev() === "Unknown", "Hiba: a setVezeteknev() metódusban mert a név nem String.")

felhasznalo1.setKeresztnev("   Anna  ")
console.assert(felhasznalo1.getKeresztnev() === "Anna", "Hiba: a setKeresztnev() metódusban mert a trim nemműködik.")
felhasznalo1.setKeresztnev("A")
console.assert(felhasznalo1.getKeresztnev() === "Unknown", "Hiba: a setKeresztnev() metódusban mert túl rövid a név.")
felhasznalo1.setKeresztnev(142)
console.assert(felhasznalo1.getKeresztnev() === "Unknown", "Hiba: a setKeresztnev() metódusban mert a név nem String.")

felhasznalo1.setUsername(" user_1 ");
console.assert(felhasznalo1.getUsername() === "user_1", "Hiba: a setUsername() metódusban");
felhasznalo1.setUsername("ab");
console.assert(felhasznalo1.getUsername() === "guest", "Hiba: a setUsername() metódusban");
felhasznalo1.setUsername("a".repeat(17));
console.assert(felhasznalo1.getUsername() === "guest", "Hiba: a setUsername() metódusban");
felhasznalo1.setUsername("rossz név!");
console.assert(felhasznalo1.getUsername() === "guest", "Hiba: a setUsername() metódusban");
felhasznalo1.setUsername("abc");
console.assert(felhasznalo1.getUsername() === "abc", "Hiba: a setUsername() metódusban");
felhasznalo1.setUsername("abcdefghijaertz");
console.assert(felhasznalo1.getUsername() === "abcdefghijaertz", "Hiba: a setUsername() metódusban");

felhasznalo1.setEmail("  a@b.hu ");
console.assert(felhasznalo1.getEmail() === "a@b.hu", "Hiba: a setEmail() metódusban.");
felhasznalo1.setEmail(" ");
console.assert(felhasznalo1.getEmail() === "", "Hiba: a setEmail() metódusban.");

felhasznalo1.setHirlevel(true);
console.assert(felhasznalo1.getHirlevel() === true, "Hiba: a setHirlevel() metóduaban.");
felhasznalo1.setHirlevel(false);
console.assert(felhasznalo1.getHirlevel() === false, "Hiba: a setHirlevel() metóduaban.");

