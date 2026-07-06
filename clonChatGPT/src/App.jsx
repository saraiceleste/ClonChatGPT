import './index.css';
import { useState, useEffect } from 'react';
import useOllamaHook from './api/useOllamaHook';
import { useChat, ChatProvider } from './api/ChatContext';
import History from './api/History';

function ChatInterface() {
  const [input, setInput] = useState('');
  const { handleSubmit, response, error, loading } = useOllamaHook();
  const { state, dispatch } = useChat();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentPrompt = input;
    setInput(''); 

    await handleSubmit(currentPrompt);
  };

  // Guardar en el historial global al terminar el streaming
  useEffect(() => {
    if (!loading && response && state.history.every(h => h.response !== response)) {
      dispatch({
        type: 'ADD_CHAT',
        payload: { prompt: "Consulta", response: response }
      });
    }
  }, [loading, response]);

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Componente del Historial */}
      <History />

      {/* Ventana de Chat Principal */}
      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <h2>DevfSeek Clone (Ollama)</h2>
        
        <div style={{ flex: 1, border: '1px solid #ddd', padding: '1rem', overflowY: 'auto', marginBottom: '1rem', borderRadius: '8px' }}>
          {loading && !response && <p style={{ color: '#666' }}>Pensando con DevSeek R1...</p>}
          {response && (
            <div style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
              <strong>DevSeek:</strong> {response}
            </div>
          )}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregúntale algo a la IA..."
            disabled={loading}
            style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '12px 24px', borderRadius: '6px', cursor: 'pointer' }}>
            {loading ? 'Generando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
}