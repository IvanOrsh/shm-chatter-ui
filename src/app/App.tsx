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
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};

function App() {
  const { path } = usePath();

  const showChatList = path === "/" || path.includes("chats");

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Header />
        <Guard>
          {showChatList ? (
            <Grid container>
              <Grid item md={3}>
                <ChatList />
              </Grid>
              <Grid item md={9}>
                <Routes />
              </Grid>
            </Grid>
          ) : (
            <Routes />
          )}
        </Guard>

        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
