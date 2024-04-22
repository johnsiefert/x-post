import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL: 'https://x-post-55f36-default-rtdb.firebaseio.com/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const postInDB = ref(database, 'Post');

const input = document.querySelector('#text');
const btn = document.querySelector('#btn');
const post = document.querySelector('#post');
const from = document.querySelector('.from');
const to = document.querySelector('.to');

function reviewInput() {
  let inputValue = input.value;
  let toValue = to.value;
  let fromValue = from.value;

  clearInput();

  pushData(inputValue, fromValue, toValue);
}

function pushData(review, sender, to){
    let arr = [review, sender, to, 0];
  push(postInDB, arr);
}

onValue(postInDB, function (snapshot) {
  if (snapshot.exists()) {
    clearPost();
    let currentItem = Object.entries(snapshot.val());

    for (let i = currentItem.length -1; i >= 0; i--) {
      let currentData = currentItem[i];
      //   let currentItemID = currentItem[0];
      // let currentItemValue = currentItem[1];
      appendItem(currentData);
    }
  } else {
    post.innerHTML = '- (X) Posts -';
  }
});

function clearInput() {
  input.value = '';
  to.value = '';
  from.value = '';
}

function clearPost() {
  post.innerHTML = '';
}

function appendItem(item) {
  let itemData = item[1];
  console.log(itemData)
  let reviewText = itemData[0];
    let reviewTo = itemData[2];
      let reviewFrom = itemData[1];

  let li = document.createElement('li');

  let toEl = document.createElement('div');
    const boldToSpan = document.createElement('span');
      boldToSpan.textContent = `To ${reviewTo}`;

    boldToSpan.classList.add('bold');
    toEl.appendChild(boldToSpan);

  let messageEl = document.createElement('div');
  messageEl.textContent = `${reviewText}`;

  let fromEl = document.createElement('div');
 const boldFromSpan = document.createElement('span');
  boldFromSpan.textContent = `From ${reviewFrom}`;
   boldFromSpan.classList.add('bold');
   fromEl.appendChild(boldFromSpan);

  li.appendChild(toEl);
  li.appendChild(messageEl);
  li.appendChild(fromEl);
  post.appendChild(li);
}

btn.addEventListener('click', reviewInput);
