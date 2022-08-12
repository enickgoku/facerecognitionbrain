import { useEffect, useState } from 'react'

const Rank = ({ user, loadUser }) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const importUser = async () => {
      await loadUser(user)
      setCurrentUser(user)
    }

    importUser()
  }, [])

  const { name, entries } = currentUser
  return (
    <div>
      <div className="white f3">
        `{currentUser.name} your current rank is...`
      </div>
      <div className="white f1">{entries}</div>
    </div>
  )
}

export default Rank
