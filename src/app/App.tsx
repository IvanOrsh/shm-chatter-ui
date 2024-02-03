// TODO: extract apollo provider
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { router } from "./providers/router/config/routes";
import client from "../constants/apollo-client";
import { Guard } from "../components/auth/Guard";
import Header from "../components/header/Header";
import { Snackbar } from "@widgets/snackbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
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
