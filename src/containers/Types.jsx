import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { uniqueId, isEmpty } from "lodash";
import AppLoader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: grid;
  grid-template-rows: 1fr 6fr 1fr;
  grid-template-areas: "header header header" "content content content" "footer footer footer";
  background: #e2e1e0;
  main {
    grid-area: content;
    width: 90%;
    margin: 0 auto;
    color: #000;
  }
  .types-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .types {
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
  .types:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);  
  }
`;


const Types = (props) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemon = async (url) => {
      const res = await fetch(url);
      const response = await res.json();

      setTypes(response);
    };

    const type = props.match.params.type;
    fetchPokemon(
      `https://pokeapi.co/api/v2/type/${type}`,
    );
  }, [props.match.params.type]);

  if (isEmpty(types))
    return (
      <AppLoader/>
    );

  return (
    <Wrapper>
      <Header>Types</Header>
      <main>
        <section className="types-container">
         {types.pokemon.map(type=>(
             <div key={uniqueId()} className="types">
                 {type.pokemon.name}
             </div>
         ))}
        </section>
      </main>
      <Footer/>
    </Wrapper>
  );
};

export default Types;
