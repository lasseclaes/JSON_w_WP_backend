/*const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");
console.log(query);

const name = urlParams.get("name");
const hobby = urlParams.get("hobby");


//http://127.0.0.1:64788/sub.html?name=jonas&hobby=JS
console.log("name " + name);
console.log("hobby " + hobby);*/


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

fetch('https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book/' + id + '?_embed').then(res => res.json()).then(showBook);

function showBook(book) {
  console.log(book);
  //console.log(book._embedded['wp:featuredmedia'][0].source_url);
  document.querySelector('article h1').textContent = book.title.rendered;
  document.querySelector('img').src = book._embedded['wp:featuredmedia'][0].source_url;
}

//1. do the fetch with a hardcoded id
//2. fix the fetch with a dynamic id
//3. add the book title to the qs('article h1')
//4. add ?_embed to fetch URL - show JSON object.
//  fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book?_embed")
//5. console.log through JSON object to find URL for featured image
//6. set the img src to this URL - qs('img').src = [path from console]
