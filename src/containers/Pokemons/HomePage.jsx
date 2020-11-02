import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { uniqueId, isEmpty } from "lodash";
import { Link } from "react-router-dom";


import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AppLoader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import { LocaleContext } from '../LocaleProvider/index'


import { paginate, getIdFromUrl } from "./utils";
import messages from './messages';


const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: grid;
  grid-template-rows: 1.25fr 6fr 1fr;
  grid-template-areas: "header header header" "content content content" "footer footer footer";
  background: #e2e1e0;
  section {
    grid-area: content;
    display: flex;
    flex-direction: column;
    width: 75%;
    margin: 0 auto;
    color: #000;
  }
  .pokemons-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items:center;
    width: 90%;
    margin: 0 auto;
  }
  .listing-container {
    width: 95%;
    margin: 0 auto;
  }
  .pokemon {
    padding: 10px;
    margin: 15px;
    width: 150px;
    height: 100px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    background: #fff;
    display: flex;
    font-size: 20px;
    align-items: center;
    justify-content: center;
  }
  .pokemon:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);  
  }
  .filter{
      padding: 20px;
      width: 50%;
  }
  .filter select {
      width: 150px;
      height: 30px;
  }
`;


export const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationAPI, setPaginationAPI] = useState({ totalItems: 0, next: null, previous: null, pageSize: 20 });
  const [pagination, setPagination] = useState({})
  const [isFilter, setIsFilter] = useState(false);


  const { translate } = useContext(LocaleContext);
  const defaultSelectValue = translate(messages.selectPlaceholder)
  const [selectedType, setSelectedType] = useState(defaultSelectValue)

  const fetchPokemons = async (url) => {
    const res = await fetch(
      url
    );
    const response = await res.json();
    setPokemons(response.results);
    setPaginationAPI({ ...paginationAPI, totalItems: response.count, previous: response.previous, next: response.next })
  };


  useEffect(() => {
    setPagination(paginate(paginationAPI.totalItems, currentPage, paginationAPI.pageSize))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, paginationAPI.totalItems])


  const fetchTypes = async (url) => {
    const res = await fetch(
      url
    );
    const response = await res.json();
    setTypes(response.results)
  };


  useEffect(() => {
    fetchPokemons('https://pokeapi.co/api/v2/pokemon');
    fetchTypes('https://pokeapi.co/api/v2/type')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const nextPage = () => {
    const activePage = currentPage + 1;
    setCurrentPage(activePage)
    noFilterFetch(paginationAPI.next)
  }

  const previousPage = () => {
    const activePage = currentPage - 1;
    setCurrentPage(activePage)
    noFilterFetch(paginationAPI.previous)
  }

  const noFilterFetch = (url) => {
    if (!isFilter) {
      fetchPokemons(url)
    }
  }

  const filterByType = async (event) => {
    const selectedOption = event.target[event.target.selectedIndex]
    setSelectedType(selectedOption.value)
    setIsFilter(true);

    const res = await fetch(selectedOption.value);
    const response = await res.json();
    const pokemons = response.pokemon.map((poke) => poke.pokemon)
    setPokemons(pokemons)
    setCurrentPage(1)
    setPaginationAPI({ ...paginationAPI, totalItems: response.pokemon.length })
  }

  const formatPokemonsByFilter = () => {
    if(!isFilter) return pokemons

    return pokemons.slice(pagination.startIndex, pagination.endIndex)
  }

  if (isEmpty(pokemons) && !isFilter) return <AppLoader />
  return (
    <Wrapper>
      <Header>{translate(messages.appTitle)}</Header>
      <section>
        <article className="filter">
          <select value={selectedType} onChange={filterByType}>
            <option disabled>{defaultSelectValue}</option>
            {types.map((type) => <option name={type.name} key={uniqueId(`${type.name}`)} value={type.url}>{type.name}</option>)}
          </select>
        </article>
        <article className="listing-container">
          <div className="pokemons-container">
            {formatPokemonsByFilter().map((pokemon) => (
              <Link to={`/pokemon/${getIdFromUrl(pokemon.url)}`} key={uniqueId()}><div data-testid="single-pokemon" className="pokemon">
                {pokemon.name}
              </div>
              </Link>
            ))}
          </div>
          {isEmpty(pokemons) && isFilter && <div>{translate(messages.noResult)}</div>}
        </article>
        {!isEmpty(pokemons) && <Pagination details={{ ...paginationAPI, currentPage, isFilter, startIndex: pagination.startIndex, endIndex: pagination.endIndex }} nextPage={nextPage} previousPage={previousPage} />}
      </section>
      <Footer />
    </Wrapper>
  );
};

export default HomePage;