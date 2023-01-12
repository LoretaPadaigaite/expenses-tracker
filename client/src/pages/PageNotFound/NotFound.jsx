import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundStyled = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
`;

export const NotFound= () =>{
    <NotFoundStyled>
        <h1>404 Error</h1>
        <h1>Page Not Found</h1>
        <Link to="/">Go to Home page</Link>
    </NotFoundStyled>
}
  
export default NotFound;
