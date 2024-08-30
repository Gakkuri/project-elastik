import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import {CognitoIdentityServiceProvider} from "aws-sdk";


const authenticate = (body: {username: String, password: String}) => {
  const cognito = new CognitoIdentityServiceProvider();
  return new Promise(function(resolve, reject) {
    cognito.initiateAuth({
      AuthFlow: "USER_PASSWORD_AUTH", 
      ClientId: "2qmae6t4tqvchai5jdhmknj0gr",
      AuthParameters: {
        USERNAME: body.username, 
        PASSWORD: body.password    // Replace with the password
      }
    }, (err: Record<string, unknown>, data: Record<string, unknown>) => {
      if (err) {
        reject(err);
      } else if (data == null) {
        reject("Credentials is null");
      } else resolve(data);
    })   
  })
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {

  const body = JSON.parse(event?.body || "");

  try {
    const data = await authenticate(body);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
