export const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  window.location.reload()
}
