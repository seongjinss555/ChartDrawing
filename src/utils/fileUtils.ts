import * as XLSX from 'xlsx';

export async function readExcelFile(SheetNames:any, FileBinaryFile:File): Promise<any>{
    return new Promise((resolve, reject) =>{
        //파일 reader 클래스
        const reader = new FileReader();

        //파일 읽는 메서드
        reader.onload = (e:any) => {
            try{
                //타겟 엑셀 파일 data로 읽기
                const data = new Uint8Array(e.target!.result as ArrayBuffer);
                //엑셀 파일 Read
                const workbook = XLSX.read(data, {type: 'array'});
                //읽을 시트 파일 지정
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                //변환 결과 JSONData
                const jsonData = XLSX.utils.sheet_to_json(firstSheet) as any[];
                //결과 return
                resolve(jsonData);
            }catch(error){
                reject(new Error("Failed to parse JSON"));
            }
        };

        //에러 처리
        reader.onerror =()=>{
            reject(new Error("Failed to read file"));
        };

        //reader 메서드(바이너리 파일 Read)
        reader.readAsArrayBuffer(FileBinaryFile);
    })
}
