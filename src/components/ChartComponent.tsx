'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, Chart as ChartJS, registerables } from 'chart.js';
import useChartData from '@/src/hooks/useChartData';
import { readExcelFile } from '@/src/utils/fileUtils';
import { Container, Input, Button, Select, ChartContainer, ButtonContainer} from '../styles/selectStyle';


ChartJS.register(...registerables);

const ChartComponent: React.FC = () => {
    const { chartData, setChartData, columns, selectedLabel, selectedValue, handleFile, setSelectedLabel, setSelectedValue } = useChartData();
    const barChartRef = useRef<HTMLCanvasElement>(null);
    const lineChartRef = useRef<HTMLCanvasElement>(null);
    const horizonBarRef = useRef<HTMLCanvasElement>(null);
    const PieChartRef = useRef<HTMLCanvasElement>(null);
    const jsonDataRef = useRef<any[]>([]); // JSON 데이터를 저장할 레퍼런스
    const barChartInstanceRef = useRef<ChartJS | null>(null); // bar 차트 인스턴스 저장
    const lineChartInstanceRef = useRef<ChartJS | null>(null); // line 차트 인스턴스 저장
    const horizonChartInstanceRef = useRef<ChartJS|null>(null);// horizon bar 차트 인스턴스
    const PieChartInstanceRef = useRef<ChartJS | null>(null);// pie 차트 인스턴스


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // excel 파일 배열 중 첫 번째 파일 불러오기
        if (file) {
            handleFile(file);
            readExcelFile([],file).then((jsonData) => {
                jsonDataRef.current = jsonData; // jsonData를 레퍼런스에 저장, 차트 업데이트 시 사용
                handleChartUpdate(); // 업데이트 호출
                handlePieChartUpdate();
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

    const handlePieChartUpdate = () =>{
        const jsonData = jsonDataRef.current; // 레퍼런스에서 jsonData 가져오기
        if(jsonData.length>0){
            const labels = jsonData.map((row:any)=> row[selectedLabel]);
            const changeValue: {[key: string]:number} = {}; //string => number

            labels.reduce((acc: { [key: string]: number }, label: string) => {
                acc[label] = (acc[label] || 0) + 1; // 빈도 증가
                return acc;
            }, {} as Record<string, number>); //각 학점에 대한 빈도 계산

             // 라벨과 값 배열 생성
            const uniqueLabels = Object.keys(changeValue);
            const values = uniqueLabels.map(label => changeValue[label]);

            setChartData({ labels: uniqueLabels, values });
        }
    }

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

        const renderHorizonBarChart = () => {
            if (horizonBarRef.current) {
                const ctx = horizonBarRef.current.getContext('2d');
                if (horizonChartInstanceRef.current) {
                    horizonChartInstanceRef.current.destroy(); // 이전 차트 인스턴스 파괴
                }
               horizonChartInstanceRef.current = new ChartJS(ctx!, {
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
                        indexAxis: 'y',
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
        
        const renderPieChart = () => {
            if (PieChartRef.current) {
                const ctx = PieChartRef.current.getContext('2d');
                if (PieChartInstanceRef.current) {
                    PieChartInstanceRef.current.destroy(); // 이전 차트 인스턴스 파괴
                }
                PieChartInstanceRef.current = new ChartJS(ctx!, {
                    type: 'pie',
                    data: {
                        labels:chartData.values,
                        datasets: [{
                            label: 'Pie 차트 데이터',
                            data: chartData.values,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            hoverOffset: 4
                        }]
                    },
                });
            }
        };

       renderBarChart();
       renderLineChart();
       renderHorizonBarChart();
       renderPieChart();
        
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
            if (barChartRef.current) {
                const ctx = barChartRef.current.getContext('2d');
                ctx?.clearRect(0,0,barChartRef.current.width, barChartRef.current.height);
            }
            if (PieChartRef.current) {
                const ctx = PieChartRef.current.getContext('2d');
                ctx?.clearRect(0,0,PieChartRef.current.width, PieChartRef.current.height);
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
            <ChartContainer ref={horizonBarRef}/>
            <ChartContainer ref={lineChartRef} />
            <ChartContainer ref={PieChartRef} />
        </Container>
    );
};

export default ChartComponent;
