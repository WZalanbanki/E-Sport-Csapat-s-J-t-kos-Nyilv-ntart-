var ervenyesAdat = () => ({
    firstName: "Anna",
    lastName: "Kovács",
    username: "kovacs_anna",
    email: "Anna.Kovacs@Example.com",
    password: "Titkos123",
    passwordConfirm: "Titkos123",
    newsletter: 1,
    acceptedPrivacy: true
});
 
var modositott = (valtozas) => ({ ...ervenyesAdat(), ...valtozas });
var hibak = (adat) => Account.validate(adat);
var hibaMezok = (adat) => Object.keys(hibak(adat));
 
var dobHibat = (fn, Tipus) => {
    try {
        fn();
        return false;
    } catch (e) {
        return e instanceof Tipus;
    }
};
 
 
console.assert(hibaMezok(ervenyesAdat()).length === 0, "Érvényes adatokra a validate nem adhat hibát");
 
 
var uresHibak = hibak({});
for (var mezo of ["firstName", "lastName", "username", "email", "password", "passwordConfirm", "acceptedPrivacy"]) {
    console.assert(mezo in uresHibak, `Üres adatnál hiányzik a hiba a(z) ${mezo} mezőre`);
}
console.assert(hibak({ firstName: 42 }).firstName !== undefined, "Nem szöveg típusú keresztnév nem lehet érvényes");
 
 
console.assert("firstName" in hibak(modositott({ firstName: "A" })), "Az 1 betűs keresztnév túl rövid");
console.assert("firstName" in hibak(modositott({ firstName: "A".repeat(31) })), "A 31 betűs keresztnév túl hosszú");
console.assert(!("firstName" in hibak(modositott({ firstName: "A".repeat(30) }))), "A 30 betűs keresztnévnek érvényesnek kell lennie");
console.assert("firstName" in hibak(modositott({ firstName: "Anna1" })), "Számot tartalmazó név nem lehet érvényes");
console.assert("firstName" in hibak(modositott({ firstName: "   " })), "Csak szóközből álló név nem lehet érvényes");
console.assert(!("firstName" in hibak(modositott({ firstName: "Ágnes" }))), "Ékezetes névnek érvényesnek kell lennie");
console.assert(!("firstName" in hibak(modositott({ firstName: "Anna-Mária" }))), "Kötőjeles névnek érvényesnek kell lennie");
console.assert(!("lastName" in hibak(modositott({ lastName: "O'Brien" }))), "Aposztrófos vezetéknévnek érvényesnek kell lennie");
console.assert(!("lastName" in hibak(modositott({ lastName: "Nagy Kovács" }))), "Szóközzel elválasztott vezetéknévnek érvényesnek kell lennie");
console.assert("lastName" in hibak(modositott({ lastName: "Nagy--Kovács" })), "Dupla kötőjeles név nem lehet érvényes");
 
 
console.assert("username" in hibak(modositott({ username: "rovid" })), "A 7 karakternél rövidebb felhasználónév nem lehet érvényes");
console.assert(!("username" in hibak(modositott({ username: "a".repeat(8) }))), "A 8 karakteres felhasználónévnek érvényesnek kell lennie");
console.assert(!("username" in hibak(modositott({ username: "a".repeat(20) }))), "A 20 karakteres felhasználónévnek érvényesnek kell lennie");
console.assert("username" in hibak(modositott({ username: "a".repeat(21) })), "A 21 karakteres felhasználónév túl hosszú");
console.assert("username" in hibak(modositott({ username: "kovacs anna" })), "Szóközt tartalmazó felhasználónév nem lehet érvényes");
console.assert("username" in hibak(modositott({ username: "kovács_anna" })), "Ékezetes felhasználónév nem lehet érvényes");
console.assert(!("username" in hibak(modositott({ username: "kovacs.anna_1" }))), "Pontot, aláhúzást és számot tartalmazó felhasználónévnek érvényesnek kell lennie");
 
 
console.assert("email" in hibak(modositott({ email: "nem-email" })), "@ nélküli e-mail nem lehet érvényes");
console.assert("email" in hibak(modositott({ email: "anna@example" })), "Domain végződés nélküli e-mail nem lehet érvényes");
console.assert("email" in hibak(modositott({ email: "anna@example.c" })), "Egy betűs végződésű e-mail nem lehet érvényes");
console.assert("email" in hibak(modositott({ email: "an na@example.com" })), "Szóközt tartalmazó e-mail nem lehet érvényes");
console.assert(!("email" in hibak(modositott({ email: "anna@pelda.hu" }))), "Az anna@pelda.hu címnek érvényesnek kell lennie");
 
 
var jelszo = (pw) => hibak(modositott({ password: pw, passwordConfirm: pw }));
console.assert("password" in jelszo("Ab1"), "A túl rövid jelszó nem lehet érvényes");
console.assert("password" in jelszo("Aa1" + "a".repeat(62)), "A 65 karakteres jelszó túl hosszú");
console.assert(!("password" in jelszo("Aa1" + "a".repeat(61))), "A 64 karakteres jelszónak érvényesnek kell lennie");
console.assert("password" in jelszo("titkos123"), "Nagybetű nélküli jelszó nem lehet érvényes");
console.assert("password" in jelszo("TITKOS123"), "Kisbetű nélküli jelszó nem lehet érvényes");
console.assert("password" in jelszo("TitkosJelszo"), "Szám nélküli jelszó nem lehet érvényes");
console.assert(!("password" in jelszo("Titkos123")), "A Titkos123 jelszónak érvényesnek kell lennie");
 
 
console.assert("passwordConfirm" in hibak(modositott({ passwordConfirm: "" })), "Hiányzó jelszó-megerősítésnél hibát kell adni");
console.assert("passwordConfirm" in hibak(modositott({ passwordConfirm: "Titkos124" })), "Eltérő jelszavaknál hibát kell adni");
console.assert("acceptedPrivacy" in hibak(modositott({ acceptedPrivacy: false })), "Az adatvédelmi szabályzat elfogadása kötelező");
 
 
console.assert(dobHibat(() => new Account(modositott({ email: "rossz" })), AccountValidationError), "Érvénytelen adatnál a konstruktornak AccountValidationError-t kell dobnia");
 
