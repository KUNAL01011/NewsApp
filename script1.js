const API_KEY = "a1ed7d7d19794f29bb6344e26c2b1a7b";
const url = "https://newsapi.org/v2/everything?q=";

//Invoked the function
window.addEventListener('load',()=>{
    fetchNews("India");
})

//question : fetch data form the api 
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

//question : You have 100 articles find one have an img only and display it

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container')
    const newsCardTemlate = document.getElementById('template-news-card')
    cardsContainer.innerHTML = "";
    articles.forEach((article) => {
        if(!article.urlToImage){
            return;
        }
        const cardClone = newsCardTemlate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone)
        console.log(article)
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')
    const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone: "Asia/Jakarta"})
    newsSource.innerHTML = `${article.source.name} . ${date}`;

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML= article.description;
    cardClone.firstElementChild.addEventListener("click", ()=> {
        window.open(article.url,"_blank");
    })
}