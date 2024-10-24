import { useContext, createContext, useState, useEffect, ReactElement } from "react";
import { APP_NAME, BroadcastAction, SESSION_STORAGE } from "../..";
import { fetchSessionId, fetchTodoList } from "../../api/chatSession/chatSessionApi";

const SessionContext = createContext<any | null>(null);

export const useSession = () => useContext(SessionContext);

interface Props {
    children: ReactElement
}

export const SessionProvider = ({ children}: Props) => {
    const [sessionId, setSessionId] = useState(localStorage.getItem(SESSION_STORAGE) || "");
     
    useEffect(() => {
        const initSession = async () => {
            const session = await fetchSessionId();

            if(!sessionId) {
                try {
                    const sessionIDD = await fetchSessionId();
                    if (sessionIDD) {
                        console.log("111111111111111")
                        localStorage.setItem(SESSION_STORAGE, sessionId);
                        sessionStorage.setItem("Chat", `${session}`)

                        setSessionId(sessionId);
                    } else {
                        console.error("Error..........");
                        setSessionId("")
                    }
                } catch {
                    sessionStorage.setItem("Chat", `${session}`)
                }
            }
        }

        initSession();

        // const channel = new BroadcastChannel(APP_NAME);
        // channel.onmessage = (event) => {
        //     if (event.data.type === BroadcastAction.NEW_SESSION && event.data.key && event.data[SESSION_STORAGE]) {

        //     localStorage.setItem(SESSION_STORAGE, event.data[SESSION_STORAGE]);
        //     setSessionId(event.data[SESSION_STORAGE]);
        //     } else if (event.data.action === BroadcastAction.CLEAR_SESSION) {
        //     localStorage.removeItem(SESSION_STORAGE);
        //     setSessionId("");
        //     };
        // }

        const handleStorage = (event: any) => {
            if (event.key && event.newValue && event.storageArea === localStorage) {
                console.log("Change......")
            }
        }

        window.addEventListener("storage", handleStorage)

        return () => { 
            // channel.close();
            window.removeEventListener("storage", handleStorage)
         };
    }, []);

    return <SessionContext.Provider value={{sessionId: sessionId, setSessionId}}>
        {children}
    </SessionContext.Provider>
}