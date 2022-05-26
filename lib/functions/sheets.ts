import { google } from "googleapis";
import { getEnvironmentalData, giveValue } from "./formatting";
import { SurveyResult } from "../../types/Students";
import axios from "axios";

export async function getSurveyList(link: string) {
  const sheets = link.split("/");

  const sheetId = sheets[5];
  try {
    // const data = await axios
    //   .post("http://localhost:3000/api/test", { sheetId: sheetId })
    //   .then((res) => res.data);

    const data = await axios
      .post("/api/test", { sheetId: sheetId })
      .then((res) => res.data);

    const rows = data.data.values;
    if (rows!.length) {
      if (
        rows[0][9] !==
        "How effective do you believe the implementation of remote learning was in alleviating the education crisis in your school in the midst of a pandemic?"
      ) {
        return null;
      } else {
        let flag = true;
        let surveyType: SurveyResult[] = [];
        rows!.shift();

        rows!.map((row: any) => {
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
              tech_difficulty: row[23] / 10,
              platform: row[24],
              accessible_usage: row[25] / 10,
            };

            let surveyData = giveValue(survey);
            surveyType.push(surveyData);
          }
          // console.log(giveValue(row as []));
        });
        return surveyType;
      }
    }
  } catch (err) {}
  return null;
}
