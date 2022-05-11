import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SelectedStudentProvider } from "../context/SelectedStudent";
import { SetClassroomProvider } from "../context/SetClassroom";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SetClassroomProvider>
      <SelectedStudentProvider>
        <Component {...pageProps} />
      </SelectedStudentProvider>
    </SetClassroomProvider>
  );
}

export default MyApp;
