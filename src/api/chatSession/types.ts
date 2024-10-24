export interface Todo {
    id: string,
    title: string,
    description: string
}

export interface SessionTodo {
    sessionId?: string,
    todos: Todo[]
}