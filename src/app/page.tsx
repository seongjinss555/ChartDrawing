'use client';
import { Page,Title, Paragraph} from "../styles/indexPage";
import ChartComponent from "../components/ChartComponent"; 

export default function Home() {
    return (
        <Page>
            <main>
                <Title>EXCEL DATA 시각화</Title>
                <Paragraph>엑셀 파일을 업로드하여 차트를 생성하세요.</Paragraph>
                <ChartComponent /> {/* 차트 컴포넌트 추가 */}
            </main>
        </Page>
    );
}
