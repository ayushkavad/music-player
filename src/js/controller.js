import * as model from './model.js';
import musicView from './views/musicView.js';
import searchResultView from './views/searchResultView.js';
import searchView from './views/searchView.js';
let audio;

const controllerPlayMusic = function (url) {
  // Music url
  audio = new Audio(url);
};

// let newSong;
// function hello(song) {
//   song.forEach((element) => {
//     newSong = new Audio(element);
//     console.log(newSong);
//   });
// }

const controllerLoadMusic = async function () {
  try {
    //1) Render message
    musicView.renderMessage();

    //2) Hash change
    const id = window.location.hash.slice(1);

    if (!id) return;

    // 3) Render Spinner
    musicView.renderSpinner();

    // 4) Load Music
    await model.loadMusic(id);

    // 5) Render Music
    musicView.render(model.stateObj.search);

    controllerPlayMusic(model.stateObj.search.state.url);

    // hello(model.stateObj.search.currentMusic);
  } catch (err) {
    musicView.renderError();
  }
};

const controllerSearchMusic = async function () {
  try {
    // 1) Render Spinner
    searchResultView.renderSpinner();

    // 2) Get Query
    const query = searchView.getQuery();

    if (!query) return;

    // 3) Search Results
    await model.searchMusic(query);

    searchResultView.render(model.stateObj.search.results);
  } catch (err) {
    searchResultView.renderError();
  }
};

const musicController = function () {
  if (!model.stateObj.search.state.status) {
    // toggle play icon
    model.playMusic(model.stateObj.search.state);
    // music play

    if (!audio) return;
    audio.play();

    musicView.addAudioEndController(audio, pauseEnd);
  } else {
    // toggle pause icon
    model.pauseMusic(model.stateObj.search.state);

    if (!audio) return;
    // pause music
    audio.pause();
  }
  // update markup
  musicView.update(model.stateObj.search);
};

const pauseEnd = function () {
  // newSong.pause();
  model.pauseMusic(model.stateObj.search.state);
  musicView.update(model.stateObj.search);
};

// console.log(audio);
const init = function () {
  musicView.addHandlerRender(controllerLoadMusic);
  searchView.addHandlerSearch(controllerSearchMusic);
  musicView.addHandlerController(musicController);
};

init();
