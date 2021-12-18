const express = require('express')
require('dotenv').config('./.env')
const app = express()

const { auth, requiresAuth } = require('express-openid-connect');

const port = process.env.PORT || 3000

app.use(
  auth({
      authRequired: false,
      auth0Logout:true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
        idpLogout: true,
  })
);

app.get('/', (req, res) => {
    
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.get('/profile', (req, res) => {
    
    res.send(JSON.stringify(req.oidc.user))
})

app.listen(port, () => {
    console.log('you are connected on ' + port)
})