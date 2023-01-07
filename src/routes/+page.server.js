import words from '$lib/server/words.txt';

export async function load({ params, url, route, fetch }) {
  const res = await fetch(words);
  const text = await res.text();
  const dictionary = text.split('\r\n');

  // console.log(dictionary.slice(0, 20));
  return {
    dictionary: dictionary
  };
}