const Task = require("../model/Task");

const taskController = {};

// CREATE
taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const { userId } = req;
    const newTask = new Task({ task, isComplete, author: userId });
    await newTask.save();

    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

// READ
taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).populate("author");
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "ok", error: err });
  }
};

// UPDATE
taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isComplete } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, isComplete },
      { new: true }
    );

    res.status(200).json({ status: "ok", data: updatedTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// DELETE
taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (deletedTask) {
      res.status(200).json({ status: "ok", data: deletedTask });
    } else {
      res.status(404).json({ status: "fail", message: "Task not found" });
    }
  } catch (err) {
    res.status(404).json({ status: "fail", error: err.message });
  }
};

module.exports = taskController;
