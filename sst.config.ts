import { SSTConfig } from "sst";
import { NextjsSite, Table, AppSyncApi } from "sst/constructs";
import { MappingTemplate } from "aws-cdk-lib/aws-appsync";

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

      const api = new AppSyncApi(stack, "AppSyncApi", {
        schema: "src/graphql/schema.graphql",
        dataSources: {
          studentsDS: "src/functions/handler.handler",
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
      });

      stack.addOutputs({
        SiteUrl: site.url,
        ApiId: api.apiId,
        APiUrl: api.url,
        ApiKey: api.cdk.graphqlApi.apiKey || "",
      });
    });
  },
} satisfies SSTConfig;
