import { useState } from 'react';
import base64 from 'base-64';
import utf8 from 'utf8';
import { gzip, ungzip } from 'pako';
import { jwtDecode } from "jwt-decode";
import SharedEditorLayout from '../../layouts/SharedLayout'; // Import SharedEditorLayout

const tools = [
    { label: 'Base64 Encode', value: 'base64-encode' },
    { label: 'Base64 Decode', value: 'base64-decode' },
    { label: 'URL Encode', value: 'url-encode' },
    { label: 'URL Decode', value: 'url-decode' },
    { label: 'URL Parser', value: 'url-parse' },
    { label: 'HTML Encode', value: 'html-encode' },
    { label: 'HTML Decode', value: 'html-decode' },
    { label: 'Backslash Escape', value: 'backslash-escape' },
    { label: 'Backslash Unescape', value: 'backslash-unescape' },
    { label: 'GZIP Encode', value: 'gzip-encode' },
    { label: 'GZIP Decode', value: 'gzip-decode' },
    { label: 'JWT Decode', value: 'jwt-decode' },
    { label: 'Text to Binary', value: 'text-to-binary' },
    { label: 'Binary to Text', value: 'binary-to-text' },
];

const EncoderDecoder = () => {
    const [tool, setTool] = useState(tools[0]);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleGenerate = () => {
        try {
            let result = '';
            const selectedTool = tool.value; // Access the tool value
            
            switch (selectedTool) {
                case 'base64-encode':
                    result = base64.encode(utf8.encode(input));
                    break;
                case 'base64-decode':
                    result = utf8.decode(base64.decode(input));
                    break;
                case 'url-encode':
                    result = encodeURIComponent(input);
                    break;
                case 'url-decode':
                    result = decodeURIComponent(input);
                    break;
                case 'url-parse': {
                    const url = new URL(input);
                    result = JSON.stringify({
                        href: url.href,
                        protocol: url.protocol,
                        hostname: url.hostname,
                        pathname: url.pathname,
                        searchParams: Object.fromEntries(url.searchParams),
                    }, null, 2);
                    break;
                }
                case 'html-encode':
                    result = input.replace(/[&<>"']/g, c => ({
                        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
                    }[c] || c));
                    break;
                case 'html-decode': {
                    const txt = document.createElement('textarea');
                    txt.innerHTML = input;
                    result = txt.value;
                    break;
                }
                case 'backslash-escape':
                    result = input.replace(/([\\"'])/g, '\\$1');
                    break;
                case 'backslash-unescape':
                    result = input.replace(/\\([\\"'])/g, '$1');
                    break;
                case 'gzip-encode':
                    result = Buffer.from(gzip(input)).toString('base64');
                    break;
                case 'gzip-decode':
                    result = new TextDecoder().decode(ungzip(Buffer.from(input, 'base64')));
                    break;
                case 'jwt-decode':
                    result = JSON.stringify(jwtDecode(input), null, 2);
                    break;
                case 'text-to-binary':
                    result = input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
                    break;
                case 'binary-to-text':
                    result = input.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
                    break;
                default:
                    result = '';
            }
            setOutput(result);
        } catch (error) {
            setOutput('Error: ' + (error instanceof Error ? error.message : 'An unknown error occurred'));
        }
    };

    return (
        <SharedEditorLayout
            title="🔐 Encoders & Decoders"
            subtitle="Encode and decode data formats like Base64, URL, HTML, JWT, and more!"
            options={tools}
            selected={tool}
            onSelectChange={(selectedOption) => {
                if (selectedOption) {
                    setTool(selectedOption);
                }
            }}
            inputValue={input}
            onInputChange={setInput}
            outputValue={output}
            onRunClick={handleGenerate}
            buttonLabel="Generate"
            inputLang={tool ? tool.value : 'text'}
            outputLang={tool ? tool.value : 'text'}
        />
    );
};

export default EncoderDecoder;
