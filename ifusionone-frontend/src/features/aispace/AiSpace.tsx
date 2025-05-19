import React from 'react';
// import React, { useState, useEffect, useRef } from 'react';
// import { CreateMLCEngine, MLCEngine } from '@mlc-ai/web-llm';
import './AiSpace.css';

// Dummy types for retrieval API responses
// interface DocChunk { id: string; text: string; source: string; }
// interface WebHit { snippet: string; url: string; }

const AiSpace: React.FC = () => {
//   // WebLLM engine and control states
//   const [engine, setEngine] = useState<MLCEngine | null>(null);
//   const [engineStarted, setEngineStarted] = useState(false);
//   const [loadingEngine, setLoadingEngine] = useState(false);

//   // Mode toggles: pure chat or RAG
//   const [useRag, setUseRag] = useState(true);
//   const [includeWeb, setIncludeWeb] = useState(false);

//   // RAG and chat states
//   const [query, setQuery] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [docs, setDocs] = useState<DocChunk[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [loadingAnswer, setLoadingAnswer] = useState(false);

//   const selectedModel = 'Llama-3.1-8B-Instruct-q4f32_1-MLC';

//   // Initialize WebLLM engine
//   const initEngine = async (): Promise<MLCEngine> => {
//     setLoadingEngine(true);
//     const newEngine = await CreateMLCEngine(selectedModel, {
//       initProgressCallback: (p) => console.log('Engine load:', p),
//     });
//     setEngine(newEngine);
//     setLoadingEngine(false);
//     return newEngine;
//   };

//   // Start/Stop engine handler
//   const handleEngineToggle = async () => {
//     if (engineStarted) {
//       engine?.dispose();
//       setEngine(null);
//       setEngineStarted(false);
//     } else {
//       try {
//         await initEngine();
//         setEngineStarted(true);
//       } catch {
//         alert('Failed to load AI engine. Check console for details.');
//       }
//     }
//   };

//   // Upload documents handler
//   const handleFileUpload = async () => {
//     const files = fileInputRef.current?.files;
//     if (!files?.length) return;
//     const form = new FormData();
//     Array.from(files).forEach((f) => form.append('files', f));
//     try {
//       await fetch('/api/upload', { method: 'POST', body: form });
//       const resp = await fetch('/api/docs');
//       const list: DocChunk[] = resp.ok ? await resp.json() : [];
//       setDocs(list);
//     } catch {
//       alert('Upload failed or docs endpoint not available.');
//     }
//   };

//   // Fetch context from RAG backend
//   const fetchContext = async (): Promise<{ docs: DocChunk[]; webHits: WebHit[] }> => {
//     try {
//       const resp = await fetch('/api/rag', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query, includeWeb }),
//       });
//       if (!resp.ok) throw new Error(`Status ${resp.status}`);
//       return await resp.json();
//     } catch (err) {
//       console.error('fetchContext error:', err);
//       alert('Context fetch failed. Ensure /api/rag is up.');
//       return { docs: [], webHits: [] };
//     }
//   };

//   // Build prompt with context for RAG
//   const buildRagPrompt = (q: string, docs: DocChunk[], webHits: WebHit[]) => {
//     const parts: string[] = ['You are an expert assistant. Think step by step and cite sources.'];
//     if (includeWeb) {
//       parts.push('[Live Web Results]');
//       webHits.forEach((h, i) => parts.push(`${i + 1}. "${h.snippet}" — ${h.url}`));
//     }
//     if (docs.length) {
//       parts.push('[User Documents]');
//       docs.forEach((d, i) => parts.push(`${String.fromCharCode(65 + i)}. "${d.text}" — ${d.source}`));
//     }
//     parts.push('[User Question]');
//     parts.push(q);
//     return parts.join('\n');
//   };

//   // Ask AI handler for both modes
//   const handleAsk = async () => {
//     if (!engineStarted || !engine) return;
//     setLoadingAnswer(true);
//     setAnswer('');

//     // Determine message sequence
//     let messages: { role: 'system' | 'user'; content: string }[] = [];
//     if (useRag) {
//       const { docs: ctxDocs, webHits } = await fetchContext();
//       const prompt = buildRagPrompt(query, ctxDocs, webHits);
//       messages = [{ role: 'system', content: prompt }];
//     } else {
//       messages = [
//         { role: 'system', content: 'You are a helpful AI assistant.' },
//         { role: 'user', content: query },
//       ];
//     }

//     try {
//       const stream = await engine.chat.completions.create({ messages, stream: true });
//       let text = '';
//       for await (const chunk of stream) {
//         text += chunk.choices[0].delta.content || '';
//         setAnswer(text);
//       }
//     } catch (err) {
//       console.error('AI generation error:', err);
//       setAnswer('Error generating answer.');
//     } finally {
//       setLoadingAnswer(false);
//     }
//   };

//   // Initial docs fetch
//   useEffect(() => {
//     (async () => {
//       try {
//         const resp = await fetch('/api/docs');
//         const list: DocChunk[] = resp.ok ? await resp.json() : [];
//         setDocs(list);
//       } catch {
//         console.warn('/api/docs not available');
//       }
//     })();
//   }, []);

  return (
    <h1>We are building our AI Space</h1>
    // <div className="ai-space-container">
    //   <h2>iFusionOne AI Assistant</h2>
    //   {/* Engine controls */}
    //   <button onClick={handleEngineToggle} disabled={loadingEngine}>
    //     {engineStarted ? 'Stop AI Engine' : loadingEngine ? 'Loading Engine...' : 'Start AI Engine'}
    //   </button>

    //   {/* Chat mode toggle */}
    //   <div className="mode-toggle">
    //     <label>
    //       <input type="radio" name="mode" checked={!useRag} onChange={() => setUseRag(false)} /> Pure Chat
    //     </label>
    //     <label>
    //       <input type="radio" name="mode" checked={useRag} onChange={() => setUseRag(true)} /> RAG
    //     </label>
    //   </div>

    //   {/* Upload & web toggle (only when useRag) */}
    //   {useRag && (
    //     <div className="controls">
    //       <div className="upload">
    //         <input type="file" ref={fileInputRef} multiple accept=".pdf,.txt,.md" />
    //         <button onClick={handleFileUpload}>Upload Docs</button>
    //       </div>
    //       <label>
    //         <input type="checkbox" checked={includeWeb} onChange={() => setIncludeWeb((v) => !v)} />
    //         Search the Internet
    //       </label>
    //     </div>
    //   )}

    //   {/* Query input */}
    //   <textarea
    //     rows={4}
    //     placeholder="Enter your question..."
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //     disabled={!engineStarted || loadingAnswer}
    //   />
    //   <button onClick={handleAsk} disabled={!query || !engineStarted || loadingAnswer}>
    //     {loadingAnswer ? 'Thinking...' : 'Ask AI'}
    //   </button>

    //   {/* Answer display */}
    //   <pre className="ai-answer">{answer}</pre>

    //   {/* Document list (only RAG mode) */}
    //   {useRag && (
    //     <div className="doc-list">
    //       <h3>Uploaded Documents:</h3>
    //       <ul>
    //         {docs.map((d) => (
    //           <li key={d.id}>{d.source}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </div>
  );
};

export default {
  name: 'Ai Space',
  route: '/ai-space',
  component: AiSpace,
  icon: '🤖',
};