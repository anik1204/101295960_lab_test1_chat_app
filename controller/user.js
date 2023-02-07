const mongoose = require("mongoose");
const User = require("../model/user.js");
const Users = mongoose.model("userSchema");
const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

async function getPass(cred, type = "username") {
	return new Promise((res, rej) => {
		let result = Users.findOne({ [type]: [cred] }, function (err, docs) {
			if (err) throw err;
			res(docs.password);
		});
	});
}

router.post("/signup", async (req, res) => {
	let body = req.body;
	if (
		"username" in body &&
		"firstname" in body &&
		"lastname" in body &&
		"password" in body
	) {
		const { username, firstname, lastname, password } = body;
		let ifUsernameExists = await Users.findOne({ username }).count();
		if (ifUsernameExists == 0) {
			const user = new Users();
			user.username = username;
			user.password = password;
			user.firstname = firstname;
			user.lastname = lastname;
			user.save((err, doc) => {
				if (!err) {
					res.status(201).send({
						message:
							"Signed up successfully User: " +
							username +
							" firstname: " +
							firstname,
					});
				} else res.send("Error during insertion: " + err);
			});
		} else {
			res.status(200).send({ message: "Username/Email already in use." });
		}
	} else
		res.send(
			"Please include all the necessary infromation { username, firstname, lastname, password }"
		);
});

router.post("/login", async (req, res) => {
	let user, p;
	if ("email" in req.body) {
		p = await getPass(req.body.email, "email");
		user = req.body.email;
	} else {
		p = await getPass(req.body.username);
		user = req.body.username;
	}
	if (p == req.body.password) {
		res
			.status(200)
			.send({ status: true, user, message: "Logged in successfully" });
	} else {
		res
			.status(200)
			.send({ status: false, message: "Invalid Username/Password" });
	}
});

module.exports = router;
