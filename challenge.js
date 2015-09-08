function print(message, className) {
    if (typeof document !== 'undefined') {
        var m = document.createElement('p');
        m.innerText = message;
        m.className = className;
        document.getElementById('results').appendChild(m);
    } else {
        if (className) {
            console.log(message + ' <class=' + className + '>');
        } else {
            console.log(message);
        }
    }
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
    [CE,CW,CS,CE,CE,CE],
    [CE,CE,CE,CE,CW,CS],
    [CE,CE,CE,CE,CE,CE],
    [CW,CW,CE,CW,CE,CE],
    [CE,CS,CE,CW,CE,CE],
    [CE,CE,CE,CE,CE,CG]
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
        print('ロボットが前に進んだ！ ' + '(x:'+position.x+', y:'+position.y+')');
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

//-----------------
// CHALLENGE 3
//-----------------

/*
シーザー暗号突破

このチャレンジはトップシクレットメッセージを復号するチャレンジです。
現代のテクノロジーには暗号化は非常に不可欠です。
金融機関の間の振込、内聞のメール、私たちのパスワード…
それら全部悪いハッカーに隠さないといけない。それは暗号化です。

一番弱い暗号化はシーザー暗号と言います。古代ローマに使われていたと言う。
当時は帝王から群体へのメッセージは敵に盗られても、敵が読めないように書かれていた。
シーザー暗号を用いて安心にメッセージを運んでいた。

しかし、
現代のパソコンで、シーザー暗号で暗号化されたメッセージは、ミリ秒で復号できます。

シーザー暗号はこういうものです：

例えば、このメッセージを暗号したかったら：
"message"
文字を一つずつずれたら、
'a' -> 'b', 'b' -> 'c', ... 'z' -> 'a'
こんな風になる：
"message" -> "nfttbhf"
これは「一個ずれ」。しかし「二個ずれ」にしたら:
'a' -> 'c', 'b' -> 'd', ... 'z' -> 'b'
こんな風になる：
"message" -> "oguucig"
「何ずれ」は「暗号キー」と言います。暗号キーを分かったら、メッセージを復号できると言うことです。

このチャレンジは、敵のシクレットメッセージを手に入れた。もちろん、敵の暗号キーは分からない。

左のdecryptと言う関数を完成して、シクレットメッセージを復号せよ！
decryptの入力はmessage（暗号されたメッセージ）、出力は復号されたメッセージ。

HINT:
これのJavaScriptの機能を勉強したらいい：
- for loop: ループを使ってメッセージの文字を一つずつ処理できる
- string.chatAt(position) : stringの中の何番目の文字見れる
- "hello" + "world" -> "helloworld": stringとstringを+で組み合わせる

*/

var p_secretMessage = "we will attack tokyo tomorrow at noon";
var p_alphabet = "abcdefghijklmnopqrstuvwxyz";
var p_key = 17;

function p_encrypt(message) {
    var encrypted = "";
    for (var i = 0; i < message.length; i++) {
        if (message[i] === ' ') {
            encrypted += ' ';
        } else {
            for (var l = 0; l < p_alphabet.length; l++) {
                if (p_alphabet[l] === message[i]) {
                    var encryptedChar = p_alphabet[(l + p_key) % p_alphabet.length];
                    encrypted += encryptedChar;
                }
            }
        }
    }
    return encrypted;
}

var decrypt = function (message) {
    return message;
};

var p_encryptedMessage = p_encrypt(p_secretMessage);

function testChallenge3() {
    if (decrypt !== undefined) {
        var decryptedMessage = decrypt(p_encryptedMessage);
        print('暗号メッセージ：　' + p_encryptedMessage);
        print('復号メッセージ：　' + decryptedMessage, decryptedMessage === p_secretMessage ? 'pass' : 'fail');
    } else {
        print('function decryptはundefinedです！　消しちゃったの？', 'fail');
    }
}
