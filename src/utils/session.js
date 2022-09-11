export const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  window.location.reload()
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

export const hasCredentials = () => !!getCredentials()
