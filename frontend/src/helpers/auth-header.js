
export function UserAuthHeader() {
   let user = JSON.parse(localStorage.getItem('user'));
   if (user && user.auth_token) {
      return { headers: { Authorization: user.auth_token}}
   } else {
      return { headers: { Authorization: '' }}
   }
}
