import { COOKIE_NAME } from "@/constants/cookie-name";
import { createApiClient } from "../createApiClient";
import { getCookie } from "cookies-next/client";

export const createMainClient = () =>
  createApiClient(`http://localhost:3000/api`).bearerAuth(
    getCookie(COOKIE_NAME.ACCESS_TOKEN) || ""
  );
