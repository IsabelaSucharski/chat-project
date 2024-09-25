import CloseIcon from "@mui/icons-material/Close";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import { Box, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Markdown from "markdown-to-jsx";
import React from "react";
import { IDocumentsResponse } from "../../../@types";
import { useDimension } from "../../../utils/hooks/useDimension";
import { Header } from "../components";

const BlockquoteBox = (props: React.HTMLProps<HTMLQuoteElement>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref, ...otherProps } = props;

  return (
    <Box
      component="blockquote"
      sx={{
        fontFamily: "Noto Sans",
        fontStyle: "italic",
        paddingLeft: 2,
        borderLeft: "2px solid #ddd",
        color: "#666",
      }}
      {...otherProps}
    />
  );
};

interface IDocumentView {
  document: IDocumentsResponse[];
  handleShowDocument: (value: boolean, document: IDocumentsResponse[]) => void;
}

const DocumentView: React.FC<IDocumentView> = ({
  document,
  handleShowDocument,
}) => {
  const { isMobile } = useDimension();

  return (
    <Card sx={{ height: "-webkit-fill-available" }}>
      <Header
        avatar={<PlagiarismIcon color="secondary" />}
        title={document[0]?.title}
        subheader={`Origem: ${document[0]?.source}`}
        actionIcon={<CloseIcon />}
        handleHeaderAction={() => handleShowDocument(false, [])}
      />
      <CardContent
        className="documentContent"
        sx={{ height: isMobile ? "23rem !important" : "" }}
      >
        {document.map((doc: IDocumentsResponse, index: number) => (
          <>
            <Box
              key={index}
              sx={{
                textAlign: "left",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "143%",
                letterSpacing: "0.15px",
              }}
            >
              <Markdown
                key={index}
                options={{
                  overrides: {
                    blockquote: {
                      component: BlockquoteBox,
                    },
                  },
                }}
              >
                {`${doc?.chunk}`}
              </Markdown>
            </Box>
            <hr />
          </>
        ))}
      </CardContent>
    </Card>
  );
};

export default DocumentView;
