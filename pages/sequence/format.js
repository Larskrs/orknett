import React, { useState } from 'react';

const CsvToJsonConverter = () => {
  const [json, setJson] = useState('');
  const [skipRows, setSkipRows] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.split('\n');
      const headers = lines[skipRows].split(';');
      const data = [];

      for (let j = 0; j < headers.length; j++) {
        const column = {
          title: headers[j].trim(),
          values: Array(lines.length - skipRows - 1).fill('')
        };
        data.push(column);
      }

      for (let i = skipRows + 1; i < lines.length; i++) {
        const values = lines[i].split(';');

        for (let j = 0; j < headers.length; j++) {
          data[j].values[i - skipRows - 1] = values[j] ? values[j].trim() : '';
        }
      }

      setJson(JSON.stringify(data, null, 2));
    };

    reader.readAsText(file);
  };

  const handleSkipRowsChange = (event) => {
    setSkipRows(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h1>CSV to JSON Converter</h1>
      <div>
        <label htmlFor="skipRows">Skip Rows:</label>
        <input type="number" id="skipRows" value={skipRows} onChange={handleSkipRowsChange} />
      </div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <br />
      <br />
      <button onClick={() => {navigator.clipboard.writeText(json)}} disabled={!json}>Copy JSON to Clipboard</button>
      <br />
      <br />
      <textarea rows={20} cols={50} value={json} readOnly />
    </div>
  );
};

export default CsvToJsonConverter;
