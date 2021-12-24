var express = require('express');
const { findByIdAndRemove, findOneAndDelete } = require('../models/index');
var router = express.Router();
const UserModel = require('../models/index');
router.get('/read', (req, res) => {
  UserModel.find({}, (err, result) => {
    res.send(result);
  });
});
router.post('/insert', async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  if (!firstName && !lastName && !email) {
    res.status(400).json("Enter don't blank ");
  } else {
    const AddUser = UserModel({
      firstName,
      lastName,
      email
    });
    await AddUser.save()
      .then(() => res.json(AddUser))
      .catch(err => res.status(400).json({ error: err }));
  }
});
router.post('/update', async (req, res) => {
  try {
    const UpdateUser = req.body;
    const update = await UserModel.findOneAndUpdate(
      { _id: UpdateUser._id },
      UpdateUser,
      { new: true }
    );
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});
router.post('/update/:id', async (req, res) => {
  try {
    const Update = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        }
      },
      { new: true }
    );
    res.status(200).json(Update);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteuser = await UserModel.findByIdAndDelete(id);
    res.status(200).json(deleteuser);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
