import styled from "styled-components";

export const StyledNum = styled.div`

@media (min-width: 1230px) {
    font-size: 30px;
    letter-spacing: 0.00938em;
    margin-bottom: 0.35em;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.5;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    margin: 0;
    font-weight: bold;
  }
@media (max-width: 1230px) {
    font-size: 25px;
    letter-spacing: 0.00938em;
    margin-bottom: 0.35em;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.5;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    margin: 0;
    font-weight: bold;
  }
  @media (max-width: 1000px) {
    font-size: 20px;
    letter-spacing: 0.00938em;
    margin-bottom: 0.35em;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.5;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    margin: 0;
  }
  @media (max-width: 860px) {
    font-size: 18px;
    letter-spacing: 0.00938em;
    margin-bottom: 0.35em;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.5;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    margin: 0;
  }
  
`;

export const StyledMap = styled.div`
    position: relative;
    width: 100%;
    height: 20rem;

  @media (max-width: 600px) {
    height: 15rem;
    width: 100%;
    position: relative;
  }
`;

export const StyledBox = styled.div`
    display: flex;
    align-items: center;
`;
