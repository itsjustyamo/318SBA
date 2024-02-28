const express = require("express");
const router = express.Router();
const mascara = require("../data/mascara");
const error = require("../middleware/error");

// GET all mascaras or create a new one
router.route("/")
    .get((req, res) => {
        // Retrieve all mascaras along with related links
        const links = [
            {
                href: "mascara/:id",
                rel: ":id",
                type: "GET",
            },
        ];

        res.json({ mascara, links });
    })
    .post((req, res, next) => {
        // Create a new mascara if provided with required data
        if (req.body.title && req.body.curlPattern && req.body.lengthOrVolume && req.body.review) {
            const newMascara = {
                curlPattern: req.body.curlPattern,
                lengthOrVolume: req.body.lengthOrVolume,
                title: req.body.title,
                review: req.body.review,
            };

            mascara.push(newMascara);
            res.json(newMascara);
        } else next(error(400, "Insufficient Data"));
    });

// GET, UPDATE, or DELETE a specific mascara by ID
router.route("/:id")
    .get((req, res, next) => {
        // Retrieve a specific mascara by its ID
        const foundMascara = mascara.find((m) => m.id == req.params.id);

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

        if (foundMascara)
            res.json({ mascara: foundMascara, links });
        else
            res.status(404).json({ error: "Mascara not found" }); // HTTP status code 404 for Not Found
    })
    .patch((req, res, next) => {
        // Update a specific mascara by its ID
        const foundMascara = mascara.find((m) => m.id == req.params.id);

        if (foundMascara) {
            for (const key in req.body) {
                foundMascara[key] = req.body[key];
            }
            res.json(foundMascara);
        } else next();
    })
    .delete((req, res, next) => {
        // Delete a specific mascara by its ID
        const index = mascara.findIndex((m) => m.id == req.params.id);

        if (index !== -1) {
            const deletedMascara = mascara.splice(index, 1);
            res.json(deletedMascara[0]);
        } else next();
    });

module.exports = router;
