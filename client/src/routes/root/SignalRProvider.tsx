import { ReactNode, useContext } from "react";
import { SignalRContext } from "../../contexts/SignalRContext";
import { AuthContext } from "../../contexts/AuthContext";

interface SignalRProviderProps {
    children: ReactNode;
  }

export default function SignalRProvider({ children } : SignalRProviderProps) {
    const authContext = useContext(AuthContext);

    if (authContext?.currentUser) {
        console.log('Authenticated!');
    }

    return (
        <SignalRContext.Provider
            connectEnabled={authContext?.currentUser ? true : false}
            accessTokenFactory={() =>
            "https://kllejero.dev/api/notification/notificationHub"
            }
            dependencies={["https://kllejero.dev/api/notification/notificationHub"]} //remove previous connection and create a new connection if changed
            url={"https://kllejero.dev/api/notification/notificationHub" /* TODO: add to env*/}
        >
            {children}
        </SignalRContext.Provider>
    )
}