// src/components/AiSpace.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CreateMLCEngine, type MLCEngine } from '@mlc-ai/web-llm';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

import './AiSpace.css';

// --- Types ---
interface DocChunk {
  id: string;
  text: string;
  source: string;
}

interface WebHit {
  snippet: string;
  url: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// --- Constants ---
const CHUNK_SIZE = 1000;
const TOP_K = 3;

// --- Component ---
export const AiSpace: React.FC = () => {
  // Engine states
  const [engine, setEngine] = useState<MLCEngine | null>(null);
  const [engineStarted, setEngineStarted] = useState(false);
  const [loadingEngine, setLoadingEngine] = useState(false);

  // Mode toggles
  const [useRag, setUseRag] = useState(false);
  const [includeWeb, setIncludeWeb] = useState(false);

  // Data states
  const [query, setQuery] = useState('');
  const [docs, setDocs] = useState<DocChunk[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize engine
  const initEngine = useCallback(async () => {
    setLoadingEngine(true);
    const eng = await CreateMLCEngine('Llama-3.1-8B-Instruct-q4f32_1-MLC', {
      initProgressCallback: (p) => console.log('Engine load:', p),
    });
    setEngine(eng);
    setLoadingEngine(false);
    return eng;
  }, []);

  const handleEngineToggle = useCallback(async () => {
    if (engineStarted) {
      engine?.dispose();
      setEngine(null);
      setEngineStarted(false);
    } else {
      try {
        await initEngine();
        setEngineStarted(true);
      } catch (err) {
        console.error(err);
        alert('Failed to load AI engine.');
      }
    }
  }, [engineStarted, engine, initEngine]);

  const handleFileUpload = useCallback(async () => {
    const files = fileInputRef.current?.files;
    if (!files?.length) return;

    const chunks: DocChunk[] = [];

    for (const file of Array.from(files)) {
      const text = await file.text();
      for (let i = 0; i < text.length; i += CHUNK_SIZE) {
        chunks.push({
          id: `${file.name}-${i}`,
          text: text.slice(i, i + CHUNK_SIZE),
          source: file.name,
        });
      }
    }

    setDocs(chunks);
  }, []);

  const cosineSimilarity = (a: number[], b: number[]) => {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      na += a[i] ** 2;
      nb += b[i] ** 2;
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-12);
  };

  const fetchContext = useCallback(async () => {
    try {
      const res = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, includeWeb }),
      });

      if (!res.ok) throw new Error('Fetch failed');

      return await res.json() as { docs: DocChunk[]; webHits: WebHit[] };
    } catch (error) {
      console.error(error);
      return { docs: [], webHits: [] };
    }
  }, [query, includeWeb]);

  const buildRagPrompt = (q: string, docChunks: DocChunk[], webHits: WebHit[]) => {
    const parts = ['You are an expert assistant. Cite your sources.'];

    if (includeWeb && webHits.length) {
      parts.push('[Live Web Results]');
      webHits.forEach((hit, i) =>
        parts.push(`${i + 1}. "${hit.snippet}" — ${hit.url}`)
      );
    }

    if (docChunks.length) {
      parts.push('[User Documents]');
      docChunks.forEach((doc, i) =>
        parts.push(`${String.fromCharCode(65 + i)}. "${doc.text}" — ${doc.source}`)
      );
    }

    parts.push('[User Question]', q);
    return parts.join('\n\n');
  };

 const handleAsk = useCallback(async () => {
  if (!engineStarted || !engine || !query.trim()) return;

  setLoadingAnswer(true);
  setMessages((prev) => [...prev, { role: 'user', content: query }]);

  let prompt = `You are a helpful AI assistant.\n\n[User Question]\n${query}`;

  let scoredDocs: DocChunk[] = [];

  if (useRag) {
    const context = await fetchContext();
    const combinedDocs = [...docs, ...context.docs];

    if (combinedDocs.length) {
      const [qEmb] = await engine.embed.text.embed([query]);
      const docTexts = combinedDocs.map((doc) => doc.text);
      const docEmbs = await engine.embed.text.embed(docTexts);

      scoredDocs = combinedDocs
        .map((doc, i) => ({
          ...doc,
          score: cosineSimilarity(qEmb, docEmbs[i])
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, TOP_K);

      prompt = buildRagPrompt(query, scoredDocs, context.webHits || []);
    }
  }

  try {
    const stream = await engine.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant. Cite your sources.' },
        { role: 'user', content: prompt },
      ],
      stream: true,
    });

    let assistantText = '';
    for await (const chunk of stream) {
      assistantText += chunk.choices[0].delta.content || '';

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.role === 'assistant') {
          last.content = assistantText;
        } else {
          updated.push({ role: 'assistant', content: assistantText });
        }
        return updated;
      });
    }
  } catch (error) {
    console.error(error);
    setMessages((prev) => [...prev, { role: 'assistant', content: 'Error generating answer.' }]);
  } finally {
    setLoadingAnswer(false);
    setQuery('');
  }
}, [engine, engineStarted, query, useRag, docs, fetchContext]);


  useEffect(() => {
    return () => engine?.dispose();
  }, [engine]);

  return (
    <div className="ai-space-container" data-theme="light">
      <header className="ai-space-header">
        <h2>iFusionOne AI Space</h2>
      </header>

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.role === 'assistant' && <img src="/fuso-superhero-logo.png" className="avatar" />}
            <div className="bubble">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>{children}</code>
                    );
                  },
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept=".pdf,.txt,.md"
          onChange={handleFileUpload}
        />
        <button onClick={handleEngineToggle} disabled={loadingEngine}>
          {engineStarted ? 'Stop Engine' : loadingEngine ? 'Loading...' : 'Start Engine'}
        </button>
        <label>
          <input type="checkbox" checked={useRag} onChange={() => setUseRag(v => !v)} />
          Use RAG
        </label>
        <label>
          <input type="checkbox" checked={includeWeb} onChange={() => setIncludeWeb(v => !v)} />
          Include Web
        </label>
      </div>

      <form className="chat-input" onSubmit={(e) => { e.preventDefault(); handleAsk(); }}>
        <textarea
          rows={2}
          placeholder="Type your message…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={!engineStarted || loadingAnswer}
        />
        <button type="submit" disabled={!query.trim() || !engineStarted || loadingAnswer}>
          {loadingAnswer ? 'Thinking…' : 'Send'}
        </button>
      </form>
    </div>
  );
};



export default {
  name: 'Ai Space',
  route: '/ai-space',
  component: AiSpace,
  icon: '🤖',
};