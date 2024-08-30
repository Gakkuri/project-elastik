import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";

const logout = (AccessToken: string) => {
  const cognito = new CognitoIdentityServiceProvider();
  return new Promise(function (resolve, reject) {
    cognito.globalSignOut({ AccessToken }, (err, data) => {
      if (err) {
        reject(err);
      } else resolve("Access Token Revoked.");
    });
  });
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const { accessToken } = JSON.parse(event?.body || "");

  try {
    const data = await logout(accessToken);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
