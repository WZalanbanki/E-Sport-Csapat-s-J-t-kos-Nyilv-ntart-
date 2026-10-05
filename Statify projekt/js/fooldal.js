
var chang=$(".chang")
var valtozoSzovegek=[
    {cim:"Cím 1",szoveg:"Szoveg 1", kep:"https://www.pwc.com/hu/hu/szolgaltatasok/sport/esport/esport_banner.jpg"},
    {cim:"Cím 2",szoveg:"Szoveg 2", kep:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg8HXM9_1BhN21C-f7HNsN3zlEkhcJqv7oW8cF2OPRBLxUM3xWePJrAs4m&s=10"},
    {cim:"Cím 3",szoveg:"Szoveg 3", kep:"https://esport1.hu/images/fb_share/64e73df70fedf_64e73df70fe96-harcba-indulnak-kihirdettek-a-magyar-e-sport-valogatott-vilagbajnoki-jatekoskeretet.jpg"},
]
var index=0
function csere() {
    $(".changeTitle").html(valtozoSzovegek[index].cim);
    $(".changeSzoveg").html(valtozoSzovegek[index].szoveg);
    $(".changeImg").attr("src", valtozoSzovegek[index].kep);

    index++;

    if (index >= valtozoSzovegek.length) {
        index = 0;
    }
}

setInterval(() => {
    csere()
}, 110000); 