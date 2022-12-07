import { async } from 'regenerator-runtime';
import { API_KEY } from './config';

export const stateObj = {
  search: {},
};

export const loadMusic = async function (id) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${API_KEY}`,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
      },
    };

    const res = await fetch(
      `https://spotify23.p.rapidapi.com/tracks/?ids=${id}`,
      options
    );

    const data = await res.json();

    console.log(data);
    if (!res.ok) throw new Error(`${res.status}, ${data.message}`);

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

    // console.log(state);
  } catch (err) {
    console.error(err);
  }
};
