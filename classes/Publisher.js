const axios = require('axios')
const validator = require('validator');

class Publisher {
   constructor() {
   }

  async publish(message, responseMessage) {
       var res;
      console.log("The response message is " + responseMessage)
      if (responseMessage !== undefined) {
          if (validator.isEmpty(responseMessage)) {
              res = {'statusCode': 200, 'message': 'The message is empty so the api was not called' };
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
                      res = {"statusCode": 200};
                  })
                  .catch(err => {
                      // ...and here if it was not
                      console.log('Error :', err);
                      res = {"statusCode": 500};
               })
          }
      } else {
          res = {"statusCode": 200};
      }
      return res;
  }
}
module.exports = Publisher;