const router = require('express').Router()
const UserService = require('../services/users')
const MailService = require('../services/mail')
const bodyParser = require('body-parser')
router.use(bodyParser.json())

router.get('/test', function (req, res) {
  res.send('works for me')
})

router.get('/test-db', async function (req, res) {
  // pretty print JSON
  res.header('Content-Type', 'application/json')
  res.send(JSON.stringify(await UserService.testDB(), null, 4))
})

router.get('/test-mail', function (req, res) {
  const myEmail = ''
  const sendEmail = false
  // const sendEmail = true
  if (!sendEmail) {
    return res.send('sendEmail must be turned on manually')
  }
  MailService.sendTestEmailToMyself(myEmail)
    .then(() => {
      console.log('sent test message without errors')
      res.status(202).send('ok sent')
    }, error => {
      console.error(error)
      if (error.response) {
        console.error(error.response.body)
      }
      res.status(error.code).send(error)
    })
})

module.exports = router
