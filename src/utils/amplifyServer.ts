import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { type ResourcesConfig } from "aws-amplify";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";

const amplifyConfig = {
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "",
      region: "ap-southeast-1",
      defaultAuthMode: "userPool",
    },
  },
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || "",
      userPoolClientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID || "",
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || "",
    },
  },
};

export const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyConfig as ResourcesConfig,
});

export const cookieBasedClient = generateServerClientUsingCookies({
  config: amplifyConfig as ResourcesConfig,
  cookies,
});
