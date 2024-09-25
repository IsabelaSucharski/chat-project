import { Container, Paper } from "@mui/material";
import { Header, Layout, NoAccess } from "../../components";
import { useAuth } from "../../utils/hooks/authProvider";
import { useDimension } from "../../utils/hooks/useDimension";

const Home = () => {
  const { isMobile } = useDimension();
  const { user } = useAuth();

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        disableGutters
        sx={{ overflow: isMobile ? "auto" : "visible" }}
      >
        {user.roles.some((role) => role.includes("flor")) ? (
          <Paper className="pagePaper" elevation={0}>
            <Layout />
          </Paper>
        ) : (
          <NoAccess />
        )}
      </Container>
    </>
  );
};

export default Home;
