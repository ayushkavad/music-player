import icons from "../img/icons.svg";

const searchView = document.querySelector(".recipe");

// Music Load

const loadSpinner = function (parantEl) {
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
  parantEl.innerHTML = "";
  parantEl.insertAdjacentHTML("afterbegin", markup);
};

const controllerLoadMusic = async function () {
  try {
    loadSpinner(searchView);
    const id = window.location.hash.slice(1);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "5feefb9bb7msh3a72f494ab9c76fp175dd7jsnd2910d70b346",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    const res = await fetch(
      `https://spotify23.p.rapidapi.com/tracks/?ids=${id}`,
      options
    );

    const data = await res.json();
    let [state] = data.tracks;
    console.log(state);
    state = {
      id: state.id,
      title: state.name,
      artist: state.artists[0].name,
      album: state.album.external_urls.spotify,
      url: state.preview_url,
      imageBig: state.album.images[0].url,
      imageMedium: state.album.images[1].url,
      imageSmall: state.album.images[2].url,
      duration: state.duration_ms,
    };

    console.log(state);

    const markup = `
      <figure class="recipe__fig">
        <img src="${state.imageBig}" alt="${state.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${state.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div>
          <h1>Good Morning</h1>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes"
              >12:00 <span>AM</span></span
            >
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="play__track">
       <div class="play__track__btn">
            <svg class="play__track__img">
              <use href="${icons}#icon-left"></use>
            </svg>
            <svg class="play__track__img play-song">
                <use href="${icons}#icon-pause"></use>
            </svg>
            <svg class="play__track__img">
                <use href="${icons}#icon-right"></use>
            </svg>
       </div>
     </div>

      <div class="play">
        <div class="play__album">
          <div>
            <img src="./src/img/play.png" alt="" width="200" />
          </div>
          <div class="play__info">
            <div class="play__artist">
              <h1 class="play__name">${state.artist}</h1>
              <p class="play__title">Album by ${state.artist}</p>
              <p class="play__discription">
                Want better recommendation? Pick some music you like.
              </p>
            </div>

            <a
              style="width: 150px"
              class="btn--small recipe__btn"
              href="${state.album}"
              target="_blank"
            >
              <span>Album</span>
              <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

    searchView.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.error(err);
  }
};

// controllerLoadMusic();
window.addEventListener("hashchange", controllerLoadMusic);
// Search Query
const controllerSearchMusic = async function (quary) {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "5feefb9bb7msh3a72f494ab9c76fp175dd7jsnd2910d70b346",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
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

controllerSearchMusic("Kid Francescoli");
