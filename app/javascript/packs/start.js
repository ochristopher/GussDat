/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue/dist/vue.esm'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#starGame',
    data() {
      return {
        answer: [
          { title: 'Jonah' },
        ],
        levelData: [
          {
            CorrectAnswer: "jonah", game_over: false, gameImage: require('../../assets/images/ques/jonah.jpg')
          },
          {
            CorrectAnswer: "moses", game_over: false, gameImage: require('../../assets/images/ques/moses.gif')
          },
          {
            CorrectAnswer: "david", game_over: false, gameImage: require('../../assets/images/ques/david.jpg')
          },
        ],
        start_game: true,
        one : true,
        two : true,
        three : true,
        four : true,
        five : true,
        six : true,
        next : false,
        gameLevel: 0,
        game_over: false,
        progs: 100,
        answer: "",
        CorrectAnswer: "",
        correctInput: false,
        points: 0,
        score: 0,
        gameImage: ""
      }
    },
    methods: {
      progress: function() {
        this.mover = setInterval(() => {
          console.log('here  progressing ' )  ;
          this.progressCount();
        },50);
      },
      progressCount: function() {
        this.$set(this.$data, 'progs' , this.$data.progs - 1);
        if(this.$data.progs == 0) {
          window.clearInterval(this.mover);
        }
      },
      resetProgress: function() {
        clearInterval(this.mover),
        this.$set(this.$data, 'progs' , 100);
        this.deductPoints();
      },
      deductPoints: function() {
        if(this.$data.points > 1 ){this.$set(this.$data, 'points' , this.$data.points - 1);}
      },
      updateBackgroundCounter: function (counter) {
        this.$set(this.$data, counter , false);
      },
      getRandomBlock: function(used) {
        const someArray = ["one", "two", "three", "four", "five", "six"];
        const filteredItems = someArray.filter(item => !used.includes(item))
        return filteredItems.sort(() => Math.random() - 0.5)[0];
      },
      gameOver: function() {
        this.$set(this.$data, 'game_over' , true);
        this.$set(this.$data, 'points' , 0);
        this.$set(this.$data, 'next', false);
        this.$set(this.$data, 'correctInput', false);
        this.$set(this.$data, 'start_game' ,true);
        var used = []
        this.resetCounters();
      },
      checkAnswer: function() {
        if(this.$data.answer.toLowerCase() === this.$data.CorrectAnswer) {
          this.$set(this.$data, 'correctInput' , true);
          // this.gameOver();
          this.clearCounters();
          clearInterval(this.timer);
          window.clearInterval(this.mover);
          this.addUpScore(this.$data.points, this.$data.score);
        }
      },
      addUpScore: function (points, score) {
        score = score + points
        this.$set(this.$data, 'score' , score);
        this.$set(this.$data, 'gameLevel' , this.$data.gameLevel + 1);
        clearInterval(this.timer);
        window.clearInterval(this.mover);
        this.$set(this.$data, 'progs' , 100);
        this.$set(this.$data, 'points' , 6);
        var used = []
        var level = this.$data.gameLevel
        // levelTotal = this.$data.levelData.length - 1
        if(level > this.$data.levelData.length - 1) {
          this.gameOver();
        }else {
          this.$set(this.$data, 'next' , true);
        }
      },
      clearCounters: function() {
        this.$set(this.$data, 'one' , false);
        this.$set(this.$data, 'two' , false);
        this.$set(this.$data, 'three' , false);
        this.$set(this.$data, 'four' , false);
        this.$set(this.$data, 'five' , false);
        this.$set(this.$data, 'six' , false);
      },
      resetCounters: function() {
        this.$set(this.$data, 'one' , true);
        this.$set(this.$data, 'two' , true);
        this.$set(this.$data, 'three' , true);
        this.$set(this.$data, 'four' , true);
        this.$set(this.$data, 'five' , true);
        this.$set(this.$data, 'six' , true);
      },
      startLevel: function(level) {
        this.$set(this.$data, 'gameLevel' , level);
        this.$set(this.$data, 'CorrectAnswer' , this.$data.levelData[level].CorrectAnswer);
        this.$set(this.$data, 'gameImage' , this.$data.levelData[level].gameImage);
        this.runLevel();
        // this.$set(this.$data.levelData[level], 'game_over' , true);
        // for (const item in levelData){
        //   // console.log(this.$data.levelData[item])
        //   _this.$set(_this.$data, 'gameLevel' , item);
        //   _this.$set(_this.$data, 'CorrectAnswer' , this.$data.levelData[item].CorrectAnswer);
        // console.log(this.$data.gameLevel, this.$data.CorrectAnswer, this.$data.levelData[level].game_over)
      },
      shuffleArray: function ( array ) {
          var counter = array.length, temp, index;
          // While there are elements in the array
          while ( counter > 0 ) {
              // Pick a random index
              index = Math.floor( Math.random() * counter );

              // Decrease counter by 1
              counter--;

              // And swap the last element with it
              temp = array[ counter ];
              array[ counter ] = array[ index ];
              array[ index ] = temp;
          }
          return array;
      },
      runLevel: function(used, level) {
        console.log('here   ' +   level);
        used = used
        level = level
        if(this.$data.game_over == true){
          this.gameOver();
        } else {
          this.$set(this.$data, 'gameLevel' , level);
          this.$set(this.$data, 'CorrectAnswer' , this.$data.levelData[level].CorrectAnswer);
          this.$set(this.$data, 'gameImage' , this.$data.levelData[level].gameImage);
          this.resetCounters();
          // this.checkAnswer();
          this.progress();
          this.timer = setInterval(() => {
          if(used.length == 6) {
            // this.gameOver();
            clearInterval(this.timer);
            window.clearInterval(this.mover);
            this.resetProgress();
            var score = 0
            this.$set(this.$data, 'score' , score);
            this.$set(this.$data, 'points' , 6);
            this.$set(this.$data, 'gameLevel' , this.$data.gameLevel + 1);
            this.nextRun();
          } else {
            var randomBlock =  this.getRandomBlock(used);
            used.push(randomBlock)
            this.resetProgress();
            this.progress();
            this.updateBackgroundCounter(randomBlock);
          }
          },5000);
        }
      },
      nextRun: function(event) {
        var used = []
        var level = this.$data.gameLevel
        this.$set(this.$data, 'answer' , "");
        this.$set(this.$data, 'next' , false);
        this.$set(this.$data, 'correctInput' , false);
        this.runLevel(used, level);
      },
      startGame: function() {
        var used = []
        var level = 0
        this.shuffleArray(this.$data.levelData);
        this.$set(this.$data, 'points' , 6);
        this.$set(this.$data, 'start_game' ,false);
        this.runLevel(used, level);
      }
    },
  created: function () {
    // level = 0
    // levelTotal = this.$data.levelData.length - 1
    // if(level == levelTotal) {
    //   this.gameOver();
    // } else {
    //   this.startLevel(level);
    //   gameLevel = this.$data.gameLevel
    //   if (this.$data.levelData[gameLevel].game_over == true) {
    //     level = level + 1
    //     this.startLevel(level);
    //   } else {
    //     this.startLevel(level);
    //   }
    // }

  }
})
});

