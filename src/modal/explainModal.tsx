import { useState } from 'react';
import { ModalContainer, ModalContent, CloseButton, Slide, Button } from '../styles/explain';
import CloseIcon from '@mui/icons-material/Close'; // Material Icons 임포트

//props 타입 정의
interface ExplainModalProps{
    onClose: () => void;
}

const slides = [
    { title: "사용법 1", content: "사용하고자 하는 엑셀 파일을 선택합니다." },
    { title: "사용법 2", content: "X축에 넣고 싶은 데이터 열을 선택합니다.(ex: 학번)" },
    { title: "사용법 3", content: "Y축에 넣고 싶은 데이터 열을 선택합니다.(ex: 점수)" },
    { title: "사용법 4", content: "차트 생성 버튼을 누른 후 보여지는 그래프 종류 중 마음에 드는 그래프를 캡쳐 후 사용하세요!" },
];

export default function ExplainModal({onClose}: ExplainModalProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <ModalContainer>
            <ModalContent>
                <CloseButton onClick={onClose}>
                    <CloseIcon style={{ fontSize: 24, color: 'white' }} />
                </CloseButton>
                {slides.map((slide, index) => (
                    <Slide key={index} isActive={index === currentSlide}>
                        <h2 style={{ color: 'white' }}>{slide.title}</h2>
                        <p style={{ color: 'white' }}>{slide.content}</p>
                    </Slide>
                ))}
                <Button onClick={prevSlide} disabled={currentSlide === 0}>이전</Button>
                <Button onClick={nextSlide} disabled={currentSlide === slides.length - 1}>다음</Button>
            </ModalContent>
        </ModalContainer>
    );
}
