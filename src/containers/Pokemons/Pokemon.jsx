import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { uniqueId, isEmpty, get } from "lodash";
import { Link } from "react-router-dom";

import AppLoader from "../../components/Loader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getIdFromUrl } from "./utils";

import { LocaleContext } from '../LocaleProvider/index'
import messages from './messages';


const Wrapper = styled.div`
  width: 100%;
  min-height: 50vh;
  position: relative;
  display: grid;
  grid-template-rows: 1fr 6fr 1fr;
  grid-template-areas: "header header header" "content content content" "footer footer footer";
  background: #e2e1e0;
  main {
    grid-area: content;
    display: flex;
    flex-direction: column;
    width: 55%;
    margin: 30px auto;
    color: #000;
  }
  .pokemon-detail {
    padding: 20px;
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  img {
    width: 150px;
  }
  .detail {
    padding: 20px;
    background-color: #eee;
    width: 70%;
    display: column;
  }
  .name {
    font-size: 18px;
    font-family: Roboto;
    font-weight: bold;
    text-transform: uppercase;
  }
  .type,
  .abilities,
  .evolution {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .type div,
  .abilities div,
  .evolution div {
    margin-left: -35px;
  }
`;


const Pokemon = (props) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const fetchPokemon = async (url, evolutionUrl) => {
      const res = await fetch(url);
      const evol = await fetch(evolutionUrl);
      const evolutionResponse = await evol.json();
      const response = await res.json();

      setPokemon({ ...response, ...evolutionResponse });
    };

    const id = props.match.params.id;
    fetchPokemon(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
      `https://pokeapi.co/api/v2/evolution-chain/${id}/`
    );
  }, [props.match.params.id]);

  const formatttedEvoltions = () => {
    let evoChain = [];
    let evoData = pokemon.chain;

    do {
      let numberOfEvolutions = evoData.evolves_to.length;

      evoChain.push({
        species_name: get(evoData, "species.name"),
      });

      if (numberOfEvolutions > 1) {
        for (let i = 1; i < numberOfEvolutions; i++) {
          evoChain.push({
            species_name: get(evoData.evolves_to[i], "species.name"),
          });
        }
      }

      evoData = evoData.evolves_to[0];
    } while (evoData !== undefined && evoData.hasOwnProperty("evolves_to"));

    return evoChain;
  };

  const {translate} = useContext(LocaleContext);


  if (isEmpty(pokemon)) return <AppLoader/>

  return (
    <Wrapper>
      <Header>{pokemon.name}</Header>
      <main>
        <section className="pokemon-detail">
          <article className="img">
            <img alt={pokemon.name} src={pokemon.sprites.front_default} />
          </article>
          <article className="detail">
            <div className="name">{pokemon.name}</div>
            <ul className="type">
  <div>{translate(messages.types)}</div>
              {pokemon.types.map((type) => (
                <Link to={`/types/${getIdFromUrl(type.type.url)}`}><li key={uniqueId(`${pokemon.name}`)}>{type.type.name}</li></Link>
              ))}
            </ul>
            <ul className="abilities">
              <div>{translate(messages.abilities)}</div>
              {pokemon.abilities.map((ab) => (
                <li key={ab.slot}>{ab.ability.name}</li>
              ))}
            </ul>
            <ul className="evolution">
              <div>{translate(messages.evolutions)}</div>
              {formatttedEvoltions().map((evo) => (
                <li key={uniqueId()}>{evo.species_name}</li>
              ))}
            </ul>
          </article>
        </section>
      </main>
      <Footer/>
    </Wrapper>
  );
};

export default Pokemon;
