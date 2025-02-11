'use client';
import { useState } from 'react';
import { Page,Title, Paragraph} from "../styles/indexPage";
import ChartComponent from "../components/ChartComponent"; 
import ExplainModal from "../modal/explainModal";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(true); // 페이지 로드 시 모달 열기

    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };
    return (
        <Page>
            <main>
                <Title>EXCEL DATA 시각화</Title>
                <Paragraph>엑셀 파일을 업로드하여 차트를 생성하세요.</Paragraph>
                <ChartComponent /> {/* 차트 컴포넌트 추가 */}
                 {/* 모달 컴포넌트 추가 */}
                 {isModalOpen && (
                    <ExplainModal onClose={handleCloseModal} />
                )}
            </main>
        </Page>
    );
}
