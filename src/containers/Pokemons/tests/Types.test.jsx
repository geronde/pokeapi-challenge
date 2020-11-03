import React from 'react';
import { act, screen, cleanup } from '@testing-library/react'

import { render } from '../../../test-helper';
import { generateTestPokemons } from '../../../test-helper/bootstraper';

import Types from '../Types';

afterEach(cleanup);

describe('Types', () => {
    let pokemonsByType
    beforeEach(() => {
        pokemonsByType = jest.fn(() => Promise.resolve({ pokemon: generateTestPokemons(40, true) }));
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.resetAllMocks();
    });

it('should render a loader if types are empty', async () => {
    jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: jest.fn(() => Promise.resolve([])) });
    await act(async () => {
        const type = {params: {type: '2'}}
        const { asFragment } = render(<Types match={type} />)
        expect(asFragment()).toMatchSnapshot();
    })
    });
    it('should call fetch on page load', async () => {
        jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: pokemonsByType });
        await act(async () => {
            const type = {params: {type: '2'}}
            render(<Types match={type} />)
        })  
        expect(window.fetch).toHaveBeenCalledTimes(1)
        expect(window.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/2')
        expect(screen.getByText('Types')).toBeInTheDocument()
    });
})