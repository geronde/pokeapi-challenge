import faker from 'faker';

const { generateTestPokemons } = require('../bootstraper');

describe('generateTestPokemons', () => {
  beforeEach(() => {
    jest.spyOn(faker.random, 'word').mockReturnValue('fake-word');
  });
  it('should generate pokemons', () => {
    const pokemons = generateTestPokemons(5, false);
    expect(pokemons).toHaveLength(5);
    expect(pokemons).toEqual([
      { name: 'fake-word', url: 'fake-url/0/' },
      { name: 'fake-word', url: 'fake-url/1/' },
      { name: 'fake-word', url: 'fake-url/2/' },
      { name: 'fake-word', url: 'fake-url/3/' },
      { name: 'fake-word', url: 'fake-url/4/' },
    ]);
  });
  it('should generate pokemons for type', () => {
    const pokemons = generateTestPokemons(15, true);
    expect(pokemons).toHaveLength(15);
    expect(pokemons).toEqual([
      { pokemon: { name: 'fake-word', url: 'fake-url/0/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/1/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/2/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/3/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/4/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/5/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/6/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/7/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/8/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/9/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/10/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/11/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/12/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/13/' } },
      { pokemon: { name: 'fake-word', url: 'fake-url/14/' } },
    ]);
  });
});
