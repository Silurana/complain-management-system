const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ENV = require("./env");

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, ENV.jwt_secret, {
        expiresIn: ENV.jwt_expires_in,
    });
}

module.exports = {
    generateToken,
};
