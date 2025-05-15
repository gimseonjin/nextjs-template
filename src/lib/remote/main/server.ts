import "server-only";

import { createApiClient } from "../createApiClient";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants/cookie-name";

export const createMainServerClient = async () => {
  const token = await getCookie(COOKIE_NAME.ACCESS_TOKEN, { cookies });

  return createApiClient(`http://localhost:3000/api`).bearerAuth(
    token as string
  );
};
