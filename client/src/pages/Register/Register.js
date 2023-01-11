import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../../Components/Button/Button";
import { Input } from "../../Components/Input/Input";
import { Form } from "../../Components/Form/Form";


const RegisterContainer = styled.div`
    align-items: center;
    background-color: lightgrey;
    display: flex; 
    justify-content: center;
    height: 100vh;
`;

const LinkStyled = styled(Link)`
    align-self: center;
`;

const FormStyled = styled(Form)`
    max-width: 100%;
    padding: 20px;
    width: 400px;
`;

export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = () => {
        setIsLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                password
            })
        })
       .then((res) => {
            if (res.status === 400) {
                throw new Error('User already exists');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
        })
        .then((data) => {
           navigate('/login')
        })
        .catch((e) => {
            console.log(e);
        });
    }

     return (
        <RegisterContainer>
            <FormStyled onSubmit={handleRegister} disabled={isLoading} column>

                <h1>Register</h1>

                <Input
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                />
                <Input
                placeholder='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />

                {error && <div>{error}</div>}

                <Button>Register</Button>

                <LinkStyled to='/login'>Login</LinkStyled>

             </FormStyled>

         </RegisterContainer>
    );
}
