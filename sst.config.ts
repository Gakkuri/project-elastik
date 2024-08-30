import { SSTConfig } from "sst";
import { NextjsSite, Table, AppSyncApi, Api, Cognito } from "sst/constructs";
import * as appsync from "aws-cdk-lib/aws-appsync";

export default {
  config(_input) {
    return {
      name: "project-elastik",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const auth = new Cognito(stack, "Auth", {
        login: ["email", "phone", "username", "preferredUsername"],
      });

      const table = new Table(stack, "Students", {
        fields: {
          id: "string",
          first_name: "string",
          last_name: "string",
          email: "string",
          date_of_birth: "string",
        },
        primaryIndex: { partitionKey: "id" },
      });

      const loginApi = new Api(stack, "api", {
        routes: {
          "POST /login": "src/functions/login/login.handler",
          "POST /logout": "src/functions/login/logout.handler",
        },
      });

      const api = new AppSyncApi(stack, "AppSyncApi", {
        schema: "src/graphql/schema.graphql",
        dataSources: {
          studentsDS: "src/functions/student/handler.handler",
        },
        defaults: {
          function: {
            // Bind the table name to the function
            bind: [table],
          },
        },
        resolvers: {
          "Query    listStudents": "studentsDS",
          "Mutation createStudent": "studentsDS",
          "Mutation deleteStudent": "studentsDS",
        },
        cdk: {
          graphqlApi: {
            authorizationConfig: {
              defaultAuthorization: {
                authorizationType: appsync.AuthorizationType.USER_POOL,
                userPoolConfig: {
                  userPool: auth.cdk.userPool,
                },
              },
            },
          },
        },
      });

      auth.attachPermissionsForAuthUsers(stack, [api, table]);
      auth.attachPermissionsForUnauthUsers(stack, [loginApi]);

      const site = new NextjsSite(stack, "site", {
        environment: {
          NEXT_PUBLIC_GRAPHQL_ENDPOINT: api.url,
          NEXT_PUBLIC_AUTH_ENDPOINT: loginApi.url,
          NEXT_PUBLIC_USER_POOL_ID: auth.userPoolId,
          NEXT_PUBLIC_APP_CLIENT_ID: auth.userPoolClientId,
          NEXT_PUBLIC_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
        ClientId: auth.userPoolClientId,
        UserPoolId: auth.userPoolId,
        IdentityPoolId: auth.cognitoIdentityPoolId,
        GraphQLEndpoint: api.url,
        AuthEndpoint: loginApi.url,
      });
    });
  },
} satisfies SSTConfig;
