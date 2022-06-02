import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SelectedStudentProvider } from "../context/SelectedStudent";
import { SetClassroomProvider } from "../context/SetClassroom";
import { SelectedQuarterProvider } from "../context/SelectedQuarter";
import { SetJsonProvider } from "../context/SetJSON";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SetClassroomProvider>
      <SelectedStudentProvider>
        <SelectedQuarterProvider>
          <SetJsonProvider>
            <Component {...pageProps} />
          </SetJsonProvider>
        </SelectedQuarterProvider>
      </SelectedStudentProvider>
    </SetClassroomProvider>
  );
}

export default MyApp;
