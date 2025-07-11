export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface TodoProps {
    todos: Todo[];
    onRemove: (id: number) => void;
}