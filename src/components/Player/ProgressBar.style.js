import styled from 'styled-components';

export const ProgressBarWrapper = styled.div`
    height: 80px;
    position: relative;
`

export const WaveBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
    height: 80px;
    transition: width 0.25s linear;
`

//todo width po propsie