try {
    new Account(modositott({ username: "", email: "" }));
    console.assert(false, "A konstruktornak hibát kellett volna dobnia");
} catch (e) {
    console.assert(e instanceof Error, "Az AccountValidationError-nak Error-ból kell származnia");
    console.assert(e.name === "AccountValidationError", "A hiba neve legyen AccountValidationError");
    console.assert(e.message === "Invalid account data", "A hibaüzenet nem megfelelő");
    console.assert("username" in e.errors && "email" in e.errors, "A hibaobjektumnak tartalmaznia kell a hibás mezőket");
    console.assert(Object.keys(e.errors).length === 2, "Csak a ténylegesen hibás mezők szerepeljenek a hibák között");
}
 
 
var fiok = new Account(modositott({ firstName: "  Anna ", lastName: " Kovács ", username: " kovacs_anna " }));
 
console.assert(fiok.firstName === "Anna", "A keresztnevet szóközök nélkül kell eltárolni");
console.assert(fiok.lastName === "Kovács", "A vezetéknevet szóközök nélkül kell eltárolni");
console.assert(fiok.username === "kovacs_anna", "A felhasználónevet szóközök nélkül kell eltárolni");
console.assert(fiok.email === "anna.kovacs@example.com", "Az e-mail címet kisbetűsen kell eltárolni");
console.assert(fiok.fullName === "Kovács Anna", "A teljes név formátuma: vezetéknév keresztnév");
console.assert(fiok.newsletter === true, "A hírlevél mezőnek logikai értéknek kell lennie");
console.assert(new Account(modositott({ newsletter: undefined })).newsletter === false, "Hiányzó hírlevél mező esetén false legyen az érték");
console.assert(Object.isFrozen(fiok), "Az Account példánynak befagyasztottnak kell lennie");
 
