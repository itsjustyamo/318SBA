const express = require("express");
const router = express.Router();
const scrunchie = require("../data/scrunchie");
const error = require("../middleware/error");

// GET all scrunchies or create a new one
router.route("/")
    .get((req, res) => {
        // Return a list of all scrunchies along with related links
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
        // Create a new scrunchie if provided with required data
        if (req.body.material && req.body.size && req.body.quantityInPack) {
            const newScrunchie = {
                id: scrunchie.length + 1,
                material: req.body.material,
                size: req.body.size,
                quantityInPack: req.body.quantityInPack,
            };

            scrunchie.push(newScrunchie);
            res.status(201).json(newScrunchie); // HTTP status code 201 for Created
        } else next(error(400, "Insufficient Data"));
    });

// GET, UPDATE, or DELETE a specific scrunchie by ID
router.route("/:id")
    .get((req, res, next) => {
        // Retrieve a specific scrunchie by its ID
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

        if (foundScrunchie)
            res.json({ scrunchie: foundScrunchie, links });
        else
            res.status(404).json({ error: "Scrunchie not found" }); // HTTP status code 404 for Not Found
    })
    .patch((req, res, next) => {
        // Update a specific scrunchie by its ID
        const foundScrunchie = scrunchie.find((s) => s.id == req.params.id);

        if (foundScrunchie) {
            for (const key in req.body) {
                foundScrunchie[key] = req.body[key];
            }
            res.json(foundScrunchie);
        } else next();
    })
    .delete((req, res, next) => {
        // Delete a specific scrunchie by its ID
        const index = scrunchie.findIndex((s) => s.id == req.params.id);

        if (index !== -1) {
            const deletedScrunchie = scrunchie.splice(index, 1);
            res.json(deletedScrunchie[0]);
        } else next();
    });

module.exports = router;
