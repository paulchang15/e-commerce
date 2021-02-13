const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    if (!tags) {
      res.status(404).json({ message: "No categories found with this id" });
      return;
    }
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findOne({
      where: {
        id: +req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (!tags) {
      res.status(404).json({ message: "No categories found with this id" });
      return;
    }
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name,
    });
    if (!newTag) {
      res.status(404).json({ message: "No categories found with this id" });
      return;
    }
    res.json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({
      id: req.body.id,
    });
    if (!updateTag) {
      res.status(404).json({ message: "No categories found with this id" });
      return;
    }
    res.json(updateTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delTag) {
      res.status(404).json({ message: "No product found with this id" });
      return;
    }

    res.json(`successfully deleted tagId ${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
