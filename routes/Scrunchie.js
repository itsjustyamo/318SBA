const express = require("express");
const router = express.Router();
const scrunchie = require("../data/srunchie");
const error = require("../middleware/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "scrunchie/:id", 
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ scrunchie, links });
  })
  .post((req, res, next) => {
    if (req.body.material && req.body.size && req.body.quantityInPack) {
      const newScrunchie = {
        id: scrunchie.length + 1, 
        material: req.body.material,
        size: req.body.size,
        quantityInPack: req.body.quantityInPack,
      };

      scrunchie.push(newScrunchie); 
      res.json(newScrunchie);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const foundScrunchie = scrunchie.find((s) => s.id == req.params.id); 

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

    if (foundScrunchie) res.json({ scrunchie: foundScrunchie, links }); 
    else next();
  })
  .patch((req, res, next) => {
    const foundScrunchie = scrunchie.find((s) => s.id == req.params.id); 

    if (foundScrunchie) {
      for (const key in req.body) {
        foundScrunchie[key] = req.body[key];
      }
      res.json(foundScrunchie);
    } else next();
  })
  .delete((req, res, next) => {
    const index = scrunchie.findIndex((s) => s.id == req.params.id);

    if (index !== -1) {
      const deletedScrunchie = scrunchie.splice(index, 1);
      res.json(deletedScrunchie[0]);
    } else next();
  });
