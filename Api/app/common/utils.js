require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
var myUtils = require("./utils");
require("./constants");

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "dental-care-jwt-secret-key-2026-production";

exports.cryptPassword = function (password) {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
};

exports.comparePassword = async function (plainPass, storedPass, user) {
  if (!plainPass || !storedPass) return false;
  
  // 1. Direct plain text match (for seed/legacy users)
  if (plainPass === storedPass) {
    return await generateJWTtoken(user);
  }

  // 2. Bcrypt hash match (for registered users)
  try {
    const match = await bcrypt.compare(plainPass, storedPass);
    if (match) {
      return await generateJWTtoken(user);
    }
  } catch (err) {
    // Stored pass might not be a valid bcrypt hash
  }

  return false;
};

async function generateJWTtoken(user) {
  // Strip sensitive fields before encoding into JWT
  const { Password, ...safeUser } = user;
  const token = jwt.sign(safeUser, JWT_SECRET, { expiresIn: "12h" });
  return token;
}

exports.check_request_params = function (request_data_body, params_array, response) {
  var missing_param = "";
  var is_missing = false;
  var invalid_param = "";
  var is_invalid_param = false;

  params_array.forEach(function (param) {
    if (request_data_body[param.name] == undefined) {
      missing_param = param.name;
      is_missing = true;
    } else {
      if (param.type && typeof request_data_body[param.name] !== param.type) {
        is_invalid_param = true;
        invalid_param = param.name;
      }
    }
  });

  if (is_missing) {
    console.log("missing_param: " + missing_param);
    response({
      success: false,
      error_code: "ERROR_CODE.PARAMETER_MISSING",
      error_description: missing_param + " parameter missing",
    });
  } else if (is_invalid_param) {
    console.log("invalid_param: " + invalid_param);
    response({
      success: false,
      error_code: "ERROR_CODE.PARAMETER_INVALID",
      error_description: invalid_param + " parameter invalid",
    });
  } else {
    response({ success: true });
  }
};

exports.getStoreImageFolderPath = function (id) {
  return myUtils.getImageFolderName(id);
};

exports.getImageFolderName = function (id) {
  switch (id) {
    case FOLDER_NAME.USER_PROFILES:
      return "user_profiles/";
    default:
      break;
  }
};

exports.getSaveImageFolderPath = function (id) {
  return "./uploads/" + myUtils.getImageFolderName(id);
};

exports.getSaveImageFolderPathForLogo = function (id) {
  return "./uploads/" + myUtils.getImageFolderName(id);
};

exports.storeImageToFolder = function (local_image_path, image_name, id) {
  var file_new_path = myUtils.getSaveImageFolderPathForLogo(id) + image_name;
  fs.readFile(local_image_path, function (error, data) {
    if (error) { console.error("Read file error:", error); return; }
    fs.writeFile(file_new_path, data, "binary", function (error) {
      if (error) {
        console.error("Save file error:", error);
      } else {
        console.log("File uploaded successfully");
      }
    });
  });
};
