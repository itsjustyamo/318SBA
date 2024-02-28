const express = require("express");
const router = express.Router();
const mascara = require("../data/mascara");
const error = require("../middleware/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "mascara/:id", // Changed "lipstick" to "mascara"
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ mascara, links }); // Changed "lipstick" to "mascara"
  })
  .post((req, res, next) => {
    if (req.body.title && req.body.curlPattern && req.body.lengthOrVolume && req.body.review) {
      const newMascara = {
        curlPattern: req.body.curlPattern,
        lengthOrVolume: req.body.lengthOrVolume,
        title: req.body.title,
        review: req.body.review,
      };

      mascara.push(newMascara); // Changed "lipstick" to "mascara"
      res.json(newMascara);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const foundMascara = mascara.find((m) => m.id == req.params.id); // Changed "lipstick" to "mascara"

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (foundMascara) res.json({ mascara: foundMascara, links }); // Changed "lipstick" to "mascara"
    else next();
  })
  .patch((req, res, next) => {
    const foundMascara = mascara.find((m) => m.id == req.params.id); // Changed "lipstick" to "mascara"

    if (foundMascara) {
      for (const key in req.body) {
        foundMascara[key] = req.body[key];
      }
      res.json(foundMascara);
    } else next();
  })
  .delete((req, res, next) => {
    const index = mascara.findIndex((m) => m.id == req.params.id); // Changed "lipstick" to "mascara"

    if (index !== -1) {
      const deletedMascara = mascara.splice(index, 1);
      res.json(deletedMascara[0]);
    } else next();
  });

module.exports = router;