var SnakeGame = (function () {
    'use strict';
    var cnv = $('#cnv')[0],
        ctx = cnv.getContext('2d'),
        width = cnv.width,
        height = cnv.height,
        frame = 50,
        snakeArr = [],
        len = 5,
        basicLength = len,
        blokSize = 10,
        direction = 'right',
        posX =  width / 2,
        posY =  width / 2,
        coordX = Math.round((Math.random() * width) / 10) * 10,
        coordY = Math.round((Math.random() * height) / 10) * 10,
        score = 0,
        inversDirection = {
            'up' : 'down',
            'left' : 'right',
            'right' : 'left',
            'down' : 'up'
        };
    
    function init() {
        $('#cnv').css({'border' : '10px solid #ddd'});

        snake();
        bindings();
        gameLoop();
        
    };
    function gameLoop() {
        ctx.clearRect(0, 0, width, height);
        draw();
        if (checkCollision()) {
            ctx.clearRect(0, 0, width, height);
            ctx.font = width / 10 + 'px Verdana';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Game over', posX + basicLength * blokSize, posY);
            return false;
        }
        ctx.font = width / 5 + 'px Verdana';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(score, posX + basicLength * blokSize, posY);
        eatFood();
        food();
        move();

        setTimeout(gameLoop, frame);
    };

    function snake() {
        var i;
        for (i = len; i > 0; i -= 1) {
            snakeArr.push({x : posX, y: posY});
            posX -= blokSize;
        }
    };

    function draw() {  
        var i;
        for (i = 0; i < len; i += 1) {
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.rect(snakeArr[i].x, snakeArr[i].y, blokSize, blokSize);
            ctx.fill();
        }
    };

    function move() {
        var nextPos = snakeArr[0];
        if (direction === 'right') {
            nextPos.x +=   blokSize;
        } else if (direction === 'left') {
            nextPos.x -=  blokSize;
        } else if (direction === 'up') {
            nextPos.y -= blokSize;
        } else if (direction === 'down') {
            nextPos.y += blokSize;
        }
        snakeArr.unshift({x : nextPos.x, y : nextPos.y});
        snakeArr.pop();

    };

    function food() {
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.fillRect(coordX, coordY, blokSize, blokSize);
    };

    function eatFood() {
        len = snakeArr.length;
        var snakeHead = snakeArr[0],
            posX = snakeArr[len - 1].x - blokSize,
            posY = snakeArr[len - 1].y - blokSize;
        if (snakeHead.x === coordX && snakeHead.y === coordY) {
            snakeArr.push({x : posX, y : posY});
            coordX = Math.round((Math.random() * width) / 10) * 10;
            coordY = Math.round((Math.random() * height) / 10) * 10;
            score +=1;
        }
    };

    function checkCollision() {
        var snakeHead = snakeArr[0],
            body = snakeArr.slice(2, snakeArr.length),
            match = body.filter(function (obj) {
                if (obj.x === snakeHead.x && obj.y === snakeHead.y) {
                    return obj;
                }
            });
        if (snakeHead.x === width || snakeHead.x === -10 || snakeHead.y === height || snakeHead.y === -10 || match.length > 0) {
            return true;
        }
    };

    function bindings() {
        $(document).on('keydown', function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode === 37 && direction !== inversDirection.left) {
                direction = 'left';
            } else if (keycode === 38 && direction !== inversDirection.up) {
                direction = 'up';
            } else if (keycode === 39 && direction !== inversDirection.right) {
                 direction = 'right';
            } else if (keycode === 40 && direction !== inversDirection.down) {
                direction = 'down';
            }
        });
    };

    return {
        init : init
    };
}());
