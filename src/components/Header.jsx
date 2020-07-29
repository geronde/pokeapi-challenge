import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.header`
grid-area: header;
height: 180px;
padding: 20px;
font-size: 30px;
font-weight: bold;
margin-bottom: 20px;
background-color: #0E1111;
color: #eee;
display: flex;
align-items: center;
justify-content: center;
`

const Header = (props) => {
    return <Wrapper>{props.children}</Wrapper>

}

export default Header;