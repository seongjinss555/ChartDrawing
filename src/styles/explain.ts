import styled from 'styled-components';

interface SlideProps {
    isActive: boolean;
} //isActive props 정의

export const ModalContainer = styled.div`
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.section`
    position: relative;
    background: #1b1b22;
    border-radius: 1rem;
    padding: 2rem;
    width: 90%;
    max-width: 600px;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    cursor: pointer;
`;

export const Slide = styled.div<SlideProps>`
    display: ${({ isActive }) => (isActive ? 'block' : 'none')}; // props를 사용하여 display 설정
`;

export const Button = styled.button`
    margin-top: 1rem;
`;
