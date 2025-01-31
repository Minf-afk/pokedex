const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 352
const limit = 10
let offset = 0;
let = pokemons = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="additional-info">
                <p>Weight: ${pokemon.weight}</p>
                <p>Abilities: ${pokemon.abilities.join(', ')}</p>
                <p>Stats:</p>
                <ul>
                    ${pokemon.stats.map((stat) => `<li>${stat.name}: ${stat.base_stat}</li>`).join('')}
                </ul>
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
function filterPokemons(searchTerm) {
    const filteredPokemons = pokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) || pokemon.number.toString().includes(searchTerm);
    });
    displayPokemons(filteredPokemons);
}

searchButton.addEventListener('click', () => {
    const searchTerm = searchbox.value;
    filterPokemons(searchTerm);
});

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

// Carregar os Pokémon inicialmente
loadPokemonItens(offset, limit);