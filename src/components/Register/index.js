import { useState } from 'react'

function Register({ onRouteChange, loadUser }) {
  const initialState = {
    name: '',
    emailAddress: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)

  const onFormChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmit = event => {
    event.preventDefault()

    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.emailAddress,
        password: formData.password,
      }),
    })
      .then(response => response.json())
      .then(user => {
        if (user) {
          localStorage.setItem('userId', user.id)
          localStorage.setItem('token', user.token)
          loadUser(user)
          onRouteChange('home')
          console.log(formData)
        }
      })
  }

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f5" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onFormChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f5" htmlFor="emailAddress">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="emailAddress"
                id="emailAddress"
                onChange={onFormChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f5" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onFormChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmit}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </main>
    </article>
  )
}

export default Register
