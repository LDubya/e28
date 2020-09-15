
let myCharacter = "";
let fightStarted = false;
let bidenPoints = 50;
let trumpPoints = 50;
let updateScoreBoardInterval = function(){};
let opponentPushInterval = function(){};

function push(character){
    switch(character){
        case "biden":
            bidenPoints += 5;
            trumpPoints -= 5;
            break;
        case "trump":
            trumpPoints += 5;
            bidenPoints -= 5;
            break;
        default:
            return false;
    }
    return true;
}

function opponentPush(){
    if(!fightStarted){
        return false;
    }
    switch(myCharacter){
        case "biden":
            push("trump");
            break;
        case "trump":
            push("biden");
            break;
        default:
            return false;
    }
    return true;
}

function updateScoreBoard(){
    // console.log({
    //     bidenPoints: bidenPoints,
    //     trumpPoints: trumpPoints
    // });

    ///////// https://stackoverflow.com/a/4784796 ////////////
    //                                                      //
    let bidenPointsEl = document.querySelector('#bidenPoints');
    let trumpPointsEl = document.querySelector('#trumpPoints');
    while( bidenPointsEl.firstChild ) {
        bidenPointsEl.removeChild( bidenPointsEl.firstChild );
    }
    while( trumpPointsEl.firstChild ) {
        trumpPointsEl.removeChild( trumpPointsEl.firstChild );
    }
    bidenPointsEl.appendChild( document.createTextNode(bidenPoints) );
    trumpPointsEl.appendChild( document.createTextNode(trumpPoints) );
    //                                                      //
    //////////////////////////////////////////////////////////

    // move the fighters
    let fighterObjects = document.querySelector('.fighterObjects');
    fighterObjects.style["margin-left"] = "" + bidenPoints + "%";

    let arena = document.querySelector('body');
    let hue = trumpPoints > bidenPoints? 0 : 240;
    let saturation = (2 * (Math.max(bidenPoints,trumpPoints) - 50)) + 20;

    arena.style.background = "hsl(" + hue + "," + saturation + "%," + (190 - saturation) + "%)";

    if(bidenPoints < 1 || trumpPoints < 1){ // end game
        window.clearInterval(updateScoreBoardInterval);
        window.clearInterval(opponentPushInterval);
        document.querySelector('#push').style.visibility = "hidden";

        let winner;
        let restartButton = document.querySelector("#restartButton");
        if(trumpPoints > 1){
            winner = "trump"
        }
        else{
            winner = "biden"
        }
        if(myCharacter == winner){
            toggle('#you_win');
            restartButton.innerHTML = "4 more years!";
        }
        else{
            toggle('#you_lose');
            if(winner == "trump"){
                restartButton.innerHTML = "Blame massive voter suppression";
            }
            if(winner == "biden"){
                restartButton.innerHTML = "Blame massive voter fraud";
            }
        }
        if(winner == "trump"){
            toggle('#polls_were_wrong')
        }
        toggle('#fightText');


        // settimeout show restart button
        setTimeout(function() {
            document.querySelector('#push').style.visibility = "visible";
            toggle('#push');
            toggle('#restartButton');
        }, 1000);
    }
}

function toggle(elem) { // modified from https://stackoverflow.com/a/53738587
    var el = document.querySelector(elem);
    if (window.getComputedStyle(el, null).getPropertyValue("display") == "none") {
        el.style.display = "grid";
    } else {
        el.style.display = "none";
    }
    return true;
}

function goToFight(character){
    myCharacter = character;
    toggle('#chooseCharacter');
    toggle('#fight');
    return true;
}

document.addEventListener(
    'click', function (e) {
        
        // console.log(e.target);
        if (e.target.matches('#push')){
            if(!fightStarted){
                fightStarted = true;
                updateScoreBoardInterval = window.setInterval(function(){ 
                    updateScoreBoard(); 
                }, 100);
                opponentPushInterval = window.setInterval(function(){ 
                    opponentPush(); 
                }, 200); // if you *really* want a challenge and/or to destroy your mouse, set this to 100 😈
            }

            let arena = document.querySelector('body');
            arena.classList.remove("hit");
            setTimeout(function() {
                arena.classList.add("hit");
            }, 1);

            let campaignStrategies = ['Kiss a baby!','Take the high road!','Mudsling!','Shake hands!','Make fun of their hands!',"Make promises you can't keep!",'Blame a predecessor!','Focus on swing states!',"Blame a scapegoat!","Cambridge Analytica!"];
            e.target.innerHTML = campaignStrategies[Math.floor(Math.random() * campaignStrategies.length)]; // https://stackoverflow.com/a/5915122

            return push(myCharacter);
        }
        if (e.target.matches('.biden')){
            console.log("Biden was chosen");
            return goToFight("biden");
        }
        if (e.target.matches('.trump')){
            console.log("Trump was chosen");
            return goToFight("trump");
        }

        if ( e.target.id == 'restartButton'){
            console.log("restart");

            fightStarted = false;
            bidenPoints = 50;
            trumpPoints = 50;
            updateScoreBoardInterval = function(){};
            opponentPushInterval = function(){};
            updateScoreBoard();
            toggle('#push');
            toggle('#restartButton');
            document.querySelector('#push').innerHTML = "Campaign!";

            document.querySelector('#fightText').style.display = "grid";
            document.querySelector('#you_lose').style.display = "none";
            document.querySelector('#you_win').style.display = "none";
            document.querySelector('#polls_were_wrong').style.display = "none";
        }
    }
);