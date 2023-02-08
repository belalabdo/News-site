var newsContainer = document.querySelector(".news-row");
var mainNews = document.querySelector("#main-news");

async function getNews(country = "eg", category = "business", num) {
  var result;
  var api = await fetch(
    `https://newsapi.org/v2/top-headlines?pageSize=100&country=${country}&category=${category}&apiKey=b506b4134285445a9af676788ab280d1`
  );
  result = await api.json();
  //displayMain(result.articles);
  display(result.articles);
}
/*
function displayMain(articles) {
  mainNews.innerHTML = `
  <div class="text-white d-flex justify-content-center align-items-center layer z-0">
    <div class="text-end w-50 row col-12 d-flex d-flex justify-content-center align-items-end flex-column">
      <h1 class="mb-5 col-7">${articles[0].title}</h1>
      <p class="mb-5 col-6">${articles[0].description}</p>
      <a href="${articles[0].url}" class="btn btn-primary">تصفح هذا الخبر</a>
    </div>
  </div>
  <img
    src="${articles[0].urlToImage}"
    class="d-block mx-auto col-6 z-3"
    alt=""
  />
  `;
}
*/
function display(articles) {
  var validNews = [];
  validateNews(articles, validNews);
  var cartona = "";
  for (var i = 1; i < validNews.length; i++) {
    cartona += `
      <div class="item col-4">
        <div class="card col-12 h-100">
          <div class="h-50 overflow-hidden border border-bottom">
            <img
              src="${validNews[i].urlToImage}"
              class="card-img-top h-100"
              alt="..."
            />
          </div>
          <div class="card-body text-end d-flex flex-column justify-content-between">
            <p class="mb-1 p-1 rounded text-dark">${validNews[i].source.name}</p>
            <h5 class="my-3 card-title">${validNews[i].title}</h5>
            <a href="${validNews[i].url}" class="btn btn-primary">تصفح هذا الخبر</a>
          </div>
        </div>
      </div>
    `;
  }
  newsContainer.innerHTML = cartona;
}

function validateNews(news, validatedNewsArr) {
  for (var i = 0; i < news.length; i++) {
    if (
      news[i].title != null &&
      news[i].url != null &&
      news[i].urlToImage != null
    ) {
      validatedNewsArr.push(news[i]);
    }
  }
}

getNews("eg", "technology");
getNews("eg", "business");
getNews("eg", "politics");
