import {
  Configuration,
  PopupRequest,
  PublicClientApplication,
} from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/brfcorp.onmicrosoft.com`,
    redirectUri: "http://localhost:3000",
  },
};
export const pca = new PublicClientApplication(msalConfig);
export const loginRequest: PopupRequest = {
  scopes: ["User.Read"],
};
