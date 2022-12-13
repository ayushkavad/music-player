import View from './View';

class searchResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'Someting want wrong! please try again :(';

  _generateMarkup() {
    return this._data.map(this._getGenerateMarkup).join('');
  }

  _getGenerateMarkup(data) {
    return `
      <li class="preview">
          <a class="preview__link " href="#${data.id}">
          <figure class="preview__fig">
              <img src="${data.imageMedium}" alt="Test" />
          </figure>
          <div class="preview__data">
              <h4 class="preview__title">${data.title}</h4>
              <p class="preview__publisher">${data.artist}</p>
          </div>
          </a>
      </li>
    `;
  }
}

export default new searchResultView();
