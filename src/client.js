// styles
import 'main.scss';

// required options
const api = 'https://api.flickr.com/services/rest';
const apiKey = '69ee702eacb2bae077f2e75362be17c4';
const method = 'flickr.photos.search';
const perPage = 10;

let page = 1;
let tag = '';

const getUrl = (page = 1, tag = '') => (
  `${api}/?method=${method}&api_key=${apiKey}&tags=${tag}&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`
);

// form controls
const input = document.querySelectorAll('input')[0];
const searchButton = document.querySelectorAll('button')[0];

// show more button
const loadMore = document.querySelectorAll('.show-more')[0];

// container
const container = document.querySelectorAll('main')[0];

// error node
const errorNode = document.querySelectorAll('.error-message')[0];

// functionality
const fetchData = async url => {
  try {
    const responce = await fetch(url);

    if (responce.ok) {
      loadMore.classList.remove('hide');
    }

    const data = await responce.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const append = ({ id, secret, server, farm, title }) => {
  let div = document.createElement('div');
  let img = document.createElement('img');
  div.classList.add('image');
  img.src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  img.title = title;

  div.appendChild(img);
  container.appendChild(div);
}

const showImages = data => {
  const { photo } = data.photos;

  photo.map(({ id, secret, server, farm, title }) => {
    let div = document.createElement('div');
    let img = document.createElement('img');
    div.classList.add('image');
    img.src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    img.title = title;

    div.appendChild(img);
    container.appendChild(div);
  })
}

// new Search
searchButton.addEventListener('click', () => {
  tag = input.value;
  if (tag.length >= 3) {
    container.innerHTML = '';
    errorNode.innerHTML = '';
    fetchData(getUrl(page, tag))
      .then(showImages)
      .catch(console.log)
  } else {
    errorNode.innerHTML = '';
    const textErr = document.createTextNode('Min length 3 symbols.');
    errorNode.appendChild(textErr)
  }
})

// load next page
loadMore.addEventListener('click', () => {
  page++;
  fetchData(getUrl(page, tag))
    .then(showImages)
    .catch(console.log)
})
