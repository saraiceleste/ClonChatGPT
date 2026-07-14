import { createContext, useReducer, useContext } from 'react';

// 1. Estado inicial
const initialState = {
  history: [], // Guarda objetos { prompt: string, response: string }
};

// 2. Reducer para manejar las acciones
function chatReducer(state, action) {
  switch (action.type) {
    case 'ADD_CHAT':
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: [],
      };
    default:
      return state;
  }
}

// 3. Crear Contexto
const ChatContext = createContext();

// 4. Proveedor del Contexto (Provider)
export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

// 5. Custom hook para consumir el contexto de forma segura
export function useChat() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error('useChat debe usarse dentro de un ChatProvider');
  }

  return context;
}