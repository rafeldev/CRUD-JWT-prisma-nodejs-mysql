// //importamos el constructor prisma client desde el modulo @prisma/client
// // const { PrismaClient } = require("@prisma/client");
// import { PrismaClient } from "@prisma/client";

// // creamos una nueva instancia de prisma client
// const prisma = new PrismaClient();

// // creamos una función asíncrona para enviar consultas a la db
// async function main() {
//   // creamos un nuevo usuario apuntando a la tabla en la db - create
//   // para crear un listado de usuarios, usamos createMany
//   // aca creamos los registros en la db
//   const createPost = await prisma.post.createMany({
//     data: [
//       {
//         title: "titulo 1",
//         content: "Este es el primer post",
//       },
//       {
//         title: "titulo 2",
//         content: "Este es el segundo post",
//       },
//       {
//         title: "titulo 3",
//         content: "Este es el tercer post",
//       },
//     ],
//   });

//   //ahora vamos a leer todos los registros de la db - findMany
//   // const readPost = await prisma.post.findMany();

//   //ahora vamos a leer un solo registro de la db - findUnique
//   // const readPost = await prisma.post.findUnique({
//   //   //podemos filtrar con cualquier condicion
//   //   where: {
//   //     id: 3,
//   //   },
//   // });

//   //ahora vamos a actualizar un registro de la db - update
//   // const updatePost = await prisma.post.update({
//   //   where: {
//   //     id: 3,
//   //   },
//   //   data: {
//   //     title: "titulo 3 actualizado por primera vez",
//   //     content: "Este es el tercer post actualizado por primera vez",
//   //   },
//   // });

//   //ahora vamos a eliminar un registro de la db - delete
//   // const deletePost = await prisma.post.delete({
//   //   where: {
//   //     id: 3,
//   //   },
//   // });

//   console.log(createPost);
// }

// // lalamos a la función main
// main()
//   .catch((e) => {
//     throw e;
//   })
//   // si todo sale bien, cerramos la conexión con la db
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
