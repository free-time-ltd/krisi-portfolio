# Kristina Kostova Portfolio Website

Modern portfolio powered by modern tech stack for a modern artist.

Migrating from Laravel 5 monolith to Turborepo/NextJS/tRPC/Prisma stack keeping all the database and whatnot

- Database provided by PlanetScale,
- Image upload and crop/resizer provided by AWS Lambda
- NextJS hosting provided by Vercel on Edge
- Frontend stack done by using TailwindCSS

To begin run the following commands

```bash
npm install
turbo db:generate
turbo db:push
turbo db:seed
turbo dev
```

Once you are done with debugging you can build the project using the following commands

```bash
turbo build
turbo sls:deploy
```

Congratulations. Portfolio is operational!
