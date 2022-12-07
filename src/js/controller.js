import * as model from './model.js';
import musicView from './views/musicView.js';

// Music Load

const controllerLoadMusic = async function () {
  try {
    //1) Hash change
    const id = window.location.hash.slice(1);

    // 2) Render Spinner
    musicView.renderSpinner();

    // 3) Load Music
    await model.loadMusic(id);

    // 4) Render Music
    musicView.render(model.stateObj.search);
  } catch (err) {
    console.error(err);
  }
};

['hashchange', 'load'].forEach((ev) =>
  window.addEventListener(ev, controllerLoadMusic)
);

// Search Query

const controllerSearchMusic = async function (quary) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5feefb9bb7msh3a72f494ab9c76fp175dd7jsnd2910d70b346',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
      },
    };

    const res = await fetch(
      `https://spotify23.p.rapidapi.com/search/?q=${quary}E&type=multi&offset=0&limit=10&numberOfTopResults=5`,
      options
    );

    const data = await res.json();

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

controllerSearchMusic('Kid Francescoli');
