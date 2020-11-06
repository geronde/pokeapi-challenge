import faker from 'faker';

export const generateTestPokemons = (n = 15, isType) => {
  const pokemons = [];

  for (let i = 0; i < n; i++) {
    let poke = { name: faker.random.word(), url: `fake-url/${i}/` };
    if (isType) {
      poke = { pokemon: { ...poke } };
    }
    pokemons.push(poke);
  }
  return pokemons;
};
