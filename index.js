const baseURL = "https://newsapi.org/v2/everything?";
const key = "&apiKey=9f72ac6bf76b461f95791590b3ad2083";
const defaultQuery = "q=technology";
const fullURL = baseURL + defaultQuery + key;
const wrapper = document.createElement('div');
const body = document.querySelector('body');
const header = document.createElement('header');
const search = document.createElement('input');
const submit = document.createElement('input');

search.type = 'text';
submit.type = 'submit';
search.placeholder = 'Search for news about something';
submit.innerText = 'Submit';

header.appendChild(search);
header.appendChild(submit);
body.appendChild(header);
wrapper.classList.add('article-wrapper')
body.appendChild(wrapper);

submit.addEventListener('click', async () => {
  removeCurrentArticles()

  const url = buildURL();

  await getData(url);
});

function removeCurrentArticles() {
  const articleWrapper = document.querySelector('.article-wrapper');

  while (articleWrapper.firstChild) {
    articleWrapper.firstChild.remove();
  }
};

function buildURL() {
  const query = "q=" + (search.value.toString() || "technology");
  return baseURL + query + key;
};

function buildArticle(article) {
  const articleWrapper = document.createElement('a');
    const imgWrapper = document.createElement('div');
    const gradient = document.createElement('div');
    const titleLink = document.createElement('a');
    const title = document.createElement('h2');
    const author = document.createElement('p');
    const desc = document.createElement('p');

    imgWrapper.style = `background-image: url(${article.urlToImage})`;
    titleLink.href = article.url;
    articleWrapper.href = article.url;
    titleLink.innerText = article.title;
    author.innerText = article.author;
    desc.innerText = article.description;
    articleWrapper.classList.add('article');
    gradient.classList.add('gradient');

    title.appendChild(titleLink);
    imgWrapper.appendChild(gradient);
    articleWrapper.appendChild(imgWrapper);
    articleWrapper.appendChild(title);
    articleWrapper.appendChild(author);
    articleWrapper.appendChild(desc);
    wrapper.appendChild(articleWrapper);
};

function createNoArticleElement() {
  const articleWrapper = document.querySelector('.article-wrapper');
  const msg = document.createElement('h2');
  msg.classList.add('articles-empty');
  msg.innerText = "There weren't any articles found on that topic :(";

  articleWrapper.appendChild(msg);
};

async function getData(url) {
  const data = await fetch(url)
  const dataJSON = await data.json()

  if (dataJSON.articles.length === 0) {
    createNoArticleElement();
  } else {
    dataJSON.articles.forEach(article => buildArticle(article));
  }
}

getData(fullURL).catch(err => console.log(err))
