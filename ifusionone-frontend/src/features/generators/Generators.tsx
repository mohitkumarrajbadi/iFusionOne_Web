import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { v4 as uuidv4 } from 'uuid';
import { ulid } from 'ulid';
import { faker } from '@faker-js/faker';
import sha256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';
import html2canvas from 'html2canvas';

const generatorOptions = [
  { label: 'UUID Generator', value: 'uuid' },
  { label: 'ULID Generator', value: 'ulid' },
  { label: 'QR Code Generator', value: 'qr' },
  { label: 'Lorem Ipsum Generator', value: 'lorem' },
  { label: 'Random String/Password Generator', value: 'random' },
  { label: 'Mock Data Generator', value: 'mock' },
  { label: 'SHA256 Hash Generator', value: 'hash' },
];

const Generators = () => {
  const [selectedGenerator, setSelectedGenerator] = useState('uuid');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [showPassword, setShowPassword] = useState(false);
  const qrRef = useRef(null);

  const generate = () => {
    switch (selectedGenerator) {
      case 'uuid':
        setOutput(uuidv4());
        break;
      case 'ulid':
        setOutput(ulid());
        break;
      case 'qr':
        setOutput(input);
        break;
      case 'lorem':
        setOutput(faker.lorem.paragraphs(3, '\n\n'));
        break;
      case 'random': {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        let str = '';
        for (let i = 0; i < passwordLength; i++) {
          str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setOutput(str);
        break;
      }
      case 'mock':
        setOutput(
          JSON.stringify(
            {
              name: faker.person.fullName(),
              email: faker.internet.email(),
              phone: faker.phone.number(),
              address: faker.location.streetAddress(),
              jobTitle: faker.person.jobTitle(),
              company: faker.company.name(),
            },
            null,
            2
          )
        );
        break;
      case 'hash':
        setOutput(sha256(input).toString(encHex));
        break;
      default:
        setOutput('');
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  const downloadQRCode = async () => {
    if (!qrRef.current) return;
    const canvas = await html2canvas(qrRef.current);
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="generator-container">
      <h2 className="title">🛠️ Useful Generators</h2>
      <p className="subtitle">UUIDs, QR Codes, Hashes, Passwords, Mock Data, and more</p>

      <div className="input-section">
        <label>Select Generator</label>
        <select value={selectedGenerator} onChange={(e) => setSelectedGenerator(e.target.value)}>
          {generatorOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {(selectedGenerator === 'qr' || selectedGenerator === 'hash') && (
        <div className="input-section">
          <textarea
            placeholder={`Enter text for ${selectedGenerator === 'qr' ? 'QR Code' : 'Hash'}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      )}

      {selectedGenerator === 'random' && (
        <div className="input-section">
          <label>Password Length: {passwordLength}</label>
          <input
            type="range"
            min={4}
            max={64}
            value={passwordLength}
            onChange={(e) => setPasswordLength(parseInt(e.target.value))}
          />
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>
      )}

      <div className="button-row">
        <button onClick={generate}>Generate</button>
        {output && <button onClick={copyToClipboard}>Copy</button>}
        {selectedGenerator === 'qr' && output && <button onClick={downloadQRCode}>Download QR</button>}
      </div>

      {selectedGenerator === 'qr' && output && (
        <div className="qr-output" style={{ marginTop: '20px', textAlign: 'center' }}>
          <div ref={qrRef} style={{ background: 'white', padding: '16px', display: 'inline-block' }}>
            <QRCode value={output || ' '} />
          </div>
        </div>
      )}

      {selectedGenerator !== 'qr' && (
        <div className="output-section">
          <textarea
            readOnly
            value={showPassword || selectedGenerator !== 'random' ? output : '•'.repeat(output.length)}
            placeholder="Generated output will appear here"
          />
        </div>
      )}
    </div>
  );
};

export default Generators;
