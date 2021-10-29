import express from "express";

import fs from "fs";

import uniqid from "uniqid";

import path, { dirname } from "path";

import { fileURLToPath } from "url";

import { parseFile, uploadFile } from "../../utils/upload/index.js";

// import {
//   checkBlogPostSchema,
//   checkCommentSchema,
//   checkSearchSchema,
//   checkValidationResult,
// } from "./validation.js";

import { mediaFilePath } from "../../utils/upload/index.js";

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

      const fileAsBuffer = fs.readFileSync(mediaFilePath);

      const fileAsString = fileAsBuffer.toString();

      const fileAsJSONArray = JSON.parse(fileAsString);

      fileAsJSONArray.push(media);

      fs.writeFileSync(mediaFilePath, JSON.stringify(fileAsJSONArray));

      res.send(media);
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

    const media = fileAsJSONArray.find((media) => media.id === req.params.id);
    if (!media) {
      res
        .status(404)
        .send({ message: `media with ${req.params.id} is not found!` });
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

//  update media
mediaRouter.put("/media/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(mediaFilePath);

    const fileAsString = fileAsBuffer.toString();

    let fileAsJSONArray = JSON.parse(fileAsString);

    const mediaIndex = fileAsJSONArray.findIndex(
      (media) => media.id === req.params.id
    );
    if (!mediaIndex == -1) {
      res
        .status(404)
        .send({ message: `media with ${req.params.id} is not found!` });
    }
    const previousmediaData = fileAsJSONArray[mediaIndex];
    const changedmedia = {
      ...previousmediaData,
      ...req.body,
      updatedAt: new Date(),
      id: req.params.id,
    };
    fileAsJSONArray[mediaIndex] = changedmedia;

    fs.writeFileSync(mediaFilePath, JSON.stringify(fileAsJSONArray));
    res.send(changedmedia);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// REVIEW post

mediaRouter.post(
  "/media/:id/review",
//   checkReviewSchema,
//   checkValidationResult,
  async (req, res, next) => {
    try {
      const { text, userName } = req.body;
      const review = { id: uniqid(), comment, rate, elementId, createdAt: new Date() };
      const fileAsBuffer = fs.readFileSync(mediaFilePath);

      const fileAsString = fileAsBuffer.toString();

      let fileAsJSONArray = JSON.parse(fileAsString);

      const mediaIndex = fileAsJSONArray.findIndex(
        (media) => media.id === req.params.id
      );
      if (!mediaIndex == -1) {
        res
          .status(404)
          .send({ message: `media with ${req.params.id} is not found!` });
      }
      const previousmediaData = fileAsJSONArray[mediaIndex];
      previousmediaData.comments = previousmediaData.comments || [];
      const changedmedia = {
        ...previousmediaData,
        ...req.body,
        comments: [...previousmediaData.comments, comment],
        updatedAt: new Date(),
        id: req.params.id,
      };
      fileAsJSONArray[mediaIndex] = changedmedia;

      fs.writeFileSync(mediaFilePath, JSON.stringify(fileAsJSONArray));
      res.send(changedmedia);
    } catch (error) {
      console.log(error);
      res.send(500).send({ message: error.message });
    }
  }
);

// REVIEW edit

mediaRouter.put(
  "/media/:id/review",
//   checkReviewSchema,
//   checkValidationResult,
  async (req, res, next) => {
    try {
      const { text, userName } = req.body;
      const review = { id: uniqid(), comment, rate, elementId, createdAt: new Date() };
      const fileAsBuffer = fs.readFileSync(mediaFilePath);

      const fileAsString = fileAsBuffer.toString();

      let fileAsJSONArray = JSON.parse(fileAsString);

      const mediaIndex = fileAsJSONArray.findIndex(
        (media) => media.id === req.params.id
      );
      if (!mediaIndex == -1) {
        res
          .status(404)
          .send({ message: `media with ${req.params.id} is not found!` });
      }
      const previousmediaData = fileAsJSONArray[mediaIndex];
      previousmediaData.comments = previousmediaData.comments || [];
      const changedmedia = {
        ...previousmediaData,
        ...req.body,
        comments: [...previousmediaData.comments, comment],
        updatedAt: new Date(),
        id: req.params.id,
      };
      fileAsJSONArray[mediaIndex] = changedmedia;

      fs.writeFileSync(mediaFilePath, JSON.stringify(fileAsJSONArray));
      res.send(changedmedia);
    } catch (error) {
      console.log(error);
      res.send(500).send({ message: error.message });
    }
  }
);

// POSTER postage

mediaRouter.post(
  "/media/:id/poster",
  parseFile.single("poster"),
  async (req, res, next) => {
    try {
      const fileAsBuffer = fs.readFileSync(mediaFilePath);

      const fileAsString = fileAsBuffer.toString();

      let fileAsJSONArray = JSON.parse(fileAsString);

      const mediaIndex = fileAsJSONArray.findIndex(
        (media) => media.id === req.params.id
      );
      if (!mediaIndex == -1) {
        res
          .status(404)
          .send({ message: `media with ${req.params.id} is not found!` });
      }
      const previousmediaData = fileAsJSONArray[mediaIndex];
      const changedmedia = {
        ...previousmediaData,
        cover: req.file.path,
        updatedAt: new Date(),
        id: req.params.id,
      };
      fileAsJSONArray[mediaIndex] = changedmedia;

      fs.writeFileSync(mediaFilePath, JSON.stringify(fileAsJSONArray));
      res.send(changedmedia);
    } catch (error) {
      res.send(500).send({ message: error.message });
    }
  }
);

export default mediaRouter;
