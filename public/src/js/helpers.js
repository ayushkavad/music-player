import { API_KEY, SET_TIMEOUT } from './config';

// Timeout After 10 seconds
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Fetching data and Rejecting Promise
export const getJSON = async function (url) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${API_KEY}`,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
      },
    };

    const res = await Promise.race([
      fetch(`${url}`, options),
      timeout(SET_TIMEOUT),
    ]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${res.status}, ${data.message}`);

    return data;
  } catch (err) {
    console.error(err);
  }
};
