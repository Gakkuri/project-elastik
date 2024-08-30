## Getting Started

First, run the SST development server using your own AWS account:

```bash
npx sst dev
```

After SST completed the build, it will show the environment variable keys, you can now assign them:

```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=GraphQLEndpoint
NEXT_PUBLIC_AUTH_ENDPOINT=AuthEndpoint
NEXT_PUBLIC_USER_POOL_ID=UserPoolId
NEXT_PUBLIC_APP_CLIENT_ID=ClientId
NEXT_PUBLIC_IDENTITY_POOL_ID=IdentityPoolId
```

Then, you can now run nextJS development server

```bash
npm run dev
```
