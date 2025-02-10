'use client';

import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import useChartData from '@/src/hooks/useChartData';
import { readExcelFile } from '@/src/utils/fileUtils';
import { Container, Input, Button, Select, ChartContainer} from '../styles/selectStyle';


ChartJS.register(...registerables);

const ChartComponent: React.FC = () => {
    const { chartData, setChartData, columns, selectedLabel, selectedValue, handleFile, setSelectedLabel, setSelectedValue } = useChartData();
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<ChartJS | null>(null);
    const jsonDataRef = useRef<any[]>([]); // JSON 데이터를 저장할 레퍼런스

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFile(file);
            readExcelFile([],file).then((jsonData) => {
                jsonDataRef.current = jsonData; // jsonData를 레퍼런스에 저장
                handleChartUpdate(); // 업데이트 호출
            }).catch((error) => {
                console.error("Error reading Excel file:", error);
            });
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
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new ChartJS(ctx!, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: '데이터 예시',
                        data: chartData.values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
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

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [chartData]);

    return (
        <Container>
            <Input type="file" onChange={handleFileChange} />
            {columns.length > 0 && (
                <div>
                    <label>라벨 열 선택:</label>
                    <Select value={selectedLabel} onChange={(e) => setSelectedLabel(e.target.value)}>
                        {columns.map((col) => (
                            <option key={col} value={col}>{col}</option>
                        ))}
                    </Select>

                    <label>값 열 선택:</label>
                    <Select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                        {columns.map((col) => (
                            <option key={col} value={col}>{col}</option>
                        ))}
                    </Select>

                    <Button onClick={handleChartUpdate}>차트 업데이트</Button>
                </div>
            )}
            <ChartContainer ref={chartRef} />
        </Container>
    );
};

export default ChartComponent;
