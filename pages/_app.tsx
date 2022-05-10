import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SelectedStudentProvider } from "../context/SelectedStudent";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SelectedStudentProvider>
      <Component {...pageProps} />
    </SelectedStudentProvider>
  );
}

export default MyApp;
