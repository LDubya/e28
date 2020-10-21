const FightComponent = Vue.component('FightComponent', {
    name: 'FightComponent',
    template: '#fight-component',
    props: ['title', 'mycharacter', 'gamestate'],
    data: function() {
        return {
            fightStarted : false,
            bidenPoints : 50,
            trumpPoints : 50,
            opponentPushInterval : function(){},
            campaignStrategies : ['Kiss a baby!','Take the high road!','Mudsling!','Shake hands!','Make fun of their hands!',"Make promises you can't keep!",'Blame a predecessor!','Focus on swing states!',"Blame a scapegoat!","Cambridge Analytica!"],
            currentStrategy : "Campaign!",
            thisOutcome : false, // win, lose
            winner : "",
            restartText: "4 more years!",
            restartVisible : false,
            lose : false,
            win: false
        }
    },
    watch : {
        thisOutcome(){
            this.$emit('addoutcome', this.thisOutcome);
        }
    },
    methods: {
        attack : function() {
            if(!this.fightStarted){
                this.fightStarted = true;

                this.opponentPushInterval = setInterval(()=>{ 
                    this.opponentPush(this.mycharacter); 
                }, 200); // if you *really* want a challenge and/or to destroy your mouse, set this to 100 😈
            }

            // although I know it is considered bad practice to manipulate the DOM, 
            // I want to manipulate a class on the <body>
            // and I can't mount a Vue instance to the <body>
            let arena = document.querySelector('body');
            arena.classList.remove("hit");
            setTimeout(function() {
                arena.classList.add("hit");
            }, 1);

            this.currentStrategy = this.campaignStrategies[Math.floor(Math.random() * this.campaignStrategies.length)];

            this.doPush(this.mycharacter);
        },
        doPush : function(character) {
            switch(character){
                case "biden":
                    this.bidenPoints += 5;
                    this.trumpPoints -= 5;
                    break;
                case "trump":
                    this.trumpPoints += 5;
                    this.bidenPoints -= 5;
                    break;
                default:
                    return false;
            }

            if(this.bidenPoints < 1 || this.trumpPoints < 1){ // end game

                this.$emit('setgamestate', "ended");
                this.restartVisible = false;

                let winner;
                if(this.trumpPoints > 1){
                    winner = "trump"
                }
                else{
                    winner = "biden"
                }
                if(this.$props.mycharacter == winner){
                    this.thisOutcome = "win"
                    this.win = true;
                }
                else{
                    this.thisOutcome = "lose"
                    this.lose = true;
                    if(winner == "trump"){
                        this.restartText = "Blame massive voter suppression";
                    }
                    if(winner == "biden"){
                        this.restartText = "Blame massive voter fraud";
                    }
                }

                this.winner = winner;

                setTimeout(() =>{ 
                    this.restartVisible = true;
                }, 1000);
            }
        },
        opponentPush : function(myCharacter){
            if(!this.fightStarted || !!this.thisOutcome){
                return false;
            }
            switch(myCharacter){
                case "biden":
                    this.doPush("trump");
                    break;
                case "trump":
                    this.doPush("biden");
                    break;
                default:
                    return false;
            }
            return true;
        },
        emitNewGame : function(){
            this.$emit('newgame');
        },
    }
  });
const ScoreboardComponent = Vue.component('ScoreboardComponent', {
    name: 'ScoreboardComponent',
    template: '#scoreboard-component',
    props: ['outcome'],    
});

// The Vue instance
let app = new Vue({
    // Options
    el: '#app',
    data: {
        gameOutcomes:[],
        mycharacter : "",
        gamestate : "chooseCharacter", // chooseCharacter, fighting, ended
    },
    components: {
        FightComponent: FightComponent,
        ScoreboardComponent: ScoreboardComponent,
    }, 
    methods: {
        goToFight : function(character) {
            this.mycharacter = character;
            this.gamestate = 'fighting';
        },
        updateScoreBoard : function(outcome){
            this.gameOutcomes.push(outcome);
        },
        setgamestate : function(state) {
            console.log("setgamestate called");
            this.gamestate = state
        },
        newgame : function(){
            this.gamestate = "chooseCharacter"
        }
    }
})
