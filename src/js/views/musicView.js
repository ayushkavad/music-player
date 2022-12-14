import icons from '../../img/icons.svg';
import View from './View';

class MusicView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'Something went wrong! please try again.';
  _message = 'Want better recommendation ? Pick some music you like :)';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerController(handler) {
    this._parentEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.play-song');
      if (!btn) return;
      handler();
    });
  }

  addAudioEndController(audio, handler) {
    audio.addEventListener('ended', () => {
      handler();
    });
  }

  _generateMarkup() {
    console.log(this._data);
    return `
    <figure class="recipe__fig">
      <img src="${this._data.state.imageBig}" alt="${
      this._data.state.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.state.title}</span>
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
         
              <use href="${icons}#icon-${
      !this._data.state.status ? 'play' : 'pause'
    }"></use>
          </svg>
         
          <svg class="play__track__img">
              <use href="${icons}#icon-right"></use>
          </svg>
     </div>
   </div>


   <audio src="" class="myAudio"></audio>
  
    <div class="play">
      <div class="play__album">
        <div>
          <img src="${this._data.state.imageMedium}" alt="" width="200" />
        </div>
        <div class="play__info">
          <div class="play__artist">
            <h1 class="play__name">${this._data.state.artist}</h1>
            <p class="play__title">Album by ${this._data.state.artist}</p>
            <p class="play__discription">
              Want better recommendation? Pick some music you like.
            </p>
          </div>

          <a
            style="width: 150px"
            class="btn--small recipe__btn"
            href="${this._data.state.album}"
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
  }
}

export default new MusicView();
