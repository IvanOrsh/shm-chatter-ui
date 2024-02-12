import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Container, Grid } from "@mui/material";

import { ThemeProvider } from "./providers/theme";
import { router } from "./providers/router/config/routes";
import { usePath } from "./providers/router";
import { Guard } from "./providers/router/guards/Guard";
import { client } from "@shared/config/apolloClientConfig/apollo-client";
import { Header } from "@widgets/header";
import { Snackbar } from "@widgets/snackbar";
import { ChatList } from "@features/get-chat";
const Routes = () => {
  return <RouterProvider router={router} />;
};

function App() {
  const { path } = usePath();

  const showChatList = path === "/" || path.includes("chats");

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Header />
        <Guard>
          <Container maxWidth="xl" sx={{ marginTop: "1rem" }}>
            {showChatList ? (
              <Grid container spacing={5}>
                <Grid item xs={12} md={5} lg={4} xl={3}>
                  <ChatList />
                </Grid>
                <Grid item xs={12} md={7} lg={8} xl={9}>
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>

        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
