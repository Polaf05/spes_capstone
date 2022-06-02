import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SelectedStudentProvider } from "../context/SelectedStudent";
import { SetClassroomProvider } from "../context/SetClassroom";
import { SelectedQuarterProvider } from "../context/SelectedQuarter";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SetClassroomProvider>
      <SelectedStudentProvider>
        <SelectedQuarterProvider>
          <Component {...pageProps} />
        </SelectedQuarterProvider>
      </SelectedStudentProvider>
    </SetClassroomProvider>
  );
}

export default MyApp;
