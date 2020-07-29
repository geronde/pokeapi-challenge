import React from 'react'
import styled from "styled-components";
import Loader from 'react-loader-spinner'

const GlobalLoader = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const AppLoader = () => {
    return (<GlobalLoader><Loader
        type="Puff"
        color="#0E1111"
        height={100}
        width={100}
        timeout={10000}/>
        </GlobalLoader>)
}

export default AppLoader;