export const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
}

export const getCredentials = () => {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  if (userId && token) {
    return {
      userId,
      token,
    }
  }
}
