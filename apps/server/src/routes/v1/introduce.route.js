const express = require('express');
const httpStatus = require('http-status');
const he = require('he');

const catchAsync = require('../../utils/catchAsync');
const Introduce = require('../../models/introduce.model');

const router = express.Router();

router
  .route('/')
  .get(
    catchAsync(async (req, res) => {
      const introduce = await Introduce.findById('660bc9410b3541b7f894f271');
      res.status(httpStatus.CREATED).send({ content: he.decode(introduce.content) });
    })
  )
  .post(
    // upload.none(),
    catchAsync(async (req, res) => {
      const introduce = await Introduce.findByIdAndUpdate('660bc9410b3541b7f894f271', req.body);
      res.status(httpStatus.CREATED).send(introduce);
    })
  );

module.exports = router;
