import { useState } from 'react';
import { useChat } from '../api/ChatContext'; 

export default function ChatInterface() {
  // 3. Consumimos el contexto de forma segura usando el hook useChat
  const { state, dispatch } = useChat(); 
  const [inputPrompt, setInputPrompt] = useState('');

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    // Enviamos un nuevo chat al estado global
    dispatch({
      type: 'ADD_CHAT',
      payload: { prompt: inputPrompt, response: 'Respuesta simulada de la IA' }
    });

    setInputPrompt('');
  };

  return (
    <div className="chat-interface">
      {/* Renderizar el historial desde el contexto */}
      <div className="chat-history">
        {state.history.map((chat, index) => (
          <div key={index} className="chat-item">
            <p><strong>Tú:</strong> {chat.prompt}</p>
            <p><strong>IA:</strong> {chat.response}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleEnviar}>
        <input 
          value={inputPrompt} 
          onChange={(e) => setInputPrompt(e.target.value)} 
          placeholder="Escribe un prompt..."
        />
        <button type="submit">Enviar</button>
      </form>

      {/* Botón para borrar el historial usando el dispatch del contexto */}
      <button onClick={() => dispatch({ type: 'CLEAR_HISTORY' })}>
        Limpiar Historial
      </button>
    </div>
  );
}