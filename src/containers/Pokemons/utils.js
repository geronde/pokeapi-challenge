import { get } from 'lodash';

export const paginate = (
  totalItems,
  currentPage = 1,
  pageSize = 20,
) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  let cp = 1;

  if (currentPage < 1) {
    cp = 1;
  } else if (currentPage > totalPages) {
    cp = totalPages;
  }

  const startPage = 1;
  const endPage = totalPages;

  const startIndex = (cp - 1) * pageSize;
  const endIndex = Math.min(
    startIndex + pageSize - 1,
    totalItems - 1,
  );

  return {
    totalItems,
    currentPage: cp,
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
      for (let index = 1; index < numberOfEvolutions; index += 1) {
        evoChain.push({
          species_name: get(
            evoData.evolves_to[Number.parseInt(index, 10)],
            'species.name',
          ),
        });
      }
    }

    evoData = { ...evoData.evolves_to[0] };
  } while (evoData !== undefined && 'evolves_to' in evoData);

  return evoChain;
};
