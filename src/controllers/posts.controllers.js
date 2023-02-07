//importamos el constructor prisma client desde el modulo @prisma/client
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";

// creamos una nueva instancia de prisma client
const prisma = new PrismaClient();

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ status: 400, message: "title y content son obligatorios" });
    }
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        // published: false,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ status: 400, message: "title es obligatorios" });
    }
    if (!id) {
      return res
        .status(400)
        .json({ status: 400, message: "id es obligatorio" });
    }

    //traemos el post actual
    const currentPost = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    const updatePost = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    });
    res
      .status(201)
      .json({ status: 201, message: "Post actualizado", updatePost });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ status: 400, message: "id es obligatorio" });
    }
    const deletePost = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    res
      .status(201)
      .json({ status: 201, message: "Post eliminado", deletePost });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};
