import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(props) {
  return (
    <nav className="Nav">
      <Link to="/list">
        <button>Bookmark List</button>
      </Link>
      <Link to="/add">
        <button>Add Bookmark</button>
      </Link>
    </nav>
  )
}
