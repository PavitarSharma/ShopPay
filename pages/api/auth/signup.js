import nextConnect from "next-connect";
import db from "@/utils/db";
import { validateEmail } from "@/utils/validation";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { createActivationToken } from "@/utils/tokens";
import { sendMail } from "@/utils/sendMail";

const handler = nextConnect();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const exitUser = await User.findOne({ email }).exec();
    if (exitUser) {
      return res.status(400).json({ message: "This email alreday exits" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be atleast 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const activationToken = createActivationToken({
      id: user._id.toString(),
    });

    const url = `${process.env.BASE_URL}/activate/${activationToken}`;
    sendMail(email, url, "", "Activate your account");

    await db.disconnectDb();

    res.status(201).json({
      message: "Register success! Please activate your email to start.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
