import { useEffect, useState } from "react"
import styled from "styled-components";
import { LOGGED_IN_USER } from "../../constants/constants";

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

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/expenses?userId=${LOGGED_IN_USER.id}`)
        .then(res => res.json())
        .then(data => {
            setExpenses(data);
            setIsLoading(false);
        });
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

const handleExpenseAdd = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type,
            amount,
            userId: 1
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

        <form onSubmit={handleExpenseAdd}>
            <input 
                type="text" 
                placeholder="Type" 
                required 
                onChange={(e) => setType(e.target.value)}
                value={type}
                />
            <input 
                type='number' 
                placeholder="Amount" 
                required
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                />
            <button>Add</button>
        </form>

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