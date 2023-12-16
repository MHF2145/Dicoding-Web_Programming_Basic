const pokemonDropdown = document.getElementById("pokemonDropdown");

pokemonDropdown.innerHTML = "";

const pokemonNames = ["Treecko", "Grovyle", "Sceptile"];

pokemonNames.forEach(function (name) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    pokemonDropdown.appendChild(option);
});

pokemonDropdown.addEventListener("change", function () {
    const selectedPokemonName = pokemonDropdown.value;
    if (selectedPokemonName) {
        displayPokemon(selectedPokemonName);
    }
});

function displayPokemon(selectedPokemonName) {
    const capitalizedPokemonName = capitalizeWords(selectedPokemonName);
    document.querySelector(".pokemon-name").textContent = capitalizedPokemonName;

    const pokemonImage = document.querySelector(".pokemon-image");
    const pokemonDetailsContainer = document.querySelector(".pokemon-details");

    pokemonImage.src = `assets/img/${capitalizedPokemonName}.png`;

    pokemonDetailsContainer.innerHTML = '';

    const pokemonDetailsImage = document.createElement("img");
    pokemonDetailsImage.src = `assets/img/${capitalizedPokemonName}-details.png`;
    pokemonDetailsImage.alt = capitalizedPokemonName;

    pokemonDetailsContainer.appendChild(pokemonDetailsImage);

    document.querySelector(".pokemon-details").style.display = "block";
}

function capitalizeWords(str) {
    return str.split(' ').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}