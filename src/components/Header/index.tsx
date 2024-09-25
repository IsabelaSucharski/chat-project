import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { BrfLogo } from "../../assets";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box
            component="img"
            src={BrfLogo}
            alt="logo"
            maxWidth="85px"
            maxHeight="39.844px"
            mr={3}
          />
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            fontFamily="'Co Headline'"
            className="header"
          >
            BP Virtual
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default Header;
