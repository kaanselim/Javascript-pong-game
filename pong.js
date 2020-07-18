(function () {
var CSS = {
    arena: {
        width: 900,
        height: 600,
        background: '#62247B',
        position: 'fixed',
        top: '50%',
        left: '50%',
        zIndex: '1003',
        transform: 'translate(-50%, -50%)'
    },
    ball: {
        width: 15,
        height: 15,
        position: 'absolute',
        top: 0,
        left: 350,
        borderRadius: 50,
        background: '#C6A62F'
    },
    line: {
        width: 0,
        height: 600,
        borderLeft: '2px dashed #C6A62F',
        position: 'absolute',
        top: 0,
        left: '50%'
    },
    stick: {
        width: 12,
        height: 85,
        position: 'absolute',
        background: '#C6A62F'
    },
    stick1: {
        left: 0,
        top: 250
    },
    stick2: {
        left: 888,
        top: 250
    },
    score: {
        width: 100,
        height: 50,
        color: '#000000',
        position: 'absolute',
        fontSize: 40
    },
    score1: {
        left: 175,
        top: 0
    },
    score2: {
        left: 650,
        top: 0
    },
    menu: {
        width: 500,
        height: 500,
        background: '#009999',
        position: 'fixed',
        top: '50%',
        left: '50%',
        zIndex: '1003',
        transform: 'translate(-50%, -50%)'
    },
    button: {
        width: 250,
        height: 100,
        marginLeft: 125,
        marginTop: 10,
        background: '#f2f2f2'
    }
};

var CONSTS = {
    gameSpeed: 20,
    score1: 0,
    score2: 0,
    stick1Speed: 0,
    stick2Speed: 0,
    ballTopSpeed: 0,
    ballLeftSpeed: 0,
    load: false,
    gameMode:''
};



function start() {
    var cpuPlayerTurn;
    if (CONSTS.load == true){
        document.getElementById("pong-menu").remove();
        draw();
        setEvents();
        roll();
        loop(); 
    }
    
}

function draw() {
    $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
    $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
    $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');

    $('<div/>', {id: 'stick-1'}).css($.extend(CSS.stick1, CSS.stick))
    .appendTo('#pong-game');

    $('<div/>', {id: 'stick-2'}).css($.extend(CSS.stick2, CSS.stick))
    .appendTo('#pong-game');

    $('<div/>', {id: 'scrore-1'}).css($.extend(CSS.score1, CSS.score))
    .append(CONSTS.score1).appendTo('#pong-game');

    $('<div/>', {id: 'scrore-2'}).css($.extend(CSS.score2, CSS.score))
    .append(CONSTS.score2).appendTo('#pong-game');
}

function setEvents() {
    $(document).on('keydown', function (e) {
        if (e.keyCode == 87) {
            CONSTS.stick1Speed = -10;
        }
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode == 87) {
            CONSTS.stick1Speed = 0;
        }
    });

    $(document).on('keydown', function (e) {
        if (e.keyCode == 83) {
            CONSTS.stick1Speed = 10;
        }
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode == 83) {
            CONSTS.stick1Speed = 0;
        }
    });

    $(document).on('keydown', function (e) {
        if (e.keyCode == 38) {
            CONSTS.stick2Speed = -10;
        }
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode == 38) {
            CONSTS.stick2Speed = 0;
        }
    });

    $(document).on('keydown', function (e) {
        if (e.keyCode == 40) {
            CONSTS.stick2Speed = 10;
        }
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode == 40) {
            CONSTS.stick2Speed = 0;
        }
    });

    // press "p" to save
    $(document).on('keyup', function (e) {
        if (e.keyCode == 80) {
            saveGame();
        }
    });
}

function loop() {
    window.pongLoop = setInterval(function () {

        CSS.ball.top += CONSTS.ballTopSpeed;
        CSS.ball.left += CONSTS.ballLeftSpeed;



        switch(CONSTS.gameMode){
            case 'normalgame':
                CSS.stick1.top += CONSTS.stick1Speed;
                $('#stick-1').css('top', CSS.stick1.top);

                CSS.stick2.top += CONSTS.stick2Speed;
                $('#stick-2').css('top', CSS.stick2.top);
             break;

            case 'playerVscpu':

                CSS.stick1.top += CONSTS.stick1Speed;
                $('#stick-1').css('top', CSS.stick1.top);

                if(CSS.ball.top + CSS.ball.height < CSS.stick2.top + CSS.stick.height && cpuPlayerTurn == 1){
                    CONSTS.stick2Speed = -3;
                    CSS.stick2.top += CONSTS.stick2Speed;
                    $('#stick-2').css('top', CSS.stick2.top);
                }

                if(CSS.ball.top + CSS.ball.height > CSS.stick2.top + CSS.stick.height && cpuPlayerTurn == 1 ){
                    CONSTS.stick2Speed = 3;
                    CSS.stick2.top += CONSTS.stick2Speed;
                    $('#stick-2').css('top', CSS.stick2.top);
                }
            break;

            case 'cpuVscpu':
                if(cpuPlayerTurn == -1){

                    if(CSS.ball.top + CSS.ball.height < CSS.stick1.top + CSS.stick.height){
                        CONSTS.stick1Speed = -3;
                        CSS.stick1.top += CONSTS.stick1Speed;
                        $('#stick-1').css('top', CSS.stick1.top);
                    }

                    if(CSS.ball.top + CSS.ball.height > CSS.stick1.top + CSS.stick.height  ){
                        CONSTS.stick1Speed = 3;
                        CSS.stick1.top += CONSTS.stick1Speed;
                        $('#stick-1').css('top', CSS.stick1.top);
                    }
                }

                else{
                    if(CSS.ball.top + CSS.ball.height < CSS.stick2.top + CSS.stick.height){
                        CONSTS.stick2Speed = -3;
                        CSS.stick2.top += CONSTS.stick2Speed;
                        $('#stick-2').css('top', CSS.stick2.top);
                    }

                    if(CSS.ball.top + CSS.ball.height > CSS.stick2.top + CSS.stick.height  ){
                        CONSTS.stick2Speed = 3;
                        CSS.stick2.top += CONSTS.stick2Speed;
                        $('#stick-2').css('top', CSS.stick2.top);
                    }
                }
        }

        //collision detection and ball restart

        if (CSS.ball.top <= 0 ||
            CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
            CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
        }

        $('#pong-ball').css({top: CSS.ball.top,left: CSS.ball.left});

        if (CSS.ball.left <= CSS.stick.width) {
            cpuPlayerTurn *=-1;
            CSS.ball.top > CSS.stick1.top && CSS.ball.top < CSS.stick1.top + CSS.stick.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || scoreCounter(1);
        }

        if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {
            cpuPlayerTurn *=-1;
            CSS.ball.top > CSS.stick2.top && CSS.ball.top < CSS.stick2.top + CSS.stick.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || scoreCounter(2);
        }

        checkBorders();    

   
    }, CONSTS.gameSpeed);
}



