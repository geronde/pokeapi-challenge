import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { uniqueId, isEmpty } from "lodash";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppLoader from "../components/Loader";
import Pagination from "../components/Pagination";
import { paginate, getIdFromUrl } from "./utils";
import { Link } from "react-router-dom";


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
    width: 55%;
    margin: 30px auto;
    color: #000;
  }
  .pokemons-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
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


const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);

  const [pagination, setPagination] = useState({totalPokemons: null, pageSize: 20});
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false)
  const [types, setTypes] = useState([]);
  

  const fetchPokemons = async (url) => {
    const res = await fetch(
      url
    );
    const response = await res.json();
    setPokemons(response.results);
    setPagination({ totalPokemons: response.count, previous: response.previous,next: response.next})    
  };

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
  },[]);

  const filterByType = async (event) => {
    setIsFilter(true)
    const res = await fetch(
        `${event.target.value}`
      );
      const response = await res.json();
      const pokemons = response.pokemon.map((poke)=>poke.pokemon).slice(detail.startIndex, detail.endIndex)
      console.log('pokemons: ', pokemons);
      setPokemons(pokemons) 
      setPagination({...pagination, totalPokemons: pokemons.length, next: null, previous: null})
  }

  const nextPage = () => {
      const activePage = currentPage + 1;
      setCurrentPage(activePage)
      if(isFilter){
        const list = pokemons.slice(detail.startIndex, detail.endIndex)
        setPokemons(list)
      }else {
        fetchPokemons(pagination.next)
      }   
  }

  const previousPage = () => {
    const activePage = currentPage - 1;
    setCurrentPage(activePage)
    if(isFilter){
      const list = pokemons.slice(detail.startIndex, detail.endIndex)
      setPokemons(list)
    }else {
      fetchPokemons(pagination.previous)
    }
  }

const { totalPokemons, pageSize, next, previous } = pagination;
const detail = paginate(totalPokemons, currentPage, pageSize)

  if(isEmpty(pokemons) && !isFilter) return <AppLoader/>

  return (
    <Wrapper>
      <Header>Pokemon</Header>
      <section>
      <article className="filter">
        <select onChange={filterByType}>
        <option disabled selected value> -- select an option -- </option>
          {types.map((type)=><option value={type.url}>{type.name}</option> )}
        </select>
        </article>
        <article className="pokemons-container">
          {pokemons?.map((pokemon, index) => (
            <Link to={`/pokemon/${getIdFromUrl(pokemon.url)}`}><div className="pokemon" key={uniqueId()}>
              {pokemon.name}
            </div>
            </Link>
          ))}
          {isEmpty(pokemons) && isFilter && <div>No results</div>}
        </article>
        {!isEmpty(pokemons) && <Pagination details={{...detail, next, previous}} nextPage={nextPage} previousPage={previousPage} />}
      </section>
      <Footer/>
    </Wrapper>
  );
};

export default HomePage;
