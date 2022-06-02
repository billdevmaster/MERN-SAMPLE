import Styled from 'styled-components';

const HireStyle = Styled.div`
    > div {
        min-height: 80vh;
        background-size: cover;
        padding: 50px 0;
        @media(max-width: 768px) {
            padding: 20px 0;
            .buy {
                .btn {
                    margin-top: 20px;
                }
            }
        }
    }
`;

const MintingStyle = Styled.div`
    .sr-only {
        border: 0;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }
`

export {
    HireStyle,
    MintingStyle
};