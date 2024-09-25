/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import { IMessage } from "../../@types";

interface DimensionContextProps {
  dimension: IMessage[] | any;
  setDimension(dimension: IMessage[] | any): void;
  isMobile: boolean;
}

const DimensionContext = createContext<DimensionContextProps | any>(
  {} as DimensionContextProps
);

interface DimensionProviderProps {
  children: React.ReactNode;
}

export const DimensionProvider: React.FC<DimensionProviderProps> = ({
  children,
}) => {
  const [dimension, setDimension] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setDimension(window.innerWidth);

    if (window.innerWidth < 900) {
      setIsMobile(true);
    }
  }, []);

  const context = {
    dimension,
    setDimension,
    isMobile,
  };

  return (
    <DimensionContext.Provider value={context}>
      {children}
    </DimensionContext.Provider>
  );
};

export const useDimension = (): DimensionContextProps => {
  const context = useContext(DimensionContext);

  if (!context) {
    throw new Error("useDimension must be used within an DimensionProvider");
  }

  return context;
};
