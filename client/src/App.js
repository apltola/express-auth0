import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://express-auth0-7534.herokuapp.com'
    : 'http://localhost:8080'

function App() {
  const [user, setUser] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(baseUrl + '/api/currentuser')
      console.log('user -> ', res.data)
      setUser(res.data)
    }

    fetchData()
  }, [])

  return (
    <Router>
      <div className="App">
        <h1>hello hello</h1>
        <div>
          <a style={{ marginRight: 10 }} href={`${baseUrl}/login`}>
            login
          </a>
          <a href={`${baseUrl}/logout`}>logout</a>
        </div>
        <p>user: {JSON.stringify(user, null, 2)}</p>
      </div>
    </Router>
  )
}

export default App
