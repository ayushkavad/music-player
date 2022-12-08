import * as model from './model.js';
import musicView from './views/musicView.js';
import searchResultView from './views/searchResultView.js';
import searchView from './views/searchView.js';

// Music Load

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
  } catch (err) {
    musicView.renderError();
  }
};

['hashchange', 'load'].forEach((ev) =>
  window.addEventListener(ev, controllerLoadMusic)
);

// Search Query

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

const init = function () {
  searchView.addHandlerSearch(controllerSearchMusic);
};

init();
