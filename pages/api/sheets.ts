import { google } from "googleapis";
import { getEnvironmentData } from "worker_threads";
import {
  getEnvironmentalData,
  giveValue,
} from "../../lib/functions/formatting";
import { SurveyResult } from "../../types/Students";
export async function getEmojiList() {
  try {
    const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      "kevintest@spess-forms.iam.gserviceaccount.com",
      null!,
      (
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDY9CVf5Vy/SJ2q\n2fG0kw3jMO3WAEVUfy6OEZW93OB4n3OeU/QpWQCyFGBGksXz0EKcgNqAjjv8qVuv\nrfqqFKzNoGxXdIOyzKGi+oqyPLCMWiSsThxYIEvBxYx4vhEad6fnx8X8r6WvQ9Au\nJj/DQy2hQu5YtYUiNNAdinn1B0OZOzoHBcl1Lk9mND3a6HjR1YdMxtz3kUSM9qyu\nKAupe/UGkLKOYVW4jM5fYP+WjiIOFqYIKPfnWjLhzCnWuvQYdmvNzPJUH0frLi2j\nB0bS8SHN691qXyZn8wAFH3ovvz88xp4z3VhWcRHXRVUGm2q+t+CtSSY2TSJapx+y\nyWMjXoGVAgMBAAECggEAE9mq0xkHoRIs0uVkDHM+sbXYB7I4pbWJS0MSogTj85rA\nl7ueEGvDTjKNEzKksrKFwGS4bqC/nlYvPGYSaZ4V/YPFxe60NMItBojJSJZC9Q8z\ntyGNIwcOx2j4JFKyT+tOIpKQa+v09edM1Jwio2QHIxpzomGMD9192TttUzJZ81q2\ndoUkW88YziEJbtmubvEFO/OoG8FbOOHoFinajIKU+Gmok+kuCIk1F48N68yATg4H\nBumYoflATqFd8kmzJxWXOKk0AEboh1Zml9KEqr2Yp2O0WIR8IpO09uTus31PZzfI\nkzirX2gv84EUMxh3JA/5kVqysTPU5oNn20W1JIsLFQKBgQDsMXoCOtVs5l/VU/ZK\ndzDdNPYYse/NOleNMG6McA9p5UNz4e6KWjM+b/aStB//WldEV0Xfa1gwmSO4iyYZ\nbVRAkS47qABBx5yIc9h7kOJlrLm/exijHqYdX5lmFK15HMZ6LOIFNDutNEmZK5O4\n5kmNLN1X0/WvRfcnfqK6+/FhwwKBgQDrJaPnokGTpoB6k6Y7lzgW2M4+yFmvsgjN\nmnk+D0Q07wLjgBKRO6/yEUAnOvxFAN1vDm3EU66waxxXzuQaAVr3NkiIBGKdatcj\nRmN/pwAd+2lfZtKIDRFOSsNqthm/cUBJz2ZJlNfaKzNN0I5hWNiIeCRASuxxX2L6\njSQtW+NBxwKBgQDjk4CFqX5+4TIxcCb89P8mBKOig8AUtEQrjCDYPBj95aMqguS+\ndc6uOF8SV3AFMFypQpXWga2FlehvJdPd6BOn6rrrTCKDPvu6FjTeSml5ogWPU+IX\nOa7A2p4JV58V9P3gNmLItN1TM/A+H1jEbU8tMa9LsrUk3nsXmNLe62ZW1QKBgE9P\nKrD9cNCz37F4CyEeJ7TM+wMB3/36Ni3iY/IihAa2dmr0z05cq0Mhvll884jyebzz\nSOJmtwyZk72p8hUzT9MBZAU8NWaSmm0zWGu9j7SND0U2ENwCTEvzu2VKdfSz5dL/\nOKioowTafTtJlDwREzc0DkYA/y5d1axb3k/OJiARAoGAYmbBNyIuToRIuXmKxElp\nD9a7hP5H5FpLbrPFL5fbkZF3HXx9giNYInZgzc+4WFJ069yThxmCkIzD6k200DHh\nPxBRZTMf8LUxOwSywUNZgZzaxaDKFpZSmDeWW2Dth9YO4q8KOqhL4/R0o+zNvqOB\nwRYFBQt8YUum4fTyHkbfGHo=\n-----END PRIVATE KEY-----\n" ||
        ""
      ).replace(/\\n/g, "\n"),
      target
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1t8HF0FYxnSWSc9fauKT7iKi1xIh1LzJ1Y7It-YXvtDA",
      range: "Form Responses 1", // sheet name
    });

    const rows = response.data.values;
    if (rows!.length) {
      let flag = true;
      let surveyType: SurveyResult[] = [];
      rows!.shift();

      rows!.map((row) => {
        if (row[0] == null) {
          flag = false;
        }
        if (flag) {
          let environment_value = getEnvironmentalData(row, 11);

          const environment_factors = {
            unwanted_noise: row[11],
            limited_space: row[12],
            household_chorse: row[13],
            comfortability: row[14],
            support: row[15],
            internet: row[16],
            device: row[17],
            faculty_readiness: row[18],
            value: environment_value,
          };

          const survey = {
            email: row[1],
            mobile: row[2],
            name: row[3],
            gender: row[4],
            grade: row[5],
            school: row[6],
            learning_type: row[7],
            learning_difficulty: row[8],
            effectivity_implementation: row[9],
            learning_performance_similarities: row[10],
            environment_factors: environment_factors,
            wifi: row[20],
            data: row[21],
            device: row[22],
            tech_difficulty: row[23],
            platform: row[24],
            accessible_usage: row[25],
          };

          let surveyData = giveValue(survey);
          surveyType.push(surveyData);
        }
        // console.log(giveValue(row as []));
      });
      return surveyType;
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}