fiok.username = "masvalaki";
console.assert(fiok.username === "kovacs_anna", "A felhasználónév kívülről nem módosítható");
 
console.assert(fiok.checkPassword("Titkos123"), "Helyes jelszóra a checkPassword igazat ad");
console.assert(!fiok.checkPassword("titkos123"), "Hibás jelszóra a checkPassword hamisat ad");
console.assert(!("password" in fiok), "A jelszó nem lehet nyilvános tulajdonság");
 
var json = fiok.toJSON();
console.assert(!("password" in json), "A toJSON nem tartalmazhatja a jelszót");
console.assert(json.username === "kovacs_anna" && json.email === "anna.kovacs@example.com", "A toJSON adatai nem megfelelőek");
console.assert(!JSON.stringify(fiok).includes("Titkos123"), "A JSON.stringify kimenete nem tartalmazhatja a jelszót");
console.assert(String(fiok) === "Account(kovacs_anna)", "A toString kimenete nem megfelelő");
 
console.assert(fiok.matches("KOVACS_ANNA"), "A matches felhasználónévre kis-nagybetűtől függetlenül egyezzen");
console.assert(fiok.matches(" Anna.Kovacs@example.com "), "A matches e-mail címre kis-nagybetűtől és szóközöktől függetlenül egyezzen");
console.assert(!fiok.matches("valaki_mas"), "Idegen azonosítóra a matches hamisat ad");
 
 
var kezdoSzam = AccountStore.count;
 
console.assert(dobHibat(() => AccountStore.register({ username: "kovacs_anna" }), TypeError), "Nem Account objektum regisztrálásakor TypeError-t kell dobni");
console.assert(AccountStore.register(fiok) === fiok, "A register adja vissza a regisztrált fiókot");
console.assert(AccountStore.count === kezdoSzam + 1, "Regisztráció után eggyel nőjön a fiókok száma");
 
try {
    AccountStore.register(new Account(modositott({ username: "KOVACS_ANNA", email: "mas@pelda.hu" })));
    console.assert(false, "Foglalt felhasználónévvel nem lehet regisztrálni");
} catch (e) {
    console.assert(e instanceof AccountValidationError && "username" in e.errors, "Foglalt felhasználónévnél username hibát kell adni");
    console.assert(!("email" in e.errors), "Szabad e-mail címnél ne legyen email hiba");
}
 
try {
    AccountStore.register(new Account(modositott({ username: "masik_anna", email: "ANNA.KOVACS@example.com" })));
    console.assert(false, "Foglalt e-mail címmel nem lehet regisztrálni");
} catch (e) {
    console.assert(e instanceof AccountValidationError && "email" in e.errors, "Foglalt e-mail címnél email hibát kell adni");
}
 
console.assert(AccountStore.count === kezdoSzam + 1, "Sikertelen regisztráció nem növelheti a fiókok számát");
 
console.assert(AccountStore.login("kovacs_anna", "rossz") === null, "Hibás jelszóval a bejelentkezés sikertelen");
console.assert(AccountStore.currentUser !== fiok, "Sikertelen bejelentkezés után nem lehet bejelentkezett felhasználó");
console.assert(AccountStore.login("nemletezo", "Titkos123") === null, "Nem létező felhasználóval a bejelentkezés sikertelen");
console.assert(AccountStore.login("kovacs_anna", "Titkos123") === fiok, "Felhasználónévvel be kell tudni jelentkezni");
console.assert(AccountStore.currentUser === fiok, "Bejelentkezés után a currentUser a bejelentkezett fiók");
 
AccountStore.logout();
console.assert(AccountStore.currentUser === null, "Kijelentkezés után a currentUser null");
 
console.assert(AccountStore.login("anna.kovacs@example.com", "Titkos123") === fiok, "E-mail címmel is be kell tudni jelentkezni");
AccountStore.logout();
 
console.assert(dobHibat(() => { AccountStore.count = 99; }, TypeError) || AccountStore.count === kezdoSzam + 1, "A count kívülről nem írható felül");
 