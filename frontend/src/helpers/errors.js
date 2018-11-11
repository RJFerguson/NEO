import { changePage } from '../helpers/';

export function handleError(error) {
   if (!error.response) { return "Response Failed" }
   switch (error.response.status) {
      case 401:
         changePage("/")
         return "You need to login before continuing";
      case 404:
         return "Sorry, looks like we are having some technical difficulties. Pit Crew is on it.";
      case 500:
         return "Network error, check your internet connection.";
      default:
         let message = ""
         if (!error.response.data.message) {
            message = "We are having some technical difficulties. Pit Crew is on it."
         } else if (typeof error.response.data.message === 'object') {
            for (var element in error.response.data.message) {
               for (var i in error.response.data.message[element]) {
                  message += `${element} ${error.response.data.message[element][i]}. `;
               }
            }
         } else if (typeof error.response.data.message === 'string') {
            message = error.response.data.message;
         } else {
            message = "error"
         }
         return message;
   }
}
