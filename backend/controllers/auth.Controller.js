import { authModel } from "../models/auth.Schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
/* The code snippet `import dotenv from 'dotenv'; dotenv.config();` is responsible for importing the
`dotenv` package and calling the `config()` method on it. Here's what it does: */
import dotenv from 'dotenv';
dotenv.config();

/* The code snippet `const JWT_SECRET = process.env.JWT_SECRET; if (!JWT_SECRET) { process.exit(1); }`
is responsible for setting the JWT secret key for token generation. Here's what it does: */
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    process.exit(1);
}

/**
 * The function `register` handles user registration by checking for required fields, hashing the
 * password, saving user data, and generating a JWT token for authentication.
 * @param req - The `req` parameter in the `register` function represents the request object, which
 * contains information about the HTTP request that triggered the function. This object typically
 * includes properties such as `body` (request body data), `params` (route parameters), `query` (query
 * parameters), `headers`
 * @param res - The `res` parameter in the `register` function is the response object that will be sent
 * back to the client making the request. It is used to send a response back to the client with the
 * appropriate status code and data.
 * @returns The `register` function is returning a JSON response with different messages and status
 * codes based on the outcome of the registration process. Here are the possible return scenarios:
 */
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

       /* The code snippet `const userExist = await authModel.findOne({ email });` is checking if a
       user with the provided email already exists in the database. If a user with the same email is
       found, the function returns a response with a status code of 400 and a JSON object containing
       a message indicating that the user being registered already exists. This check ensures that
       duplicate user registrations with the same email address are prevented. */
        const userExist = await authModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "The user you're registering already exists",
            });
        }
 
       /* The code snippet `const saltRounds = 10; const salt = await bcrypt.genSalt(saltRounds); const
       hashedPassword = await bcrypt.hash(password, salt);` is responsible for generating a salt and
       then using that salt to hash the user's password securely before storing it in the database. */
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAuthData = {
            username,
            email,
            password: hashedPassword
        }

        const newUser = new authModel(newAuthData);
        await newUser.save();

        const payload = {
            email,
            user: newUser._id
        }

        const jwtExpiry = {
            expiresIn: "1h"
        }

        const jwtToken = await jwt.sign(payload, JWT_SECRET, jwtExpiry)

       /* The code snippet `res.status(201).json({ jwtToken, success: true, message: "New user
       registered successfully" });` is sending a response back to the client after a new user has
       been successfully registered. Here's what each part of the response means: */
        res.status(201).json({
            jwtToken,
            success: true,
            message: "New user registered successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "something went wrong registering the user",
        });
   }
}


/**
 * The `login` function is an asynchronous function that handles user authentication by checking the
 * provided email and password, finding the user in the database, comparing passwords, and generating a
 * JWT token for authentication.
 * @param req - The `req` parameter in the `login` function is typically an object representing the
 * HTTP request. It contains information about the request made to the server, such as the request
 * headers, body, parameters, and more. In this specific function, `req.body` is used to extract the
 * `email
 * @param res - The `res` parameter in the `login` function is the response object that is used to send
 * a response back to the client making the request. It is typically used to send HTTP responses with
 * status codes, headers, and data back to the client. In the provided code snippet, the `res
 * @returns The login function returns different JSON responses based on the conditions:
 */
const login = async (req, res) => {
   /* The line `const { email, password } = req.body;` is using object destructuring in JavaScript to
   extract the `email` and `password` properties from the `req.body` object. This syntax allows you
   to create variables named `email` and `password` that directly reference the corresponding
   properties within the `req.body` object. This is commonly used to simplify access to specific
   properties within an object. */
    const { email, password } = req.body;

    try {
      /* This code snippet is a validation check in the `login` function to ensure that both the
      `email` and `password` fields are provided in the request body. Here's what it does: */
      if (!email || !password) {
        return res.status(400).json({
          message: "all fields are required",
        });
      }

     /* The code snippet `const userFound = await authModel.findOne({ email }); if (!userFound) {
     return res.status(404).json({ message: "user not found!" }); }` in the `login` function is
     responsible for checking if a user with the provided email exists in the database. Here's what
     it does: */
      const userFound = await authModel.findOne({ email });
      if (!userFound) {
        return res.status(404).json({
          message: "user not found!",
        });
      }

     /* The code snippet `const correctPassword = await bcrypt.compare(password, userFound.password);`
     is comparing the password provided by the user during login with the hashed password stored in
     the database for the corresponding user. */
      const correctPassword = await bcrypt.compare(
        password,
        userFound.password
      );
      if (!correctPassword) {
        return res.status(401).json({
          message: "Please provide correct credentials",
        });
      }

      /* The code snippet `const token = await jwt.sign({id: userFound._id}, JWT_SECRET, {expiresIn:
      "1h"}); res.json({ token });` in the `login` function is generating a JSON Web Token (JWT) for
      user authentication. Here's a breakdown of what each part of the code does: */
      const token = await jwt.sign({id: userFound._id}, JWT_SECRET, {expiresIn: "1h"});
      res.json({
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};

export default {
    register,
    login
}