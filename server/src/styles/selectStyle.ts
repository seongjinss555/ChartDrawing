
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 80%;
`;

export const Select = styled.select`
    margin: 10px 70px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 80%;
`;

export const ButtonContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
`

export const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    justify-content: center;
    &:hover {
        background-color: #0056b3;
    }
`;

export const ChartContainer = styled.canvas`
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 80%;
`;
