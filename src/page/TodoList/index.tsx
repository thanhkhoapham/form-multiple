import { ReactElement, useEffect, useState } from "react";
import { APP_NAME, BroadcastAction, SESSION_STORAGE } from "../..";
import { fetchSessionId, fetchTodoList, todoTemple } from "../../api/chatSession/chatSessionApi"
import { useSession } from "../../context/chatSession/SessionContext";
import { SessionTodo } from "../../api/chatSession/types";
import { Button } from "@mui/material";

const TodoList = (): ReactElement => {
    const {sessionID, setSessionId} = useSession();
    const [todo, setTodo] = useState<SessionTodo | null>(null);

    useEffect(() => {
        // const channel = new BroadcastChannel(APP_NAME);

        const fetchTodos = async () => {
            console.log("Fetch todo: ", sessionID)
            const todos = await fetchTodoList(sessionID);
            setTodo({...todos, todos: [...todoTemple.todos, ...todos.todos]})
        }
        const handleStorage = (event: any) => {
            if (event.key && event.newValue && event.storageArea === localStorage) {
                fetchTodos();
                console.log("ahihiiiiiii...")
            }
        }

        window.addEventListener("storage", handleStorage)

        return () => {
            // channel.close();
            window.removeEventListener("storage", handleStorage)
         };
    }, [])

    const createSession = async () => {
        // Call API
        const response = await fetchSessionId();
    
        console.log("new session: ", response)

        localStorage.setItem(SESSION_STORAGE, response);
        sessionStorage.setItem("Chat", response)

        // const channel = new BroadcastChannel(APP_NAME);

        // Notification same domain
        // channel.postMessage({type: BroadcastAction.NEW_SESSION, key: SESSION_STORAGE, value: response});
        // channel.close();
        console.log("item: ", localStorage.getItem(SESSION_STORAGE))
        setSessionId(response);
        const todos = await fetchTodoList(response);
        setTodo({...todos, todos: [...todoTemple.todos, ...todos.todos]})
    }


    const endSession = async () => {
        localStorage.removeItem(SESSION_STORAGE);
        const channel = new BroadcastChannel(APP_NAME);
        channel.postMessage({type: BroadcastAction.CLEAR_SESSION});
        channel.close();
        
        setSessionId("");
    }

    console.log("Session id: ", sessionID)
    console.log("item: 222", localStorage.getItem(SESSION_STORAGE))

    return <div className="p-[50px]">
                <Button onClick={createSession}>Start Session</Button>

        <h1>Todo List: </h1>
        {todo?.todos.map(todo => (
            <div className="rounded" key={todo.id}>
                <h1>Title: {todo.title}-Desciption: {todo.description}</h1>
            </div>
        ))}

        <Button onClick={endSession}>End Session</Button>

    </div>
}

export default TodoList;