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

import { reviewsFilePath } from "../../utils/upload/index.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const reviewRouter = express.Router();

// REVIEW post

reviewRouter.post(
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

      fs.writeFileSync(reviewsFilePath, JSON.stringify(fileAsJSONArray));
      res.send(changedmedia);
    } catch (error) {
      console.log(error);
      res.send(500).send({ message: error.message });
    }
  }
);

// REVIEW edit

reviewRouter.put(
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

// REVIEW delete

reviewRouter.delete("/media/:id/review", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(mediaFilePath);

    const fileAsString = fileAsBuffer.toString();

    let fileAsJSONArray = JSON.parse(fileAsString);

    const media = fileAsJSONArray.find((media) => media.id === req.params.id);
    if (!media) {
      res
        .status(404)
        .send({ message: `media with ${req.params.id} is not found!` });
    }
    fileAsJSONArray = fileAsJSONArray.filter(
      (media) => media.id !== req.params.id
    );
    fs.writeFileSync(mediaFilePath, JSON.stringify(fileAsJSONArray));
    res.status(204).send();
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

export default reviewRouter;