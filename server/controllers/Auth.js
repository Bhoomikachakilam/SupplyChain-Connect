import bcrypt from "bcrypt";
import user from "../models/user.js";

const register = async (req, res) => {
  try {
    const { name, email, password, address, phoneNumber, role } = req.body;

    // Check if user with the same email already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      role,
    });

    console.log(newUser);
    res
      .status(201)
      .json({ message: "Registration successful", user: newUser });
  } catch (err) {
    console.log("error on register endpoint ", err);
    res.status(500).json({ message: "Registration failed", error: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user: existingUser });
  } catch (err) {
    console.log("error on login endpoint ", err);
    res.status(500).json({ message: "Login failed", error: err });
  }
};

export { register,login};
