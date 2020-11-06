import { formatEvolutions, getIdFromUrl, paginate } from '../utils';

describe('getIdFromUrl', () => {
  it('should split by / and return second last index', () => {
    expect(getIdFromUrl('/pokemons/4/pikatchu')).toEqual('4');
  });
});

describe('paginate', () => {
  it('should paginate details', () => {
    const totalItems = 60;
    const currentPage = 1;
    const pageSize = 10;
    expect(paginate(totalItems, currentPage, pageSize)).toEqual({
      currentPage: 1,
      endIndex: 9,
      endPage: 6,
      pageSize: 10,
      startIndex: 0,
      startPage: 1,
      totalItems: 60,
      totalOfPages: 6,
    });
  });

  it('should paginate details for currentPage < 0 ', () => {
    const totalItems = 60;
    const currentPage = -1;
    const pageSize = 10;
    expect(paginate(totalItems, currentPage, pageSize)).toEqual({
      currentPage: 1,
      endIndex: 9,
      endPage: 6,
      pageSize: 10,
      startIndex: 0,
      startPage: 1,
      totalItems: 60,
      totalOfPages: 6,
    });
  });

  it('should paginate details for currentPage > totalpages ', () => {
    const totalItems = 60;
    const currentPage = 8;
    const pageSize = 10;
    expect(paginate(totalItems, currentPage, pageSize)).toEqual({
      currentPage: 6,
      endIndex: 59,
      endPage: 6,
      pageSize: 10,
      startIndex: 50,
      startPage: 1,
      totalItems: 60,
      totalOfPages: 6,
    });
  });
});

describe('formatEvolutions', () => {
  const pokemon = {
    baby_trigger_item: null,
    chain: {
      evolution_details: [],
      evolves_to: [
        {
          evolves_to: [
            {
              evolves_to: [],
              species: {
                name: 'venusaur',
                url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
              },
            },
          ],
          species: {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
          },
        },
        {
          evolves_to: [
            {
              evolves_to: [],
              species: {
                name: 'venusaur',
                url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
              },
            },
          ],
          species: {
            name: 'saur',
            url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
          },
        },
      ],
      species: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
      },
    },
    id: 1,
  };
  expect(formatEvolutions(pokemon)).toEqual([
    {
      species_name: 'bulbasaur',
    },
    {
      species_name: 'saur',
    },
    {
      species_name: 'ivysaur',
    },
    {
      species_name: 'venusaur',
    },
  ]);
});
