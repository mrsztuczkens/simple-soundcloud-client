import styled from 'styled-components';

export const Wrapper = styled.div`
position: relative;
overflow: visible;
color: white;
display: flex;
`;

export const QueueWrapper = styled.div`
position: absolute;
top: 100%;
width: 100%;
margin-top: 15px;
padding: 5px 10px;
background-color: #222;
z-index: 10;
`;

export const QueueList = styled.ul`
list-style: none;
padding: 0;
margin: 0;

li {
    display: block;
    padding: 8px 10px;
    cursor: move;
}
`;

export const NextTrackWrapper = styled.div`
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
flex: 1;
`;