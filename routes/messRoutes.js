const express = require("express");
const router = express.Router();
const Mess = require("../models/Mess");

// GET all messes
router.get("/", async (req, res) => {
  try {
    const messes = await Mess.findAll();
    res.json(messes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);
    if (!mess) {
      return res.status(404).json({ message: "Mess not found" });
    }
    res.json(mess);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// POST new mess
router.post("/", async (req, res) => {
  try {
    const { name, location, price } = req.body;
    const newMess = await Mess.create({ name, location, price });
    res.status(201).json(newMess);
  } catch (err) {
    res.status(400).json({ message: "Invalid input", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);

    if (!mess) return res.status(404).json({ message: "Mess not found" });

    await mess.update(req.body);

    res.json(mess);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);
    if (!mess) {
      return res.status(404).json({ message: "Mess not found" });
    }

    await mess.destroy();
    res.json({ message: "Mess deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;
