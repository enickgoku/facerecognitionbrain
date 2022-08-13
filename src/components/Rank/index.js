import { useEffect, useState } from 'react'

const Rank = ({ user, loadUser }) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const importUser = async () => {
      loadUser(user)
      setCurrentUser(user)
    }

    importUser()
  }, [loadUser, user])

  const { name, entries } = currentUser
  return (
    <div>
      <div className="white f3">`{name} your current rank is...`</div>
      <div className="white f1">{entries}</div>
    </div>
  )
}

export default Rank
