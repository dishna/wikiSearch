function handleSubmit(event) {
  // prevent page from reloading when form is submitted
  event.preventDefault();
  const input = document.querySelector(".searchForm-input").value;
  const searchQuery = input.trim();
  let message = document.querySelector(".message");
  message.innerHTML = "";
  if(searchQuery === "")
  {
      const searchResults = document.querySelector(".searchResults");
      searchResults.innerHTML = "";
      message.innerHTML = "Error - please enter search text";
  }
  else
  {
      fetchResults(searchQuery);
  }
}

function fetchResults(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
  fetch(endpoint)
    .then(response => response.json())
    .then(({ query }) => {
      const results = query.search;
      console.log("got data");
      displayResults(results);
    })
    .catch(function(error){
      console.log("error");
    }
    );

}

function dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    /* next line works with strings and numbers */
    
    let result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function displayResults(results) {
  const searchResults = document.querySelector(".searchResults");
  searchResults.innerHTML = "";
  results.sort(dynamicSort("title"));

  // Loop over results array
  results.forEach(({ title, snippet }) => {
    const url = encodeURI(`https://en.wikipedia.org/wiki/${title}`);

    searchResults.insertAdjacentHTML(
      "beforeend",
      `<div class="resultItem">
          <h3 class="resultItem-title">
            <a href="${url}" target="_blank" rel="noopener">${title}</a>
          </h3>
          <span class="resultItem-snippet">${snippet}</span><br>
          <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
        </div>`
    );
  });
}



const form = document.querySelector(".searchForm");

form.addEventListener("submit", handleSubmit);

