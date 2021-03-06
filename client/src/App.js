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

  const ping = async () => {
    const res = await axios.get(baseUrl + '/login')
    console.log(res.data)
  }

  return (
    <Router>
      <div className="App">
        <h1>hello hello</h1>
        <p>{JSON.stringify(user, null, 2)}</p>
        <button onClick={ping}>get login</button>
        <Link to="/login">navigate login...</Link>
        <a href={`${baseUrl}/login`}>login with anchor tag</a>
      </div>
    </Router>
  )
}

export default App
