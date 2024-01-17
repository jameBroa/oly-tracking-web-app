const Dotenv = require('dotenv-webpack');

module.exports = {
    
    plugins: [
        new Dotenv({
            path: `${environmentsPath}/.env`,
            systemvars: true, 
        })
    ]
    
}