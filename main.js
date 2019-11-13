//window.addEventListener("load") //load the content when everythin has loaded img, css etc
window.addEventListener("DOMContentLoaded", getData); //HTML loaded

function getData() { //Jonas kalder den init
  //console.log('hey');
  //preloader.setup();
  // fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/posts?per_page=2&page=2")
  //fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/posts?search=consectetur")
  //fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/posts?_embed&search=consectetur")
  //fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book?_embed")

  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("search");
  const id = urlParams.get("id");
  const category = urlParams.get("category");
  console.log(search);

  if (search) { //"routing"//
    console.log("this is a search page");
    getSearchData();
  } else if (id) {
    getSingleBook();
  } else if (category) {
    getCategoryeData(category);
    console.log("this is a category page: " + category);

  } else {
    console.log("not searching");
    getFrontPageData();
  }
  getNavigation();

} //asyncronous has to use the server in London

function getNavigation() {
  fetch("http://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/categories?per_page=100")
    .then(res => res.json())
    .then(data => { //.then(function () {
      console.log(data);
      data.forEach(addNavLink);
    });
}

function addNavLink(oneItem) {
  console.log(oneItem.name);
  if (oneItem.parent === 14 && oneItem.count > 0) { //omits categoris with notjhing in them
    const link = document.createElement('a');
    link.textContent = oneItem.name;
    link.setAttribute("href", "category.html?category=" + oneItem.id);
    document.querySelector('nav').appendChild(link);
    //document.querySelector('nav').innerHTML += oneItem.name;
  }
}

function getSearchData() {
  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("search");
  fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book/?search=" + search + "&_embed")
    //fetch("https://lasseclaes.com/wp19_10/wp-json/wp/v2/film")

    //fetch('https://pjmelite.dk/wp_mytest/wordpress/wp-json/wp/v2/posts?_embed')
    .then(res => res.json())
    .then(handleData)
}

function getFrontPageData() {
  console.log("getFrontPageData()")
  fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book?_embed")
    .then(res => res.json())
    .then(handleData)
}

function getCategoryeData(catId) {
  console.log(catId);
  console.log("getCategoryData()")
  fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book?_embed&categories=" + catId)
    .then(res => res.json())
    .then(handleData)
}

function getSingleBook() {
  console.log("getSingleBook()")
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log(id)


  fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book/" + id + "?_embed")
    .then(res => res.json())
    .then(showSingleBook)
}

function showSingleBook(book) {
  console.log(book);
  //console.log(book._embedded['wp:featuredmedia'][0].source_url);
  document.querySelector('article h1').textContent = book.title.rendered;
  document.querySelector('img').src = book._embedded['wp:featuredmedia'][0].source_url;
}


function handleData(myData) { //will automatically receive the JSON data
  //preloader.hide();
  //console.log(myData);
  //1. loop
  myData.forEach(showPost);
}

function showPost(post) {
  console.log(post);
  //console.log("HEY");
  //console.log(post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url);

  //debugger;
  //console.log(post);
  //2. cloning a template

  const template = document.querySelector('template').content;
  const postCopy = template.cloneNode(true);
  //3. textconten ansd innerHTML
  const h1 = postCopy.querySelector("h1");
  const content = postCopy.querySelector(".content");

  if (post._embedded["wp:featuredmedia"]) {
    const img = postCopy.querySelector(".featured-img");
    const imgSRC = post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;

    img.setAttribute('src', imgSRC);
    img.setAttribute('alt', 'cover of the book ' + post.title.rendered);
  } else {

  }
  // console.log(imgSRC)

  const a = postCopy.querySelector('a');
  a.href = "sub.html?id=" + post.id;

  h1.textContent = post.title.rendered; //textContent
  content.innerHTML = post.content.rendered;
  //first from Jonas feed content.innerHTML = post.content.rendered; //careful. Do we trust whoever wrote the blogpost. If people could comment

  document.querySelector('#posts').appendChild(postCopy);

  //content.innerHTML =


  //4. append
  document.querySelector('#posts').appendChild(postCopy);
}
