const generateAuthToken = require("./generateAuthToken");

module.exports = (userData) => {
    const { id, fullName, email, role } = userData;
    return {
        user: {
            id,
            fullName,
            email,
            role,
        },
        token: generateAuthToken(id),
    };
};
