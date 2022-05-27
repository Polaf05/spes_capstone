import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useClassroom } from "../hooks/useSetClassroom";

const Dashboard = () => {
  const { students } = useClassroom();
  const [quarters, setQuarters] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!students) {
      router.back();
    } else {
      let qSum: any = 0;
      students[0].quarter?.map((quarter) => {
        qSum +=
          quarter.written_works?.length! > 0 ||
          quarter.performance_tasks?.length! > 0
            ? 1
            : 0;
      });

      var buttons: number[] = [];
      for (var i = 1; i <= qSum; i++) {
        buttons.push(i);
      }
      console.log(buttons);
      setQuarters(buttons);
    }
  }, []);

  return (
    <>
      {students && (
        <div className="m-4">
          <div className="w-40 h-40 p-2">
            <Image
              src="/logo.png"
              alt="logo picture"
              width={100}
              height={100}
            />
          </div>
          <div className="grid place-content-center">
            <div>
              <h1 className="text-2xl font-bold">Classroom Evaluation:</h1>
            </div>
            <div className="flex gap-4">
              {quarters.map((button, idx) => (
                <div key={idx}>
                  <Link href={`/${button}`} passHref>
                    <button className="rounded-3xl w-60 h-40 bg-ocean-100 grid place-items-center">
                      <h3 className="font-semibold text-lg">
                        Quarter {button}
                      </h3>
                    </button>
                  </Link>
                </div>
              ))}
              <pre>
                {/* {quarters ? JSON.stringify(quarters, null, 2) : "No data"} */}
              </pre>
            </div>
          </div>
          <div className=""></div>
        </div>
      )}
    </>
  );
};

export default Dashboard;