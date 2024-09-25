import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { ChatView, DocumentView, DocumentsTab, SettingsTab, TagsTab } from "..";
import { IDocumentsResponse } from "../../@types";
import { useDimension } from "../../utils/hooks/useDimension";
import { useDocuments } from "../../utils/hooks/useDocuments";

const Layout = () => {
  const [value, setValue] = useState(0);

  const { showDocument, setShowDocument, document, setDocument } =
    useDocuments();

  const { isMobile } = useDimension();

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleShowDocument = (
    value: boolean,
    document: IDocumentsResponse[]
  ) => {
    setShowDocument(value);
    setDocument(document);
  };

  useEffect(() => {
    if (value !== 0) setShowDocument(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Box
      display="flex"
      gap="32px"
      height="100%"
      flexDirection={isMobile ? "column" : "row"}
    >
      <Box
        width={isMobile ? "100%" : "55%"}
        flexDirection="column"
        display="flex"
      >
        <div>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Documentos" />
            <Tab label="Tags" />
            <Tab label="Configurações" />
          </Tabs>
        </div>
        <Box height="100%">
          {value === 0 && (
            <DocumentsTab
              handleShowDocument={handleShowDocument}
              handleActionButton={showDocument}
              tabsValue={value}
            />
          )}
          {value === 1 && <TagsTab />}
          {value === 2 && <SettingsTab />}
        </Box>
      </Box>
      <Box
        width={isMobile ? "100%" : "45%"}
        position="relative"
        top={isMobile ? "0" : "-70px"}
        zIndex={isMobile ? 0 : 1300}
        height="113%"
      >
        {showDocument ? (
          <DocumentView
            document={document}
            handleShowDocument={handleShowDocument}
          />
        ) : (
          <ChatView />
        )}
      </Box>
    </Box>
  );
};

export default Layout;
