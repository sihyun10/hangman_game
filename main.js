const wordDisplay = document.querySelector('.word-display');
const mistakeNumber = document.querySelector('.mistake-number b')
const alphabetDiv = document.querySelector('.alphabet');

let currentWord, failCount = 0;
const maxGuesses = 8;

function getRandomWords() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  const { word } = wordList.splice(randomIndex, 1)[0];
  return word;
}

function displayRandomWords() {
  const randomWordsContainer = document.querySelector(".random-words");

  const randomWords = [];
  while (randomWords.length < 3) {
      const word = getRandomWords();
      if (!randomWords.includes(word)) {
          randomWords.push(word);
      }
  }
  randomWordsContainer.innerHTML = '';
  randomWords.forEach((word) => {
      const wordElement = document.createElement("div");
      wordElement.classList.add("random-word");
      wordElement.textContent = word;
      randomWordsContainer.appendChild(wordElement);

      wordElement.addEventListener('click', () => startGame(word));
  });
}

function startGame(selectedWord) {
  currentWord = selectedWord;
  const selectBox = document.querySelector(".select-box");
  selectBox.style.display = 'none';

  const hangmanBox = document.querySelector('.hangman-box');
  hangmanBox.style.display = 'block';
  const gameBox = document.querySelector('.game-box');
  gameBox.style.display = 'block';

  wordDisplay.innerHTML = selectedWord.split('').map(() => `<li class="letter"></li>`).join('');
}

displayRandomWords();

const initGame = (button, clickedAlphabet) => {
  if(currentWord.includes(clickedAlphabet)) {
    [...currentWord].forEach((letter, index) => {
      if(letter === clickedAlphabet) {
        wordDisplay.querySelectorAll('li')[index].innerText = letter;
        wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
      }
    })
  } else {
    failCount += 1;
  }
  mistakeNumber.innerText = `${failCount} / ${maxGuesses}`;
}

// a~z까지의 알파벳 버튼 생성
for (let i = 97; i <= 122; i++) {
  const button = document.createElement('button');
  button.innerText = String.fromCharCode(i);
  alphabetDiv.appendChild(button);
  button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));
}