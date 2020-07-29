import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.footer`
    grid-area: footer;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Footer = (props) => {
    return <Wrapper>This application was made for a challenge</Wrapper>

}

export default Footer;