# Rest API example with vite as task runner made in typescript with Zod validation

> based on this article [post]('https://dev.to/osalumense/validating-request-data-in-expressjs-using-zod-a-comprehensive-guide-3a0j')

> companion validation DTO and Entity [post]('https://dev.to/zzdjk6/typescript-zod-and-mongodb-a-guide-to-orm-free-data-access-layers-2ah5')

## install

```
pnpm add vite vite-node typescript @types/node express @types/express

pnpm add vite-plugin-node

pnpm add @swc/core zod body-parser
```
and run
 ```
 pnpm dev
```

here vite is just for the build 

instead i use ts-node-dev for HMR

```
pnpm add -D ts-node-dev
```