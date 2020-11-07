import faker from 'faker';

export const generateTestPokemons = (n = 15, isType) => {
  const pokemons = [];

  for (let index = 0; index < n; index += 1) {
    let poke = {
      name: faker.random.word(),
      url: `fake-url/${index}/`,
    };
    if (isType) {
      poke = { pokemon: { ...poke } };
    }
    pokemons.push(poke);
  }
  return pokemons;
};

export default { generateTestPokemons };
