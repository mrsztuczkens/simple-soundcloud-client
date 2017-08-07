import styled from 'styled-components'

export const SearchResultsWrapper = styled.div`
position: absolute;
top: 100%;
width: 100%;
background-color: white;
border: 1px solid black;
border-top: 0;
z-index: 10;
display: ${(props) => props.show ? 'block' : 'none'}
`

export const SearchResultsList = styled.ul`
list-style: none;
padding: 0;
margin: 0;
`

export const SearchResultsEntry = styled.li`
display: block;
padding: 8px 10px;

a {
    color: black;
    &:hover, &:active {
        text-decoration: none;
        color: grey;
    }
}
`