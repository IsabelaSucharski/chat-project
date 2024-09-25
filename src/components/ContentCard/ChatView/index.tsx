/* eslint-disable @typescript-eslint/no-explicit-any */
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IMessage } from "../../../@types";
import { APIChat } from "../../../api";
import { Flor } from "../../../assets";
import { useDimension } from "../../../utils/hooks/useDimension";
import { useMessages } from "../../../utils/hooks/useMessages";
import { useTags } from "../../../utils/hooks/useTags";
import TagsSelect from "../../TagsSelect";
import { Footer, Header } from "../components";

const ChatView = () => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [sessionId, setSessionId] = useState<string | undefined>("");
  // const [userId, setUserId] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | string[]>([]);

  const { tagsList } = useTags();
  const { messages, setMessages } = useMessages();
  const { isMobile } = useDimension();

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollTo(0, 4000);
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => scrollToBottom(), [messages]);

  const handleMessages = useCallback(
    (message: IMessage) => {
      setMessages((prev: IMessage[]) => [...prev, message]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const memoizedMessages = useMemo(() => messages, [messages]);

  const handleSendMessage = useCallback(
    async (textValue: string) => {
      if (textValue) {
        const params = sessionId
          ? {
              question: textValue,
              user_id: "710393",
              tags: selectedTag,
              session_id: sessionId,
            }
          : { question: textValue, user_id: "710393", tags: selectedTag };

        handleMessages({
          question: textValue,
          session_id: sessionId,
        });

        const { data } = await APIChat.askBot(params);

        setSessionId(data.session);
        handleMessages({
          message: data.message,
          session: data.session,
        });
      }
    },
    [handleMessages, selectedTag, sessionId]
  );

  const handleResetChat = () => {
    setSessionId("");
    setMessages([]);
    setSelectedTag([]);
  };

  const handleSelectedTags = (_query?: any, tags?: string | string[] | any) => {
    setSelectedTag(tags);
  };

  return (
    <Card sx={{ height: "-webkit-fill-available" }}>
      <Header
        avatar={Flor}
        title="Flor"
        subheader="Sua assistente digital de RH"
        actionIcon={<RefreshIcon />}
        handleHeaderAction={handleResetChat}
        tagFilter={
          <TagsSelect
            options={tagsList}
            label="Tags"
            handleSearchDocuments={handleSelectedTags}
            tagFilterValue={!selectedTag ? [] : selectedTag}
          />
        }
      />
      <CardContent
        className="chatContent"
        ref={messagesEndRef}
        sx={{ height: isMobile ? "23rem  !important" : "" }}
      >
        {memoizedMessages?.map((chat: IMessage, index: number) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: chat.question ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: chat.question ? "flex-end" : "flex-start",
                maxWidth: "90%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: chat.question ? "#FFCBBE" : "#EFEFEF",
                  borderRadius: "12px",
                  padding: "10px",
                }}
              >
                <Typography align="left">
                  {chat.question ? chat.question : chat.message}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </CardContent>
      <Footer handleSendMessage={handleSendMessage} />
    </Card>
  );
};

export default ChatView;
