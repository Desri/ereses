import Cookies from "js-cookie";

export const getAccessToken = (): string | undefined => {
  return Cookies.get("accessToken");
};
