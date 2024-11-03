import React, { useState } from 'react';
import './App.css'
const App = () => {
  const [text, setText] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [log, setLog] = useState([]);
  const [previousOutputs, setPreviousOutputs] = useState([]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const encode = () => {
    try {
      const encoded = btoa(text);
      setEncodedText(encoded);
      setPreviousOutputs(prev => [...prev, encoded]); // Store the encoded output
      setLog(prevLog => [...prevLog, `Encoded: ${encoded}`]);
    } catch (err) {
      console.log("Error encoding");
      console.error(`Failed to encode:`, err);
    }
  };

  const decode = () => {
    try {
      const decoded = atob(encodedText);
      setDecodedText(decoded);
      setPreviousOutputs(prev => [...prev, decoded]); // Store the decoded output
      setLog(prevLog => [...prevLog, `Decoded: ${decoded}`]);
    } catch (err) {
      console.log("Error decoding");
      console.error(`Failed to decode:`, err);
    }
  };

  const refresh = () => {
    setText("");
    setEncodedText("");
    setDecodedText("");
  };

  const downloadLog = () => {
    const logContent = log.join('\n');
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'log.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='container'>
      <nav className='nav'>
        <h1>Base64 Encoder/Decoder</h1>
      </nav>
      <div className='section'>
        <h2>Encode</h2>
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Enter text to encrypt"
          rows={4}
          cols={50}
        />
        <button className='btn' onClick={encode}>
          Encrypt
        </button>
        <textarea
          value={encodedText}
          readOnly
          placeholder="Encoded text will appear here"
          rows={4}
          cols={50}
        />
      </div>

      <div className='section'>
        <h2>Decode</h2>
        <textarea
          value={encodedText}
          onChange={(e) => setEncodedText(e.target.value)}
          placeholder="Enter text to decrypt"
          rows={4}
          cols={50}
        />
        <button className='btn' onClick={decode}>
          Decrypt
        </button>
        <textarea
          value={decodedText}
          readOnly
          placeholder="Decoded text will appear here"
          rows={4}
          cols={50}
        />
      </div>

      <div className='section'>
        <h2>Previous Outputs</h2>
        <ul>
          {previousOutputs.map((output, index) => (
            <li key={index}>{output}</li>
          ))}
        </ul>
      </div>

      <div className='button-group'>
        <button className='btn' onClick={refresh}>
          Refresh
        </button>
        <button className='btn' onClick={downloadLog}>
          Download Log
        </button>
      </div>
      <footer>
        <h2> By sidharth </h2>
        <p>cc to Siddhant</p>
      </footer>
    </div>
  );
};

export default App;