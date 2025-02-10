import styled from 'styled-components';

export const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* 화면 전체 높이 */
    background-color: #f0f4f8; /* 연한 배경색 */
`;

export const Main = styled.main`
    background: white; /* 흰색 배경 */
    border-radius: 8px; /* 모서리 둥글게 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    padding: 40px; /* 패딩 추가 */
    max-width: 600px; /* 최대 너비 설정 */
    width: 100%; /* 반응형 */
    text-align: center; /* 텍스트 중앙 정렬 */
`;

export const Title = styled.h1`
    font-size: 2rem; /* 제목 폰트 크기 */
    margin-bottom: 20px; /* 아래 여백 */
    color: #333; /* 텍스트 색상 */
`;

export const Paragraph = styled.p`
    font-size: 1rem; /* 본문 폰트 크기 */
    margin-bottom: 30px; /* 아래 여백 */
    color: #666; /* 텍스트 색상 */
`;

