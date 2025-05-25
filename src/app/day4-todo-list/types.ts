export interface Todo {
  id: number;
  text: string;
  createdAt: Date;
}

export interface TodoFormProps {
  onAdd: (text: string) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
} 