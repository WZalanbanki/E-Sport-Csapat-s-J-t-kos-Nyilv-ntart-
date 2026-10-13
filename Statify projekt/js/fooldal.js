
var chang=$(".chang")
var valtozoSzovegek=[
    {cim:"Donk",szoveg:"One of the brightest young talents in Counter-Strike 2. Donk's aggressive, lightning-fast entry fragging has made him a nightmare for every defence and a favourite of fans all around the world.", kep:"https://www.pwc.com/hu/hu/szolgaltatasok/sport/esport/esport_banner.jpg"},
    {cim:"Vitality",szoveg:"The French organisation has become one of the most successful teams of the Counter-Strike 2 era. Follow their results, line-ups and upcoming matches on Statify.", kep:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg8HXM9_1BhN21C-f7HNsN3zlEkhcJqv7oW8cF2OPRBLxUM3xWePJrAs4m&s=10"},
    {cim:"S1mple",szoveg:"The Ukrainian AWPer is widely regarded as one of the greatest Counter-Strike players of all time. His highlight reels are still the benchmark that every new star is measured against.", kep:"https://esport1.hu/images/fb_share/64e73df70fedf_64e73df70fe96-harcba-indulnak-kihirdettek-a-magyar-e-sport-valogatott-vilagbajnoki-jatekoskeretet.jpg"},
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
