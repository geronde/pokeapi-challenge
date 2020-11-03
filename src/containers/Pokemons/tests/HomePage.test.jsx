import React from 'react';
import { act, fireEvent, waitFor, screen, cleanup } from '@testing-library/react'

import { render } from '../../../test-helper';
import { generateTestPokemons } from '../../../test-helper/bootstraper';

import HomePage from '../HomePage';

afterEach(cleanup);

describe('HomePage', () => {
    let pokemonResponse;
    let typeResponse;
    let pokemonsByType
    beforeEach(() => {
        pokemonResponse = jest.fn(() => Promise.resolve({ count: 200, previous: '/digi/78', next: '/pika/30/', results: generateTestPokemons(20) }));

        typeResponse = jest.fn(() => Promise.resolve({ results: generateTestPokemons(30) }));

        pokemonsByType = jest.fn(() => Promise.resolve({ pokemon: generateTestPokemons(40, true) }));
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.resetAllMocks();
    });

    it('should render a loader when pokemon state is empty', async () => {
        jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: jest.fn(() => Promise.resolve({ results: [], count: 0 })) });
        await act(async () => {
            const { asFragment } = render(<HomePage />)
            expect(asFragment()).toMatchSnapshot();
        })
    });

    it('should fetch pokemons and pokemons type on page load', async () => {
        jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: pokemonResponse }).mockReturnValue({ json: typeResponse })
        await act(async () => {
            render(<HomePage />)
        })

        expect(window.fetch).toHaveBeenCalledTimes(2);
        expect(screen.getByText("Show all pokemons")).toBeInTheDocument()
        expect(screen.getAllByTestId('single-pokemon')).toHaveLength(20)
    });

    it('should be able to select type and display pokemons by type', async () => {
        jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: pokemonResponse }).mockReturnValueOnce({ json: typeResponse }).mockReturnValue({ json: pokemonsByType })

        await act(async () => {
            render(<HomePage />)
        });

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'fake-url/3/' } })
        await waitFor(() => {
            expect(window.fetch).toHaveBeenCalledTimes(3);
        })
        expect(screen.getAllByTestId('single-pokemon')).toHaveLength(19)
    });

    it('should be able to click on nextPage and reload pokemons', async () => {
        jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: pokemonResponse }).mockReturnValueOnce({ json: typeResponse }).mockReturnValue({ json: pokemonResponse })

        await act(async () => {
            render(<HomePage />)
        });

        expect(window.fetch).toHaveBeenCalledTimes(2)

        await act(async () => {
            const nextPage = await screen.getAllByRole('button')
            fireEvent.click(nextPage[1])
        })
        expect(window.fetch).toHaveBeenCalledTimes(3)
        expect(window.fetch).toHaveBeenNthCalledWith(3, "/pika/30/")
        expect(screen.getByText("2 of 10")).toBeInTheDocument()
    });

    it('should be able to click on previous and reload pokemons', async () => {
        jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: pokemonResponse }).mockReturnValueOnce({ json: typeResponse }).mockReturnValueOnce({ json: pokemonResponse }).mockReturnValue({ json: pokemonResponse })

        await act(async () => {
            render(<HomePage />)
        });

        expect(window.fetch).toHaveBeenCalledTimes(2)

        //click on next to be able to click on previous
        await act(async () => {
            const nextPage = await screen.getAllByRole('button')
            fireEvent.click(nextPage[1])
        })
        expect(window.fetch).toHaveBeenCalledTimes(3)
        expect(window.fetch).toHaveBeenNthCalledWith(3, "/pika/30/")

        await act(async () => {
            const previousPage = await screen.getAllByRole('button')
            fireEvent.click(previousPage[0])
        })
        expect(window.fetch).toHaveBeenCalledTimes(4)
        expect(window.fetch).toHaveBeenNthCalledWith(4, "/digi/78")
        expect(screen.getByText("1 of 10")).toBeInTheDocument()
    });

    it('should be able to click on nextPage and reload pokemons when using filter', async () => {
        jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: pokemonResponse }).mockReturnValueOnce({ json: typeResponse }).mockReturnValue({ json: pokemonsByType })

        await act(async () => {
            render(<HomePage />)
        });

        expect(window.fetch).toHaveBeenCalledTimes(2);

        await act(async () => {
            const select = await screen.getByRole('combobox')
            fireEvent.change(select, {target: {value: 'fake-url/1/'}})
        });
        
        expect(window.fetch).toHaveBeenCalledTimes(3);
        expect(window.fetch).toHaveBeenNthCalledWith(3, "fake-url/1/")

        await act(async () => {
            const nextPage = await screen.getAllByRole('button')
            fireEvent.click(nextPage[1])
        })
        expect(screen.getByText("2 of 2")).toBeInTheDocument()
    });

    it('should be able to click on previous page and reload pokemons when using filter', async () => {
        jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: pokemonResponse }).mockReturnValueOnce({ json: typeResponse }).mockReturnValue({ json: pokemonsByType })

        await act(async () => {
            render(<HomePage />)
        });

        expect(window.fetch).toHaveBeenCalledTimes(2);

        await act(async () => {
            const select = screen.getByRole('combobox')
            fireEvent.change(select, { target: { value: 'fake-url/2/' } })
        });
        expect(window.fetch).toHaveBeenCalledTimes(3);

        await act(async () => {
            const nextPage = await screen.getAllByRole('button')
            fireEvent.click(nextPage[1])
        })

        await act(async () => {
            const previousPage = await screen.getAllByRole('button')
            fireEvent.click(previousPage[0])
        })

        expect(window.fetch).toHaveBeenNthCalledWith(3, "fake-url/2/")
        expect(screen.getByText("1 of 2")).toBeInTheDocument()
    });

    it('should display no result when no pokemons are return by type filter', async () => {
        const noResult = jest.fn(() => Promise.resolve({ pokemon: [] }))
        jest.spyOn(window, 'fetch').mockReturnValueOnce({ json: pokemonResponse }).mockReturnValueOnce({ json: typeResponse }).mockReturnValue({ json: noResult })

        await act(async () => {
            render(<HomePage />)
        });

        expect(window.fetch).toHaveBeenCalledTimes(2);

        await act(async () => {
            const select = screen.getByRole('combobox')
            fireEvent.change(select, { target: { value: 'fake-url/2/' } })
        });
        expect(window.fetch).toHaveBeenCalledTimes(3);
        expect(window.fetch).toHaveBeenNthCalledWith(3, "fake-url/2/")
        expect(screen.getByText('No result')).toBeInTheDocument();
    });
})