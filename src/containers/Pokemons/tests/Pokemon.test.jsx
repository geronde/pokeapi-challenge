import React from 'react';
import { act, screen, cleanup } from '@testing-library/react'

import { render } from '../../../test-helper';

import Pokemon from '../Pokemon';
import * as utils from '../utils'

afterEach(cleanup);

describe('Pokemon', () => {
    let pokemon
    beforeEach(() => {
        pokemon = jest.fn(() => Promise.resolve({ name: 'pokemon-name', sprites: {front_default: 'fake-img.png'}, types: [{ type: {name: 'type-1', url: 'fake-url/3/'}}, { type: {name: 'type-2', url: 'fake-url/4/'}}], abilities: [{slot: '1', ability: {name: 'abilit-1', url: 'fake-url/8'}}, {slot: '15',ability: {name: 'abilit-2', url: 'fake-url/78'}}]}));

        jest.spyOn(utils, 'formatEvolutions').mockReturnValue([{species_name: 'Specie-1'}, {species_name: 'Specie-2'},{species_name: 'Specie-3'}])
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.resetAllMocks();
    });

it('should render a loader if pokemon is empty', async () => {
    jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: jest.fn(() => Promise.resolve([])) });
    await act(async () => {
        const type = {params: {type: '2'}}
        const { asFragment } = render(<Pokemon match={type} />)
        expect(asFragment()).toMatchSnapshot();
    })
    });

    it('should call fetch on page load and display pokemon infromation', async () => {
        jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: pokemon }).mockReturnValue({json: jest.fn(()=> Promise.resolve(['evolutions']))});
        await act(async () => {
            const id = {params: {id: '4'}}
            render(<Pokemon match={id} />)
        })  
        expect(window.fetch).toHaveBeenCalledTimes(2)
        expect(screen.getAllByText('pokemon-name')[0]).toBeInTheDocument()
        expect(utils.formatEvolutions).toHaveBeenCalledTimes(1)
        expect(screen.getAllByRole('article')[1]).toMatchSnapshot();
    });
})