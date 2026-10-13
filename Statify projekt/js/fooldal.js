var chang=$(".chang")
var valtozoSzovegek=[
    {cim:"Donk",szoveg:"One of the brightest young talents in Counter-Strike 2. Donk's aggressive, lightning-fast entry fragging has made him a nightmare for every defence and a favourite of fans all around the world.", kep: "../img/donk.webp"},
    {cim:"Vitality",szoveg:"The French organisation has become one of the most successful teams of the Counter-Strike 2 era. Follow their results, line-ups and upcoming matches on Statify.", kep:"../img/vitality.jpg"},
    {cim:"S1mple",szoveg:"The Ukrainian AWPer is widely regarded as one of the greatest Counter-Strike players of all time. His highlight reels are still the benchmark that every new star is measured against.", kep:"../img/simple.webp"},
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
}, 5000); 
