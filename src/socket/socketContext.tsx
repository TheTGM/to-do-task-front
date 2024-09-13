import React, { createContext, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const SocketContext = createContext<SocketContextProps | undefined>(
  undefined
);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = () => {
    if (!socket) {
      const newSocket = io(`${import.meta.env.VITE_BASE_URL_SOCKET}`);
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected to WebSocket");
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from WebSocket");
      });
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
