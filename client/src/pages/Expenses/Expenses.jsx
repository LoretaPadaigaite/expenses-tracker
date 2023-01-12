import { useContext, useEffect, useState } from "react"
import styled from "styled-components";
import { Form } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import { Input } from "../../Components/Input/Input";
import { UserContext } from "../../Contexts/UserContextWraper";

const ExpensesList = styled.ul `
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
`;

const ExpensesListItem = styled.li `
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%); 
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;    
`;

const ExpensesAmount = styled.span`
    color: #35d8ac;
    font-size: 34px;
    font-weight: 700;
`;
const ExpensesType = styled.span`
    color: #979cb0;
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;


export const Expenses = () => {

const [expenses, setExpenses] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [type, setType] = useState('');
const [amount, setAmount] = useState('');
const {user} = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/expenses?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
            setExpenses(data);
            setIsLoading(false);
        });
    }, [user.id])

    if (isLoading) {
        return <div>Loading...</div>
    }

const handleExpenseAdd = () => {
    fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type,
            amount,
            userId: user.id
        })
    })
    .then((res) => res.json())
    .then((data) => {
        setExpenses(data);
        setType('');
        setAmount('');
    });
}

const totalSum = expenses.reduce((totalSum, expense) => totalSum += parseInt(expense.amount), 0);

    return (
    <ExpensesList>

        <Form onSubmit={handleExpenseAdd}>

            <Input 
                type="text" 
                placeholder="Type" 
                required 
                onChange={(e) => setType(e.target.value)}
                value={type}
                />
            <Input 
                type='number' 
                placeholder="Amount" 
                required
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                />
            <Button>Add</Button>

        </Form>

        <h2>
            Total spent: {totalSum} €
        </h2>
        {expenses.map((exp) => (
            <ExpensesListItem key={exp.id}>
                <ExpensesType>{exp.type}</ExpensesType>
                <ExpensesAmount>{exp.amount} €</ExpensesAmount>
            </ExpensesListItem>
        ))}
        </ExpensesList>
    );
}