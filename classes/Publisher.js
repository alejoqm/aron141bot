const axios = require('axios')
const validator = require('validator');

class Publisher {
   constructor() {
   }

  async publish(message, responseMessage) {
      console.log("The response message is " + responseMessage)
      if (responseMessage !== undefined) {
          if (validator.isEmpty(responseMessage)) {
              return {"statusCode": 200};
          } else {
              await axios.post(
                  'https://api.telegram.org/bot519985598:AAEGDJvreGjvtIKrI3i9yb6Sjvn3-KdfQak/sendMessage',
                  {
                      chat_id: message.chat.id,
                      text: responseMessage
                  }
              )
                  .then(response => {
                      console.log("Publishied");
                      return {"statusCode": 200};
                  })
                  .catch(err => {
                      // ...and here if it was not
                      console.log('Error :', err);
                      return {"statusCode": 500};
               })
          }
      } else {
          return {"statusCode": 200};
      }
  }
}
module.exports = Publisher;