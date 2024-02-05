import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Container } from "@mui/material";

import { router } from "./providers/router/config/routes";
import { client } from "@shared/config/apolloClientConfig/apollo-client";
import { Guard } from "../components/auth/Guard";
import { Header } from "@widgets/header";
import { Snackbar } from "@widgets/snackbar";
import { ThemeProvider } from "./providers/theme";

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Header />
        <Container>
          <Guard>
            <RouterProvider router={router} />
          </Guard>
        </Container>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
