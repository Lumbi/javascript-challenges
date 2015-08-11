function print(message, className) {
    var m = document.createElement('p');
    m.innerText = message;
    m.className = className;
    document.getElementById('results').appendChild(m);
}

function test(testCase, expectedOutput, inputs) {
    var output = testCase.call(this, inputs);
    if (output === expectedOutput) {
        print('PASS!', 'pass');
    } else {
        print('FAIL! 結果：' + output　+ ' -> 正解：' + expectedOutput, 'fail');
    }
}

//-----------------
// CHALLENGE 2
//-----------------

var CE = 1; // empty
var CS = 2; // stone
var CW = 4; // wall
var CG = 8; // goal

var maze = [
    [CE,CE,CE,CE,CE,CG],
    [CE,CS,CE,CW,CE,CE],
    [CW,CW,CE,CW,CE,CE],
    [CE,CE,CE,CE,CE,CE],
    [CE,CE,CE,CE,CW,CS],
    [CE,CW,CS,CE,CE,CE]
];
var position = {x: 0, y:0 };
var direction = 'up';
var stones = 0;

function turnRight() {
    if (direction === 'up') {
        direction = 'right';
    } else if (direction === 'right') {
        direction = 'down';
    } else if (direction === 'down') {
        direction = 'left';
    } else if (direction === 'left') {
        direction = 'up';
    }
    print('ロボットが右に曲がった！');
}

function turnLeft() {
    if (direction === 'up') {
        direction = 'left';
    } else if (direction === 'right') {
        direction = 'up';
    } else if (direction === 'down') {
        direction = 'right';
    } else if (direction === 'left') {
        direction = 'down';
    }
    print('ロボットが左に曲がった！');
}

function moveForwardOnce() {
    var newPosition = position;
    if (direction === 'up') {
        newPosition.y += 1;
    } else if (direction === 'right') {
        newPosition.x += 1;
    } else if (direction === 'down') {
        newPosition.y -= 1;
    } else if (direction === 'left') {
        newPosition.x -= 1;
    }

    var validPosition = false;
    if (newPosition.x >= 0 && newPosition.x < maze[0].length) {
        if (newPosition.y >= 0 && newPosition.x < maze.length) {
            if(maze[newPosition.y][newPosition.x] !== CW) {
                validPosition = true;
            }
        }
    }

    if (validPosition) {
        position = newPosition;
        print('ロボットが前に進んだ！');
    } else {
        print('ERROR: 壁があるのでロボットが前に進まなかった！');
    }
}

function moveForward(times) {
    for (var i = 0; i < times; i++) {
        moveForwardOnce();
    }
}

function collect() {
    if (maze[position.y][position.x] === CS) {
        stones++;
        maze[position.y][position.x] = CE;
        print('ロボットが宝石を取った！');
    } else {
        print('ERROR:ロボットが何も取らなかった！');
    }
}

function robotIsAtGoal(){
    return maze[position.y][position.x] === CG;
}

function getNumberOfStones() {
    return stones;
}

function testChallenge2() {
    print('ロボットは赤い宝石を三つ集めたか？');
    test(getNumberOfStones, 3);
    print('ロボットはゴールに着きましたか？');
    test(robotIsAtGoal, true);
}
