import bcrypt from "bcrypt";
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

let model = initModels(sequelize);

export const login = async (req, res) => {
    let { user_name, password } = req.body;

    // check user_email and password == table user
    let checkUser = await model.account.findOne({
        where: {
            user_name,
        },
    });

    // exist => login successfully
    if (checkUser) {
        bcrypt.compare(password, checkUser.password, (err, result) => {
            if (err) {
                console.error(err);
                responseData(res, "An error occurred during login", "", 500);
                return;
            }

            if (result) {
                let token = {
                    user_id: checkUser.user_id,
                };
                responseData(res, "Login successfully", token, 200);
            } else {
                // wrong password
                responseData(res, "Wrong password", "", 400);
            }
        });
    } else {
        // not exist
        responseData(res, "User doesn't exist", "", 400);
    }
};

export const signup = async (req, res) => {
    // try {
    let { user_name, password, user_email } = req.body;

    // Validate user password (must contain uppercase, lowercase, digit, and special character)
    if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}/.test(
            password
        )
    ) {
        return responseData(
            res,
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long",
            "",
            400
        );
    }

    // Validate user_email address
    if (!/^\S+@\S+\.\S+$/.test(user_email)) {
        return responseData(res, "Invalid user_email address", "", 400);
    }

    let checkUser = await model.account.findOne({
        where: {
            user_name,
        },
    });

    if (checkUser) {
        return responseData(res, "Username already exists", "", 400);
    }

    //hash the pass
    let hashedPassword = bcrypt.hashSync(password, 10);

    let newData = {
        user_name,
        password: hashedPassword,
        user_email,
    };

    await model.account.create(newData);

    responseData(res, "Sucessfully sign up", "", 200);
    // } catch {
    //   responseData(res, "Error", "", 500);
    // }
};
