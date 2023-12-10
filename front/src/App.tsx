import Router from "./router/Router";
import { RecoilRoot } from "recoil";
import { Global, ThemeProvider } from "@emotion/react";
import globalStyle from "./style/global";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import theme from "./style/Theme";

const queryClient = new QueryClient();
function App() {
  return (
    <RecoilRoot>
      <Global styles={globalStyle} />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
      {/* <ReactQueryDevtools initialIsOpen={true} position={"right"} /> */}
    </RecoilRoot>
  );
}

export default App;
