import Router from "./router/Router";
import { RecoilRoot } from "recoil";
import { Global, ThemeProvider } from "@emotion/react";
import globalStyle from "./style/global";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import theme from "./style/Theme";
import { GlobalConfirmModal } from "./components/_common/ConfirmModal";
import { useEffect } from "react";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: (error) => {
          throw new Error("This error is handled");
        },
      },
    },
  });
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <RecoilRoot>
      <Global styles={globalStyle} />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalConfirmModal />
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
      {/* <ReactQueryDevtools initialIsOpen={true} position={"right"} /> */}
    </RecoilRoot>
  );
}

export default App;
