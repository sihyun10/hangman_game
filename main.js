const hangmanImage = document.querySelector('.hangman-box img');
const wordDisplay = document.querySelector('.word-display');
const mistakeNumber = document.querySelector('.mistake-number b');
const alphabetDiv = document.querySelector('.alphabet');
const gameModal = document.querySelector('.game-modal');

let currentWord, correctAlphabets = [], failCount = 0;
const maxGuesses = 8;

const getRandomWords = () => {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  const { word } = wordList.splice(randomIndex, 1)[0];
  return word;
}

const displayRandomWords = () => {
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

const startGame = (selectedWord) => {
  currentWord = selectedWord;
  const selectBox = document.querySelector(".select-box");
  selectBox.style.display = 'none';

  const hangmanBox = document.querySelector('.hangman-box');
  hangmanBox.style.display = 'block';
  const gameBox = document.querySelector('.game-box');
  gameBox.style.display = 'block';

  wordDisplay.innerHTML = currentWord.split('').map(() => `<li class="letter"></li>`).join('');
}

displayRandomWords();

const gameOver = (isSuccess) => {
  setTimeout(() => {
    const modalText = isSuccess ? `당신이 맞춘 단어는 :` : '정답은 :';
    gameModal.querySelector('img').src = `images/${isSuccess ? 'success' : 'fail'}.gif`;
    gameModal.querySelector('h4').innerText = `${isSuccess ? '축하드립니다~!' : '게임이 종료되었습니다'}`;
    gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add('show');
  }, 300);
}

const initGame = (button, clickedAlphabet) => {
  if(currentWord.includes(clickedAlphabet)) {
    [...currentWord].forEach((letter, index) => {
      if(letter === clickedAlphabet) {
        correctAlphabets.push(letter);
        wordDisplay.querySelectorAll('li')[index].innerText = letter;
        wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
        button.style.display = 'none';
      }
    });
  } else {
    failCount += 1;
    hangmanImage.src = `images/hangman-${failCount}.jpg`;
  }
  button.disabled = true;
  mistakeNumber.innerText = `${failCount} / ${maxGuesses}`;

  // 게임 종료 조건(오류횟수 8번이상일 경우(실패), 다 일치할 경우(성공))
  if(failCount === maxGuesses) {
    return gameOver(false);
  }
  if(correctAlphabets.length === currentWord.length) {
    return gameOver(true);
  }
}

// a~z까지의 알파벳 버튼 생성
for (let i = 97; i <= 122; i++) {
  const button = document.createElement('button');
  button.innerText = String.fromCharCode(i);
  alphabetDiv.appendChild(button);
  button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));
}