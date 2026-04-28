-- 1. Crear el ENUM de estados
CREATE TYPE "StatusName" AS ENUM ('PENDIENTE', 'EN_TRAMITE', 'FINALIZADO');

-- 2. RENOMBRAR en lugar de borrar (Evita pérdida de datos)
ALTER TABLE "Contact" RENAME COLUMN "name" TO "nombre";

-- 3. AÑADIR columnas nuevas como opcionales primero
ALTER TABLE "Contact" ADD COLUMN "phone" TEXT;
ALTER TABLE "Contact" ADD COLUMN "cedula" TEXT;

-- 4. LLENAR 'cedula' con un valor temporal para que no falle el NOT NULL/UNIQUE
UPDATE "Contact" SET "cedula" = '1234' || id WHERE "cedula" IS NULL;

-- 5. AHORA SÍ, poner restricciones a 'cedula'
ALTER TABLE "Contact" ALTER COLUMN "cedula" SET NOT NULL;
CREATE UNIQUE INDEX "Contact_cedula_key" ON "Contact"("cedula");

-- 6. Crear la tabla Service
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactId" INTEGER NOT NULL,
    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- 7. MIGRAR los datos de 'message' y 'subject' viejos a la nueva tabla Service
-- (Hacemos esto ANTES de borrar las columnas de la tabla Contact)
INSERT INTO "Service" ("subject", "descripcion", "contactId")
SELECT COALESCE("subject", 'Consulta General'), COALESCE("message", 'Sin descripción'), "id"
FROM "Contact";

-- 8. Crear la tabla de Historial
CREATE TABLE "ServiceHistory" (
    "id" SERIAL NOT NULL,
    "status" "StatusName" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serviceId" INTEGER NOT NULL,
    "comment" TEXT,
    CONSTRAINT "ServiceHistory_pkey" PRIMARY KEY ("id")
);

-- 9. (Opcional) Crear un estado PENDIENTE inicial para los servicios migrados
INSERT INTO "ServiceHistory" ("status", "serviceId", "comment")
SELECT 'PENDIENTE', "id", 'Estado inicial migrado' FROM "Service";

-- 10. LIMPIEZA: Ahora que los datos están a salvo en 'Service', borramos en 'Contact'
ALTER TABLE "Contact" DROP COLUMN "message";
ALTER TABLE "Contact" DROP COLUMN "subject";
-- Nota: Dejamos 'createdAt' en Contact si quieres conservar cuándo se registró el cliente

-- 11. Agregar las llaves foráneas
ALTER TABLE "Service" ADD CONSTRAINT "Service_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ServiceHistory" ADD CONSTRAINT "ServiceHistory_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
