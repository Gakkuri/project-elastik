import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify("SUCCESS"),
  };

  //Error Code
  // return {
  //       statusCode: 404,
  //       body: JSON.stringify({ error: true }),
  //     };
};
