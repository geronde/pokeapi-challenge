import { get } from 'lodash';

export const paginate = (
  totalItems,
  currentPage = 1,
  pageSize = 20,
) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage;
  let endPage;
  startPage = 1;
  endPage = totalPages;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(
    startIndex + pageSize - 1,
    totalItems - 1,
  );

  return {
    totalItems,
    currentPage,
    pageSize,
    totalOfPages: totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
  };
};

export const getIdFromUrl = (url) => url.split('/').slice(-2)[0];

export const formatEvolutions = (pokemon) => {
  const evoChain = [];
  let evoData = pokemon.chain;

  do {
    const numberOfEvolutions = evoData.evolves_to.length;

    evoChain.push({
      species_name: get(evoData, 'species.name'),
    });

    if (numberOfEvolutions > 1) {
      for (let i = 1; i < numberOfEvolutions; i++) {
        evoChain.push({
          species_name: get(evoData.evolves_to[i], 'species.name'),
        });
      }
    }

    evoData = evoData.evolves_to[0];
  } while (
    evoData !== undefined &&
    evoData.hasOwnProperty('evolves_to')
  );

  return evoChain;
};
