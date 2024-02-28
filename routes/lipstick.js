const express = require("express");
const router = express.Router();
const lipstick = require("../data/lipstick");
const error = require("../middleware/error");

// GET all lipsticks or create a new one
router.route("/")
    .get((req, res) => {
        // Retrieve all lipsticks along with related links
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
        // Create a new lipstick if provided with required data
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

// GET, UPDATE, or DELETE a specific lipstick by ID
router.route("/:id")
    .get((req, res, next) => {
        // Retrieve a specific lipstick by its ID
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

        if (foundLipstick)
            res.json({ lipstick: foundLipstick, links });
        else
            res.status(404).json({ error: "Lipstick not found" }); // HTTP status code 404 for Not Found
    })
    .patch((req, res, next) => {
        // Update a specific lipstick by its ID
        const foundLipstick = lipstick.find((l) => l.id == req.params.id);

        if (foundLipstick) {
            for (const key in req.body) {
                foundLipstick[key] = req.body[key];
            }
            res.json(foundLipstick);
        } else next();
    })
    .delete((req, res, next) => {
        // Delete a specific lipstick by its ID
        const index = lipstick.findIndex((l) => l.id == req.params.id);

        if (index !== -1) {
            const deletedLipstick = lipstick.splice(index, 1);
            res.json(deletedLipstick[0]);
        } else next();
    });

module.exports = router;
