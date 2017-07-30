import styled from 'styled-components'

export const IconWrapper = styled.span`
    padding: 0 10px;
    svg {
        &[disabled] {
            color: grey;
    }
}
`

export const PlayerWrapper = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    minHeight: 100px;
`