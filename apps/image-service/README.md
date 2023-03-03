# Build guide

After running `npm run build` and `turbo db:generate` from the monorepo root directory you'll have to copy some files over to the `dist` directory in here before proceeding to deploy

The following files needs to be copied

- From `packages/db/prisma/schema.prisma` to `apps/image-service/dist`
- From `node_modules/.prisma/client/libquery-engine_*` to `apps/image-service/dist`

With this done, the serverless function will run
