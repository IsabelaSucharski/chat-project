/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";
import { IMessage } from "../../@types";

interface MessagesContextProps {
  messages: IMessage[] | any;
  setMessages(messages: IMessage[] | any): void;
}

const MessagesContext = createContext<MessagesContextProps | any>(
  {} as MessagesContextProps
);

interface MessagesProviderProps {
  children: React.ReactNode;
}

export const MessagesProvider: React.FC<MessagesProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const context = {
    messages,
    setMessages,
  };

  return (
    <MessagesContext.Provider value={context}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = (): MessagesContextProps => {
  const context = useContext(MessagesContext);

  if (!context) {
    throw new Error("useMessages must be used within an MessagesProvider");
  }

  return context;
};
