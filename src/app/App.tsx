import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Container, Grid } from "@mui/material";

import { router } from "./providers/router/config/routes";
import { client } from "@shared/config/apolloClientConfig/apollo-client";
import { Guard } from "./providers/router/guards/Guard";
import { Header } from "@widgets/header";
import { Snackbar } from "@widgets/snackbar";
import { ThemeProvider } from "./providers/theme";
import ChatList from "components/chat-list/ChatList";
import { usePath } from "./providers/router";

const Routes = () => {
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};

function App() {
  const { path } = usePath();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Header />
        <Guard>
          {path === "/" ? (
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
