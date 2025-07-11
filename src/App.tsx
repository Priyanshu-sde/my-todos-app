import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const appStyles: React.CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'Segoe UI, Arial, sans-serif',
  padding: '40px 0'
};

const containerStyles: React.CSSProperties = {
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  padding: '32px 24px',
  width: '100%',
  maxWidth: '400px',
  marginTop: '40px'
};

const inputStyles: React.CSSProperties = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  width: '70%',
  fontSize: '1rem',
  marginRight: '8px'
};

const buttonStyles: React.CSSProperties = {
  padding: '12px 20px',
  borderRadius: '8px',
  border: 'none',
  background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background 0.2s'
};

const titleStyles: React.CSSProperties = {
  textAlign: 'center',
  color: '#3730a3',
  fontWeight: 700,
  fontSize: '2.2rem',
  marginBottom: '24px',
  letterSpacing: '1px'
};

const LOCAL_STORAGE_KEY = 'my-todo-app-todos';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false }
      ]);
      setInputValue('');
    }
  };

  const removeTodo = (id: number) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div style={appStyles}>
      <div style={containerStyles}>
        <h1 style={titleStyles}>Todo App change</h1>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo"
            style={inputStyles}
          />
          <button style={buttonStyles} onClick={addTodo}>
            Add
          </button>
        </div>
        <TodoList todos={todos} onRemove={removeTodo} onToggle={toggleTodo} />
      </div>
    </div>
  );
};

export default App;