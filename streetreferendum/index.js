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
            campaignStrategies : ['Kiss a baby!','Take the high road!','Mudsling!','Shake hands!','Make fun of their hands!',"Make promises you can't keep!",'Blame a predecessor!','Focus on swing states!',"Blame a scapegoat!","Cambridge Analytica!","Walk out of your interview early!","Dismis Russian interfence!","Say nobody ever gets hacked!","Talk over the opponent during the debate!","Don't answer the debate questions!","Say you won't concede if you lose!"],
            currentStrategy : "Campaign!",
            thisOutcome : false, // win, lose
            winner : "",
            restartText: "4 more years!",
            restartVisible : false,
            arenas: ["arena.jpg","arena2.jpg","arena3.jpg","arena4.jpg"],
            currentArena: "arena.jpg"
        }
    },
    created: function () {
        this.currentArena = this.arenas[Math.floor(Math.random() * this.arenas.length)];
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

            this.$emit('hit');

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
                    this.$emit('win');
                }
                else{
                    this.thisOutcome = "lose"
                    this.$emit('lose');
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
        emitReset : function(){
            this.$emit('reset');
        }
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
        yourScore : 0,
        computerScore : 0,
        lose : false,
        win: false,
        hit: false
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
            if(outcome == "win"){
                this.yourScore ++;
            }
            else{
                this.computerScore ++;
            }
        },
        setgamestate : function(state) {
            this.gamestate = state
        },
        newgame : function(){
            this.gamestate = "chooseCharacter";
            this.win = false;
            this.lose = false;
        },
        reset : function(){
            this.gamestate = "chooseCharacter";
            this.gameOutcomes = [];
            this.yourScore = 0;
            this.computerScore = 0;
            this.win = false;
            this.lose = false;
        },
        youwin : function(){
            this.win = true;
        },
        youlose: function(){
            this.lose = true;
        },
        pow : function(){
            this.hit = false;
            setTimeout(() =>{ 
                this.hit = true;
            }, 1);
        }
    }
})