function checkBorders(){
  if (CSS.stick1.top <= 0) {
      $('#stick-1').css('top', 0);
      CSS.stick1.top = 0;
  }
  if (CSS.stick1.top + CSS.stick.height >= CSS.arena.height) {
          $('#stick-1').css('top',CSS.arena.height - CSS.stick1.height);
          CSS.stick1.top = CSS.arena.height -CSS.stick1.height;
  }
  if (CSS.stick2.top <= 0) {
      $('#stick-2').css('top', 0);
      CSS.stick2.top = 0;
  }
  if (CSS.stick2.top + CSS.stick.height >= CSS.arena.height) {
          $('#stick-2').css('top',CSS.arena.height - CSS.stick2.height);
          CSS.stick2.top = CSS.arena.height -CSS.stick2.height;
  }
}


function scoreCounter(scoredSide){

    if (scoredSide == 1){
        CONSTS.score2 +=1;
    }
    else{
        CONSTS.score1 += 1;
    }

    if(CONSTS.score1 == 5){
        alert("Player 1 WON!!!");
        endGame();
    }
    else if(CONSTS.score2 == 5){
        alert("Player 2 WON!!!");
        endGame();
    }
    roll();
}

function roll() {


    CSS.ball.top = 250;
    CSS.ball.left = 442.5;

    var side = -1;

    if (Math.random() < 0.5) {
        side = 1;
    }

    cpuPlayerTurn = side;

    document.getElementById("scrore-1").innerText = CONSTS.score1;
    document.getElementById("scrore-2").innerText = CONSTS.score2;



    CONSTS.ballTopSpeed = Math.random() * -2 - 3;
    CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
}

function endGame(){
    
    CONSTS.score1 = 0;
    CONSTS.score2 = 0;

    clearInterval(pongLoop);
    document.getElementById("pong-game").remove();

    drawStartMenu();
}


function drawStartMenu(){
    $('<div/>', {id: 'pong-menu'}).css(CSS.menu).appendTo('body');
    $('<button/>', {id: 'pVp', text: 'Player vs Player'}).css(CSS.button).appendTo('#pong-menu');
    $('<br/>').appendTo('#pong-menu');
    $('<button/>', {id: 'pVcpu', text: 'Player vs Computer'}).css(CSS.button).appendTo('#pong-menu');
    $('<br/>').appendTo('#pong-menu');
    $('<button/>', {id: 'cpuVcpu', text: 'Computer vs Computer'}).css(CSS.button).appendTo('#pong-menu');
    $('<br/>').appendTo('#pong-menu');
    $('<button/>', {id: 'reloadGame', text: 'Reload Last Game'}).css(CSS.button).appendTo('#pong-menu');

    checkGameMode();
}


function checkGameMode(){

    $("button").click(function() {
       if(this.id == "pVp"){
        CONSTS.gameMode = "normalgame";
        CONSTS.load = true;
        start();
       }
       else if(this.id == "pVcpu"){
        CONSTS.gameMode = "playerVscpu";
        CONSTS.load = true;
        start();
       }
       else if(this.id == "cpuVcpu"){
        CONSTS.gameMode = "cpuVscpu";
        CONSTS.load = true;
        start();
       }
       else if(this.id == "reloadGame"){
        reload();
        CONSTS.gameMode = window.localStorage.getItem("gameMode");
        CONSTS.load = true;
        start();
       }
    });
}

function saveGame(){
    
    window.localStorage.setItem('score1', CONSTS.score1);
    window.localStorage.setItem('score2', CONSTS.score2); 
    window.localStorage.setItem('gameMode', CONSTS.gameMode);

}

function reload(){
    CONSTS.score1 = Number(window.localStorage.getItem("score1"));
    CONSTS.score2 = Number(window.localStorage.getItem("score2"));
}

drawStartMenu();
})();