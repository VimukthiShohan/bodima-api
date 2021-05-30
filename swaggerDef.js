const path = require('path')

module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'bodima-api', 
        version: '1', 
        description: 'API for bodima application', 
    },
    servers: [{ url: 'http://localhost:3000' }],
    apis: [path.join(__dirname, './src/**/**/*.ts')],
}
