//window.addEventListener("load") //load the content when everythin has loaded img, css etc
window.addEventListener("DOMContentLoaded", getData); //HTML loaded

function getData() {
  //console.log('hey');
  //preloader.setup();
  // fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/posts?per_page=2&page=2")
  //fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/posts?search=consectetur")
  //fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/posts?_embed&search=consectetur")
  fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book?_embed")
    //fetch("https://lasseclaes.com/wp19_10/wp-json/wp/v2/film")

    //fetch('https://pjmelite.dk/wp_mytest/wordpress/wp-json/wp/v2/posts?_embed')
    .then(res => res.json())
    .then(handleData)
} //asyncronous has to use the server in London

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
