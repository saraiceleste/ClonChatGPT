import { useChat } from './ChatContext';


function History() {
  const { state, dispatch } = useChat();

  return (
    <div style={{ borderRight: '1px solid #ccc', padding: '1rem', width: '250px' }}>
      <h3>Historial de Consultas</h3>
      {state.history.length === 0 ? (
        <p style={{ color: '#666' }}>No hay consultas previas.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {state.history.map((item, index) => (
            <li 
              key={index} 
              style={{ 
                padding: '8px', 
                borderBottom: '1px solid #eee', 
                fontSize: '14px',
                cursor: 'pointer' 
              }}
            >
              <strong>Tú:</strong> {item.prompt.substring(0, 20)}...
            </li>
          ))}
        </ul>
      )}
      
      {state.history.length > 0 && (
        <button 
          onClick={() => dispatch({ type: 'CLEAR_HISTORY' })}
          style={{ marginTop: '10px', width: '100%' }}
        >
          Borrar Historial
        </button>
      )}
    </div>
  );
}

export default History;