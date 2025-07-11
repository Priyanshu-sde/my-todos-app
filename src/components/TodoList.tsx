import React from 'react';
import { Todo } from '../types';

interface TodoListProps {
    todos: Todo[];
    onRemove: (id: number) => void;
    onToggle?: (id: number) => void; // Optional for checkbox
}

const listStyles: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0
};

const itemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(90deg, #f1f5f9 0%, #e0e7ff 100%)',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(99,102,241,0.06)'
};

const textStyles: React.CSSProperties = {
    fontSize: '1.1rem',
    color: '#3730a3',
    fontWeight: 500,
    marginLeft: '12px',
    flex: 1,
    textDecoration: undefined
};

const removeButtonStyles: React.CSSProperties = {
    background: 'linear-gradient(90deg, #f87171 0%, #fbbf24 100%)',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: 600,
    padding: '8px 14px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'background 0.2s'
};

const TodoList: React.FC<TodoListProps> = ({ todos, onRemove, onToggle }) => {
    return (
        <ul style={listStyles}>
            {todos.map(todo => (
                <li key={todo.id} style={itemStyles}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle && onToggle(todo.id)}
                        style={{ accentColor: '#6366f1', width: 18, height: 18 }}
                    />
                    <span
                        style={{
                            ...textStyles,
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            color: todo.completed ? '#a1a1aa' : '#3730a3'
                        }}
                    >
                        {todo.text}
                    </span>
                    <button style={removeButtonStyles} onClick={() => onRemove(todo.id)}>
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;