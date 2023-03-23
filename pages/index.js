import React, { useEffect, useState } from 'react';
import csvtojson from 'csvtojson';
import json2csv from 'json2csv';
import { saveAs } from 'file-saver';

function CsvToJsonConverter() {
    const [csvFile, setCsvFile] = useState(null);
    const [index, setIndex] = useState(null);

    const handleCsvFileChange = (event) => {
        const file = event.target.files[0];
        setCsvFile(file);
    };

    const handleConvertCsvToJson = async () => {
        if (!csvFile) return;

        const csvData = await csvFile.text();
        let jsonData = await csvtojson().fromString(csvData);
        if (index) {
            jsonData = jsonData.map(dataItem => {
                const newItem = { ...dataItem }
                index.forEach(element => {
                    if (newItem[element[0]]) {
                        newItem[element[1]] = newItem[element[0]]
                        delete newItem[element[0]]
                    }
                });
                return newItem
            })
        }
        console.log("hola")
        const csv = json2csv.parse(jsonData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const filename = "data.csv"
        saveAs(blob, filename);
    };

    const handleCsvIndex = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const csvData = await file.text();
            const jsonData = await csvtojson().fromString(csvData);
            const depure = jsonData.filter(item => item["New"] !== "").map(Object.values)
            setIndex(depure)
        }
    };

    const sampleFile = [
        {
            "Original": "",
            "New": ""
        }
    ]

    const handleSampleFile = () => {
        const csv = json2csv.parse(sampleFile);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const filename = "equivalencyTable.csv"
        saveAs(blob, filename);
    }

    return (
        <div className='max-w-screen-md mx-auto py-20 w-full text-center flex flex-col gap-10'>
            <h1 className='text-5xl font-black text-indigo-500 w-full'>Transform CSV Columns</h1>
            <div className='flex flex-col items-center w-full border-2 border-indigo-500 rounded-xl p-6'>
                <span className='flex items-center gap-3 mb-2'>
                    <legend className='text-lg font-bold text-gray-800'>Upload equivalency table</legend>
                    <button  onClick={handleSampleFile} className='text-xs bg-green-500 p-2 rounded text-white hover:bg-green-600 transition'>Download sample file here</button>
                </span>
                <div class="flex justify-center w-full">
                    <div class="mb-3 w-96 ">
                        <input
                            class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-indigo-500 file:px-3 file:py-[0.32rem] file:text-white file:cursor-pointer file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-indigo-900 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none "
                            type="file" accept=".csv" onChange={handleCsvIndex} />
                        <small className='text-right w-full'>Upload equivalency table file only .csv</small>
                    </div>
                </div>
                {index && (
                    <ul className='w-full grid grid-cols-2 pt-10 mx-auto flex-wrap gap-2 flex flex-col text-left list-inside	list-disc	'>
                        {index && index.map((item => (
                            <li className='text-sm'><span className='text-gray-600'>"{item[0]}"</span> {`==>`} <span className='text-gray-900 font-semibold'>"{item[1]}"</span></li>
                        )))}
                    </ul>
                )}
            </div>
            <div className='flex flex-col items-center w-full border-2 border-indigo-500 rounded-xl p-6'>
                <legend className='text-lg font-bold text-gray-800 mb-2'>Upload CSV Data</legend>
                <div class="flex justify-center w-full">
                    <div class="mb-3 w-96 ">
                        <input
                            class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-indigo-500 file:px-3 file:py-[0.32rem] file:text-white file:cursor-pointer file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-indigo-900 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none "
                            type="file" accept=".csv" onChange={handleCsvFileChange} />
                        <small className='text-right w-full'>Upload equivalency table file only .csv</small>
                    </div>
                </div>
            </div>

            <button className='w-full py-3 bg-indigo-500 rounded-xl text-white font-bold text-2xl hover:bg-indigo-900 transition' onClick={handleConvertCsvToJson}>Convert</button>
        </div>
    );
}

export default CsvToJsonConverter;