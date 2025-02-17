import styled from 'styled-components';

export const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; 
    background-color: #f0f4f8; 
`;

export const Main = styled.main`
    background: white; 
    border-radius: 8px; 
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 40px; 
    max-width: 600px; 
    width: 100%; 
    text-align: center; 
`;

export const Title = styled.h1`
    font-size: 2rem; 
    margin-bottom: 20px; 
    color: #333; 
`;


export const Paragraph = styled.p`
    font-size: 1rem; 
    margin-bottom: 30px; 
    color: #666;
`;

