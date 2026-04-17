%Proyecto con Nestjs y Prisma Backen Backend y Angular Para Fronted, ese proyecto crear un formulario de contacto y lo guarda y envia un mensaje de exito


#Crear Carpeta del Backen en NestJS
sudo npm install -g @nestjs/cli #Instalador
nest new backend --package-manager npm Creacion del Backen (Logica)
npx prisma migrate dev --name inicializar_contactos
npx prisma migrate dev --name init
npx prisma migrate dev
npm run start:dev levantar la aplicacion
npm install prisma@6 @prisma/client@6
nest generate resource contacts --no-spec

#Prisma

nest generate service prisma
npx prisma init
npm install prisma --save-dev
rm -rf dist
npx prisma generate
npx prisma migrate dev --name add_subject_to_contact

Frontend
ng generate service services/contacto
ng generate component components/contacto-form
ng build
ng serve -o

ng g m shared
ng g c shared/components/navbar
ng g c shared/components/footer

ng build
ng serve -o
ng g m home
ng g c home/components/banner



#Estructura de Backend
backend/
├── src/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── auth.controller.ts
│   ├── prisma/
│   │   └── prisma.module.ts
│   ├── contacts/
│   │   └── contacts.module.ts
│   ├── app.module.ts      <-- Aquí es donde importas los módulos anteriores
│   └── main.ts
└── ...


#Estructura del Frontend
frontend/
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.ts
│   │   └── Navbar.ts
│   ├── pages/
│   │   ├── Login.ts
│   │   └── Dashboard.ts
│   ├── services/
│   │   └── api.ts
│   └── App.ts