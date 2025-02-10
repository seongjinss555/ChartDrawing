import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const useChartData = () => {
    const [chartData, setChartData] = useState<{ labels: string[]; values: number[] }>({ labels: [], values: [] });
    const [columns, setColumns] = useState<string[]>([]);
    const [selectedLabel, setSelectedLabel] = useState<string>('');
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFile = (file: File) => {
        setUploadedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target!.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet) as any[];

            if (jsonData.length > 0) {
                const columns = Object.keys(jsonData[0]);
                setColumns(columns);
                setSelectedLabel(columns[0]);
                setSelectedValue(columns[1]);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const handleChartUpdate = (jsonData: any[]) => {
        if (!selectedLabel || !selectedValue || !uploadedFile) return;

        const labels = jsonData.map((row: any) => row[selectedLabel]);
        const values = jsonData.map((row: any) => row[selectedValue]);
        setChartData({ labels, values });
    };

    return {
        chartData,
        columns,
        setChartData,
        selectedLabel,
        selectedValue,
        uploadedFile,
        handleFile,
        handleChartUpdate,
        setSelectedLabel,
        setSelectedValue,
    };
};

export default useChartData;
