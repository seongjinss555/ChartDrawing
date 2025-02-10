'use client';

import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import useChartData from '@/src/hooks/useChartData';
import { readExcelFile } from '@/src/utils/fileUtils';
import { Container, Input, Button, Select, ChartContainer, ButtonContainer} from '../styles/selectStyle';


ChartJS.register(...registerables);

const ChartComponent: React.FC = () => {
    const { chartData, setChartData, columns, selectedLabel, selectedValue, handleFile, setSelectedLabel, setSelectedValue } = useChartData();
    const barChartRef = useRef<HTMLCanvasElement>(null);
    const lineChartRef = useRef<HTMLCanvasElement>(null);
    const jsonDataRef = useRef<any[]>([]); // JSON 데이터를 저장할 레퍼런스
    const barChartInstanceRef = useRef<ChartJS | null>(null); // 차트 인스턴스 저장
    const lineChartInstanceRef = useRef<ChartJS | null>(null); // 차트 인스턴스 저장


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // excel 파일 배열 중 첫 번째 파일 불러오기
        if (file) {
            handleFile(file);
            readExcelFile([],file).then((jsonData) => {
                jsonDataRef.current = jsonData; // jsonData를 레퍼런스에 저장, 차트 업데이트 시 사용
                handleChartUpdate(); // 업데이트 호출
            }).catch((error) => {
                console.error("Error reading Excel file:", error);
            });//excel 파일을 json 형태로 변환
        }
    };
    

    const handleChartUpdate = () => {
        const jsonData = jsonDataRef.current; // 레퍼런스에서 jsonData 가져오기
        if (jsonData.length > 0) {
            const labels = jsonData.map((row: any) => row[selectedLabel]);
            const values = jsonData.map((row: any) => row[selectedValue]);
            setChartData({ labels, values });
        }
    };

    useEffect(() => {
        const renderBarChart = () => {
            if (barChartRef.current) {
                const ctx = barChartRef.current.getContext('2d');
                if (barChartInstanceRef.current) {
                    barChartInstanceRef.current.destroy(); // 이전 차트 인스턴스 파괴
                }
                barChartInstanceRef.current = new ChartJS(ctx!, {
                    type: 'bar',
                    data: {
                        labels: chartData.labels,
                        datasets: [{
                            label: 'Bar 차트 데이터',
                            data: chartData.values,
                            backgroundColor: 'rgba(75,192,192,0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        };

        const renderLineChart = () => {
            if (lineChartRef.current) {
                const ctx = lineChartRef.current.getContext('2d');
                if (lineChartInstanceRef.current) {
                    lineChartInstanceRef.current.destroy(); // 이전 차트 인스턴스 파괴
                }
                lineChartInstanceRef.current = new ChartJS(ctx!, {
                    type: 'line',
                    data: {
                        labels: chartData.labels,
                        datasets: [{
                            label: 'Line 차트 데이터',
                            data: chartData.values,
                            backgroundColor: 'rgba(75,192,192,0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        };

       renderBarChart();
       renderLineChart();

        return () => {
            if (barChartRef.current) //canvas 요소가 있다면
            {
                const ctx = barChartRef.current.getContext('2d'); //2d 렌더링 컨텍스트
                ctx?.clearRect(0,0,barChartRef.current.width, barChartRef.current.height);
            } // ctx가 존재할 때만 clearRect를 실행
            if (lineChartRef.current) {
                const ctx = lineChartRef.current.getContext('2d');
                ctx?.clearRect(0,0,lineChartRef.current.width, lineChartRef.current.height);
            }
        };
    }, [chartData]);

    return (
        <Container>
            <Input type="file" onChange={handleFileChange} />
            {columns.length > 0 && (
                <div>
                    <label>X축 열 선택:</label>
                    <Select value={selectedLabel} onChange={(e) => setSelectedLabel(e.target.value)}>
                        {columns.map((col) => (
                            <option key={col} value={col}>{col}</option>
                        ))}
                    </Select>

                    <label>Y축 열 선택:</label>
                    <Select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                        {columns.map((col) => (
                            <option key={col} value={col}>{col}</option>
                        ))}
                    </Select>
                    <ButtonContainer>
                        <Button onClick={handleChartUpdate}>차트 생성</Button>
                    </ButtonContainer>
                </div>
            )}
            <ChartContainer ref={barChartRef} />
            <ChartContainer ref={lineChartRef} />
        </Container>
    );
};

export default ChartComponent;
