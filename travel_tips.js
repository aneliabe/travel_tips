const btnSearch = document.getElementById("btnSearch");
const inputField = document.getElementById("keywordInput");
const resultDiv = document.getElementById("result");


// CREATE CARD
function createCard(name, imageUrl, description) {
	return `
			<div class="card">
					<div class="card-image">
							<img src="${imageUrl}" alt="${name}">
					</div>
					<div class="card-body">
							<h3>${name}</h3>
							<p>${description}</p>
					</div>
			</div>
	`;
}


function keywordSearch() {

  const input = inputField.value.trim().toLowerCase();
  resultDiv.innerHTML = "";

  const displayed = new Set();

  fetch("travel_tips_api.json")
    .then(response => response.json())
    .then(data => {

      let resultsFound = false;

      // SEARCH COUNTRIES
      data.countries.forEach(country => {

        if (country.name.toLowerCase().includes(input)) {

          country.cities.forEach(city => {

            if (!displayed.has(city.name)) {

              resultDiv.innerHTML += createCard(
                city.name,
                city.imageUrl,
                city.description
              );

              displayed.add(city.name);
              resultsFound = true;
            }

          });
        }

        // SEARCH CITY NAME
        country.cities.forEach(city => {

          if (
            city.name.toLowerCase().includes(input) &&
            !displayed.has(city.name)
          ) {

            resultDiv.innerHTML += createCard(
              city.name,
              city.imageUrl,
              city.description
            );

            displayed.add(city.name);
            resultsFound = true;
          }

        });

      });


      // SEARCH TEMPLES
      data.temples.forEach(temple => {

        if (
          temple.name.toLowerCase().includes(input) &&
          !displayed.has(temple.name)
        ) {

          resultDiv.innerHTML += createCard(
            temple.name,
            temple.imageUrl,
            temple.description
          );

          displayed.add(temple.name);
          resultsFound = true;
        }

      });


      // SEARCH BEACHES
      data.beaches.forEach(beach => {

        if (
          beach.name.toLowerCase().includes(input) &&
          !displayed.has(beach.name)
        ) {

          resultDiv.innerHTML += createCard(
            beach.name,
            beach.imageUrl,
            beach.description
          );

          displayed.add(beach.name);
          resultsFound = true;
        }

      });


      if (!resultsFound) {
        resultDiv.innerHTML = "<p>No destinations found.</p>";
      }

    });
}

// CLEAR SEARCH
function clearSearch() {
  inputField.value = "";
  resultDiv.innerHTML = "";
}


// BUTTON CLICK
btnSearch.addEventListener("click", keywordSearch);


// ENTER KEY SEARCH
inputField.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    keywordSearch();
  }
});
