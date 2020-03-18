const express = require("express");
const Chore = require("../../models/Chore");
const router = express.Router();

router.get("/test", (req, res) =>
  res.json({ msg: "This is the chores route" })
);

// need to nest chores collection inside households

// router.get(
//   "/chores",
  // passport.authenticate("jwt", { session: false }),
  // (req, res) => {
  //   res.json({
  //     id: req.user.id,
  //     handle: req.user.handle,
  //     email: req.user.email
  //   });
  // }
// );

router.post("/add", (req, res) => {
  let newChore = new Chore(req.body)
  Chore.save(req.body)
      .then(data => res.json(data))
      .catch(err => res.status(400).json("Error: " + err));
});

router.delete("/chores/:choreId", (req, res, next) => {
  let householdId = req.householdId;
  Chore.findOneAndDelete({ _id: req.params.choreId })
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
