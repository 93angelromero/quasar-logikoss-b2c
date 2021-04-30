export default function () {
  return {
    token: localStorage.getItem('token') || '',
    status: '',
    account: localStorage.getItem('accountId') || '',
    profile: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : {}
  }
}
