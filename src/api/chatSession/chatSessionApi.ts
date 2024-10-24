import { SessionTodo, Todo } from "./types";

export const fetchSessionId = async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const sessionId = `sessionId-${Math.random().toString(36).substring(2, 9)}`
    return sessionId;
}

export const todoTemple: SessionTodo = {
    sessionId: "",
    todos: [{ id: "id1", title: "Morning", description: "Nothing"}]
}

export const fetchTodoList = async (sessionID: string | undefined): Promise<SessionTodo> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        sessionId: sessionID,
        todos: [
            { id: "id1", title: "Morning", description: "Nothing"},
            { id: "id2", title: "Afternoon", description: "Coding"},
            { id: "id3", title: "Evening", description: "Eating"},
            { id: "id1", title: "Dark", description: "Sleeping"},
        ]
    }
}
