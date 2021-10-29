import express from "express";

import fs from "fs";

import uniqid from "uniqid";

import path, { dirname } from "path";

import { fileURLToPath } from "url";

import { parseFile, uploadFile } from "../../utils/upload/index.js";

import {
  checkBlogPostSchema,
  checkCommentSchema,
  checkSearchSchema,
  checkValidationResult,
} from "./validation.js";

// import { blogsFilePath } from "../../utils/upload/index.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const mediaRouter = express.Router();

// get all media
mediaRouter.get("/media", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});


// post media
mediaRouter.post(
  "/media", async (req, res, next) => {
    try {
      const media = {
        id: uniqid(),
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const fileAsBuffer = fs.readFileSync(blogsFilePath);

      const fileAsString = fileAsBuffer.toString();

      const fileAsJSONArray = JSON.parse(fileAsString);

      fileAsJSONArray.push(blog);

      fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));

      res.send(blog);
    } catch (error) {
      res.send(500).send({ message: error.message });
    }
  }
);

// get single media
mediaRouter.get("/media/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);

    const fileAsString = fileAsBuffer.toString();

    const fileAsJSONArray = JSON.parse(fileAsString);

    const blog = fileAsJSONArray.find((blog) => blog.id === req.params.id);
    if (!blog) {
      res
        .status(404)
        .send({ message: `blog with ${req.params.id} is not found!` });
    }
    res.send(blog);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

mediaRouter.get("/:id/comments", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);

    const fileAsString = fileAsBuffer.toString();

    const fileAsJSONArray = JSON.parse(fileAsString);

    const blog = fileAsJSONArray.find((blog) => blog.id === req.params.id);
    if (!blog) {
      res
        .status(404)
        .send({ message: `blog with ${req.params.id} is not found!` });
    }

    blog.comments = blog.comments || [];
    res.send(blog.comments);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// delete  blog
mediaRouter.delete("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);

    const fileAsString = fileAsBuffer.toString();

    let fileAsJSONArray = JSON.parse(fileAsString);

    const blog = fileAsJSONArray.find((blog) => blog.id === req.params.id);
    if (!blog) {
      res
        .status(404)
        .send({ message: `blog with ${req.params.id} is not found!` });
    }
    fileAsJSONArray = fileAsJSONArray.filter(
      (blog) => blog.id !== req.params.id
    );
    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
    res.status(204).send();
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

//  update blog
mediaRouter.put("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);

    const fileAsString = fileAsBuffer.toString();

    let fileAsJSONArray = JSON.parse(fileAsString);

    const blogIndex = fileAsJSONArray.findIndex(
      (blog) => blog.id === req.params.id
    );
    if (!blogIndex == -1) {
      res
        .status(404)
        .send({ message: `blog with ${req.params.id} is not found!` });
    }
    const previousblogData = fileAsJSONArray[blogIndex];
    const changedblog = {
      ...previousblogData,
      ...req.body,
      updatedAt: new Date(),
      id: req.params.id,
    };
    fileAsJSONArray[blogIndex] = changedblog;

    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
    res.send(changedblog);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

mediaRouter.post(
  "/:id/comment",
  checkCommentSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { text, userName } = req.body;
      const comment = { id: uniqid(), text, userName, createdAt: new Date() };
      const fileAsBuffer = fs.readFileSync(blogsFilePath);

      const fileAsString = fileAsBuffer.toString();

      let fileAsJSONArray = JSON.parse(fileAsString);

      const blogIndex = fileAsJSONArray.findIndex(
        (blog) => blog.id === req.params.id
      );
      if (!blogIndex == -1) {
        res
          .status(404)
          .send({ message: `blog with ${req.params.id} is not found!` });
      }
      const previousblogData = fileAsJSONArray[blogIndex];
      previousblogData.comments = previousblogData.comments || [];
      const changedblog = {
        ...previousblogData,
        ...req.body,
        comments: [...previousblogData.comments, comment],
        updatedAt: new Date(),
        id: req.params.id,
      };
      fileAsJSONArray[blogIndex] = changedblog;

      fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
      res.send(changedblog);
    } catch (error) {
      console.log(error);
      res.send(500).send({ message: error.message });
    }
  }
);

mediaRouter.put(
  "/:id/comment",
  checkCommentSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { text, userName } = req.body;
      const comment = { id: uniqid(), text, userName, createdAt: new Date() };
      const fileAsBuffer = fs.readFileSync(blogsFilePath);

      const fileAsString = fileAsBuffer.toString();

      let fileAsJSONArray = JSON.parse(fileAsString);

      const blogIndex = fileAsJSONArray.findIndex(
        (blog) => blog.id === req.params.id
      );
      if (!blogIndex == -1) {
        res
          .status(404)
          .send({ message: `blog with ${req.params.id} is not found!` });
      }
      const previousblogData = fileAsJSONArray[blogIndex];
      previousblogData.comments = previousblogData.comments || [];
      const changedblog = {
        ...previousblogData,
        ...req.body,
        comments: [...previousblogData.comments, comment],
        updatedAt: new Date(),
        id: req.params.id,
      };
      fileAsJSONArray[blogIndex] = changedblog;

      fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
      res.send(changedblog);
    } catch (error) {
      console.log(error);
      res.send(500).send({ message: error.message });
    }
  }
);

mediaRouter.put(
  "/:id/cover",
  parseFile.single("cover"),
  async (req, res, next) => {
    try {
      const fileAsBuffer = fs.readFileSync(blogsFilePath);

      const fileAsString = fileAsBuffer.toString();

      let fileAsJSONArray = JSON.parse(fileAsString);

      const blogIndex = fileAsJSONArray.findIndex(
        (blog) => blog.id === req.params.id
      );
      if (!blogIndex == -1) {
        res
          .status(404)
          .send({ message: `blog with ${req.params.id} is not found!` });
      }
      const previousblogData = fileAsJSONArray[blogIndex];
      const changedblog = {
        ...previousblogData,
        cover: req.file.path,
        updatedAt: new Date(),
        id: req.params.id,
      };
      fileAsJSONArray[blogIndex] = changedblog;

      fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
      res.send(changedblog);
    } catch (error) {
      res.send(500).send({ message: error.message });
    }
  }
);

export default mediaRouter;
