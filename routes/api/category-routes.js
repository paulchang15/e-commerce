const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    if (!categories) {
      res.status(404).json({ message: "No categories found with this id" });
      return;
    }
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (!category) {
      res.status(404).json({ message: "No categories found with this id" });
      return;
    }
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    });
    if (!newCat) {
      res.status(404).json({ message: "No categories found with this id" });
      return;
    }
    res.json(newCat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update({
      id: req.body.id,
    });
    if (!updateCat) {
      res.status(404).json({ message: "No categories found with this id" });
      return;
    }
    res.json(updateCat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCat = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delCat) {
      res.status(404).json({ message: "No product found with this id" });
      return;
    }
    res.json(`successfully deleted categoryId ${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
