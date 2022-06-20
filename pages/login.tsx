import React, { useEffect, useState } from "react";
import Image from "next/image";
import Intro from "../components/sections/Intro";
import axios, { AxiosResponseHeaders } from "axios";
import { useRouter } from "next/router";
import cookie from "cookie";

const login = (user: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUser] = useState<any>(user.user);
  const router = useRouter();

  useEffect(() => {
    if (users != null) {
      router.push("/getting-started");
    }
    //console.log(user);
  }, [users]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const credentials = { username, password };

    const user = await axios.post("/api/auth/login", credentials);

    setUser(user);
    //console.log(user);
  };

  const handleGetUser = async () => {
    const user = await axios.get("/api/user");

    //console.log(user);
  };

  const handleLogOut = async () => {
    const user = await axios.get("/api/auth/logout");

    //console.log(user);
  };

  const [page, setPage] = useState<number>(3);

  return (
    <React.Fragment>
      <div className="bg-[url('/bg-form.jpg')] bg-cover min-h-screen px-8 pt-6 pb-8 mb-4 flex flex-col">
        {page > 2 ? (
          <div className="flex justify-center">
            <div className="space-y-4 bg-ocean-100 w-1/2 my-10 rounded-2xl p-10">
              <div className="flex justify-center">
                <Image
                  src="/logo.png"
                  alt="logo picture"
                  width={100}
                  height={100}
                />
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-10">
                  <h3 className="font-semibold text-lg">Username:</h3>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={(value) => setUsername(value.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <h3 className="font-semibold text-lg">Password:</h3>
                  <input
                    className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={(value) => setPassword(value.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="rounded-full w-fit px-4 py-2 bg-ocean-300 text-white text-lg font-bold"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <button
                className="rounded-full w-fit px-4 py-2 bg-ocean-300 text-white text-lg font-bold"
                onClick={handleGetUser}
              >
                check user
              </button>
            </div>
          </div>
        ) : (
          <Intro page={page} setPage={setPage} />
        )}
      </div>
    </React.Fragment>
  );
};

export default login;

export async function getServerSideProps(context: any) {
  let headerCookie = context.req.headers.cookie;
  if (typeof headerCookie !== "string") {
    headerCookie = "";
  }
  const cookies: any = cookie.parse(headerCookie);

  const jwt = cookies.OursiteJWT;

  if (!jwt) {
    return { props: { user: null } };
  }

  return { props: { user: jwt } };
}
