import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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

function reviewInput() {
  let inputValue = input.value;
    clearInput()
  push(postInDB, inputValue);
}


onValue(postInDB, function (snapshot) {
  if (snapshot.exists()) {

    let dataArray = Object.entries(snapshot.val());

    clearPost()

    dataArray.reverse().forEach((data) => {
      let currentItem = data;
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];
      appendItem(currentItem);
    });
  } else {
    post.innerHTML = '- (X) Posts -';
  }
});

function clearInput() {
    input.value = ""
}

function clearPost() {
    post.innerHTML = ""
}

function appendItem(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let li = document.createElement('li');
  li.textContent = itemValue;
  post.append(li);
}

btn.addEventListener('click', reviewInput);
