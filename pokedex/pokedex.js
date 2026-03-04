    async function searchPokemon() {
    const name = document.getElementById("pokemonInput").value.toLowerCase();
    const card = document.getElementById("pokedexCard");

    if (!name) {
        card.innerHTML = "<p>Por favor ingresá un nombre.</p>";
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!response.ok) {
            throw new Error("No encontrado");
        }

        const data = await response.json();

        const types = data.types.map(t =>
            `<span class="type-badge">${t.type.name}</span>`
        ).join("");

        card.innerHTML = `
            <h2>#${data.id} - ${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.other['official-artwork'].front_default}" />
            <p><strong>Altura:</strong> ${data.height}</p>
            <p><strong>Peso:</strong> ${data.weight}</p>
            <div>${types}</div>
        `;

    } catch (error) {
        card.innerHTML = "<p>Pokémon no encontrado 😢</p>";
    }
    }