import axios from 'axios';

export const baseUrl = 'https://grmapi-v2.infinitisoftware.net/emailapi';



export async function getMethodAfterLogin(url: string) {
  var headers = {
    
    'x-xsrf-token':"vqnj3fi1ce1YZV6uorotyqqgF8j34fID"
    // 'Authorization': '0g8DWP5g8w1Sks8kVnpbzBiJqHAt0m9a',
    // 'Content-type': 'application/json'
  };
  document.cookie = "csrftoken=" +"vqnj3fi1ce1YZV6uorotyqqgF8j34fID" /*token location*/
  return axios.get(url, { headers: headers })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        // Router.push('/')
      }else{
        console.log(error);
      }
    });
}
