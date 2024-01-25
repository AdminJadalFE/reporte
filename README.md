# Jadal Frontend Migracion
## React

Pre requisitos para la instalación

- Node
- NPM
- React

## Instalación

Instalación en localhost

```sh
cd proyecto
via npm
    npm install
    npm run dev
via yarn
    yarn install
    yarn dev
Si hay problemas
eliminar package-lock.json o yarn-lock file
npm install --force
npm install--legacy-peer-deps
```

En producción desplegado en Amplify AWS 

```sh
npm install --production
NODE_ENV=production node app
```

## Enlaces

Enlaces del proyeto

| Proyecto | README |
| ------ | ------ |
| Dashtic - Typescript React Premium Admin Template | [https://react.spruko.com/dashtic-ts/preview/] |

## Despliegue AWS 

Servicio de Amplify rama desarrollo conectada con amplify

```sh
git add .
git commit -m "commit"
git push origin desarrollo
```
