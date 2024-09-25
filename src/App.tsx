import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { theme } from "../src/styles";
import Home from "./pages/Home";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AuthProvider } from "./utils/hooks/authProvider";
import { DimensionProvider } from "./utils/hooks/useDimension";
import { DocumentsProvider } from "./utils/hooks/useDocuments";
import { MessagesProvider } from "./utils/hooks/useMessages";
import { TagsProvider } from "./utils/hooks/useTags";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
            <ToastContainer
              hideProgressBar
              position="bottom-left"
              theme="colored"
              autoClose={3000}
            />
            <AuthProvider>
              <DimensionProvider>
                <DocumentsProvider>
                  <TagsProvider>
                    <MessagesProvider>
                      <Home />
                    </MessagesProvider>
                  </TagsProvider>
                </DocumentsProvider>
              </DimensionProvider>
            </AuthProvider>
          </QueryClientProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
