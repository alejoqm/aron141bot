const axios = require('axios')

class Publisher {
   constructor() {
   }

  publish(message, responseMessage, res) {
	axios.post(
      'https://api.telegram.org/bot519985598:AAEGDJvreGjvtIKrI3i9yb6Sjvn3-KdfQak/sendMessage',
      {
        chat_id: message.chat.id,
        text: responseMessage
      }
    )
    .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    }) 

  }

}
module.exports = Publisher;