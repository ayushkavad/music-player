import { async } from 'regenerator-runtime';
import { API, API_PATH } from './config';
import { getJSON } from './helpers';

export const stateObj = {
  search: {
    quary: '',
    results: [],
  },
};

console.log(stateObj);

export const loadMusic = async function (id) {
  try {
    // 1) Loading Search Music
    const data = await getJSON(`${API}tracks/?ids=${id}`);

    // 2) Create New Object
    const [state] = data.tracks;
    stateObj.search.state = {
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
  } catch (err) {
    throw err;
  }
};

export const searchMusic = async function (quary) {
  try {
    // 1) Current Query
    stateObj.search.quary = quary;

    // 2) Loading Search Results
    const data = await getJSON(`${API}search/?q=${quary}${API_PATH}`);

    // 3) Storing Search Result
    stateObj.search.results = data.tracks.items.map(({ data }) => {
      return {
        id: data.id,
        title: data.name,
        artist: data.artists.items[0].profile.name,
        imageMedium: data.albumOfTrack.coverArt.sources[1].url,
      };
    });
  } catch (err) {
    throw err;
  }
};
