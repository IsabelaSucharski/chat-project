/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";
import { IDocumentsResponse } from "../../@types";
import { APIDocument } from "../../api";

interface DocumentsContextProps {
  showDocument: boolean;
  setShowDocument(show: boolean | any): void;
  documentsCount: number;
  setDocumentsCount(count: number): void;
  document: IDocumentsResponse[];
  setDocument(document: IDocumentsResponse[] | any): void;
  handleDocumentsCount: () => void;
}

const DocumentsContext = createContext<DocumentsContextProps | any>(
  {} as DocumentsContextProps
);

interface DocumentsProviderProps {
  children: React.ReactNode;
}

export const DocumentsProvider: React.FC<DocumentsProviderProps> = ({
  children,
}) => {
  const [showDocument, setShowDocument] = useState(false);
  const [documentsCount, setDocumentsCount] = useState<number | any>(0);
  const [document, setDocument] = useState<IDocumentsResponse[] | any>([]);

  const handleDocumentsCount = async () => {
    const params = {
      query: "",
      bot: "rh",
      tags_name: [],
      aggregate: true,
    };
    const { amount } = await APIDocument.getDocumentsCount(params);
    setDocumentsCount(amount);
  };

  const context = {
    showDocument,
    setShowDocument,
    document,
    setDocument,
    documentsCount,
    setDocumentsCount,
    handleDocumentsCount,
  };
  return (
    <DocumentsContext.Provider value={context}>
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocuments = (): DocumentsContextProps => {
  const context = useContext(DocumentsContext);

  if (!context) {
    throw new Error("useTags must be used within an TagsProvider");
  }

  return context;
};
