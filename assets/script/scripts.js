function displayNotFoundMessage() {
    const messageElement = document.createElement("p");
    messageElement.textContent = "Only Treecko and its Evolutions can be found; use the dropdown for a better experience";

    const container = document.querySelector(".not-found");

    container.appendChild(messageElement);

    const removeMessage = function () {
        container.removeChild(messageElement);
    };

    const timeoutId = setTimeout(removeMessage, 1000);


    const pokemonDropdown = document.querySelector("#pokemonDropdown");
    pokemonDropdown.addEventListener("click", function () {
        clearTimeout(timeoutId);
        removeMessage();
    });


    const searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener("input", function () {
        clearTimeout(timeoutId);
        removeMessage();
    });
}




function searchPokemon(event) {
    event.preventDefault();

    const searchInput = document.getElementById("searchInput");
    const inputValue = searchInput.value.trim().toLowerCase();

    if (inputValue === "treecko") {
        fetchPokemon(pokemonUrls[0]);
    } else if (inputValue === "grovyle") {
        fetchPokemon(pokemonUrls[1]);
    } else if (inputValue === "sceptile") {
        fetchPokemon(pokemonUrls[2]);
    } else {
        displayNotFoundMessage();
    }
}


function capitalizeWords(str) {
    return str.split(' ').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

const pokemonDropdown = document.getElementById("pokemonDropdown");
const pokemonUrls = [
    "https://pokeapi.co/api/v2/pokemon/252",
    "https://pokeapi.co/api/v2/pokemon/253",
    "https://pokeapi.co/api/v2/pokemon/254"
];

const initialOption = document.createElement("option");
initialOption.value = "-";
initialOption.textContent = "-";
initialOption.selected = true;
pokemonDropdown.appendChild(initialOption);

pokemonUrls.forEach(function (url) {
    fetch(url)
        .then(function (response) {
            if (response.status != 200) {
                console.log("Ooops.." + response.status);
                return;
            }
            response.json().then(function (pokemon) {
                const capitalizedPokemonName = capitalizeWords(pokemon.name);
                const option = document.createElement("option");
                option.value = url;
                option.textContent = capitalizedPokemonName;
                pokemonDropdown.appendChild(option);
            });
        })
        .catch(function (err) {
            console.error(err);
        });
});

pokemonDropdown.addEventListener("change", function () {
    const selectedPokemonUrl = pokemonDropdown.value;
    if (selectedPokemonUrl !== "-") {
        fetchPokemon(selectedPokemonUrl);
    }
});

function fetchPokemon(url) {
    fetch(url)
        .then(function (response) {
            if (response.status != 200) {
                console.log("Ooops.." + response.status);
                return;
            }
            response.json().then(function (pokemon) {
                displayPokemon(pokemon);
            });
        })
        .catch(function (err) {
            console.error(err);
        });
}

function displayPokemon(pokemon) {
    const capitalizedPokemonName = capitalizeWords(pokemon.name);
    document.querySelector(".pokemon-name").textContent = capitalizedPokemonName;
    document.querySelector(".pokemon-image").src = pokemon.sprites.front_default;

    const movesContainer = document.getElementById("moves");
    movesContainer.innerHTML = "<p>Moves</p>";
    for (let i = 0; i < 4; i++) {
        movesContainer.innerHTML += `<p>${capitalizeWords(pokemon.moves[i].move.name)}</p>`;
    }
    document.getElementById("height").textContent = `Height: ${pokemon.height}`;
    document.getElementById("weight").textContent = `Weight: ${pokemon.weight}`;


}
