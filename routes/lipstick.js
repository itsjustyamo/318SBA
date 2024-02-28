const express = require("express");
const router = express.Router();
const lipstick = require("../data/lipstick");
const error = require("../middleware/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "lipstick/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ lipstick, links });
  })
  .post((req, res, next) => {
    if (req.body.color && req.body.brand && req.body.stores) {
      const newLipstick = {
        id: lipstick.length + 1, 
        color: req.body.color,
        brand: req.body.brand,
        stores: req.body.stores,
      };

      lipstick.push(newLipstick); 
      res.json(newLipstick);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const foundLipstick = lipstick.find((l) => l.id == req.params.id); 

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

    if (foundLipstick) res.json({ lipstick: foundLipstick, links }); 
    else next();
  })
  .patch((req, res, next) => {
    const foundLipstick = lipstick.find((l) => l.id == req.params.id); 

    if (foundLipstick) {
      for (const key in req.body) {
        foundLipstick[key] = req.body[key];
      }
      res.json(foundLipstick);
    } else next();
  })
  .delete((req, res, next) => {
    const index = lipstick.findIndex((l) => l.id == req.params.id); 

    if (index !== -1) {
      const deletedLipstick = lipstick.splice(index, 1);
      res.json(deletedLipstick[0]);
    } else next();
  });

module.exports = router;