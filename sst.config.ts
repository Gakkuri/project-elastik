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
      const site = new NextjsSite(stack, "site");

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

      stack.addOutputs({
        Cognito: auth.id,
        SiteUrl: site.url,
        ApiId: api.apiId,
        APiUrl: api.url,
        ApiKey: api.cdk.graphqlApi.apiKey || "",
        LogoutApiEndpoint: loginApi.url,
      });
    });
  },
} satisfies SSTConfig;
