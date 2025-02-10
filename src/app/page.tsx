import styles from "./page.module.css";
import ChartComponent from "../components/ChartComponent"; // ChartComponent 임포트

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>엑셀 데이터 시각화</h1>
                <p>엑셀 파일을 업로드하여 차트를 생성하세요.</p>
                <ChartComponent /> {/* 차트 컴포넌트 추가 */}
            </main>
        </div>
    );
}
