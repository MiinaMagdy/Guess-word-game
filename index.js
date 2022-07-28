game_words = [
    ["guitar", "a musical instrument"],
    ["pen", "a writing tool"],
    ["mouse", "an input device"],
    ["sweatshirt", "a cloth"]
];

var word_index;
var lettersInput = [];

function buildGame() {
    cnt = 0;
    marked = []
    word_index = Math.floor(Math.random() * game_words.length);
    word = game_words[word_index][0].toUpperCase();
    hint = game_words[word_index][1];
    // remove all input tags
    var divLetters = document.getElementById("letters");
    if (divLetters) {
        divLetters.innerHTML = "";
    }
    let letters = document.getElementById("letters");
    lettersInput = []
    for (let i = 0; i < word.length; i++) {
        let letter = document.createElement("input");
        letter.disabled = true;
        letter.type = "text";
        letter.className = "letter";
        lettersInput.push(letter);
        letters.append(letter);
    }
    document.getElementById("remain").innerHTML = word.length;
    document.getElementById("hint").innerHTML = hint;
    document.getElementById("wrong").innerHTML = "";
}

function isAlpha(c) {
    return c.length == 1 && ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'));
}

document.addEventListener('keydown', (event) => {
    let character = event.key;
    let isInGame = document.getElementById("in-game").style.display == "block";
    let rem = document.getElementById("remain");
    let wrong = document.getElementById("wrong");
    if (isInGame) {
        if (cnt < word.length) {
            if (isAlpha(character)) {
                character = character.toUpperCase();
                console.log(character);
                let idx = word.indexOf(character);
                if (idx != -1) {
                    while (marked.indexOf(idx) != -1) {
                        idx = word.indexOf(character, idx + 1);
                    }
                    marked.push(idx);
                    lettersInput[idx].value = character;
                    cnt++;
                }
                else {
                    if (parseInt(rem.innerHTML) < word.length) wrong.innerHTML = wrong.innerHTML + ", ";
                    wrong.innerHTML = wrong.innerHTML + character;
                    rem.innerHTML = -1 + parseInt(rem.innerHTML);
                    if (rem.innerHTML == "0") {
                        setTimeout(() => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'You lost!',
                                // footer: '<a href="">Why do I have this issue?</a>'
                            }).then(() => {
                                document.getElementById("in-game").style.display = "none";
                                document.getElementById("start-game").style.display = "block";
                            })
                        });
                    }
                }
            }
        }
        if (cnt == word.length) {
            setTimeout(() => {
                Swal.fire(
                    'Good job!',
                    'You win!',
                    'success'
                ).then(() => {
                    buildGame();
                });
            });
        }
    }
});

function startGame() {
    document.getElementById("start-game").style.display = "none";
    document.getElementById("in-game").style.display = "block";
    buildGame();
}
