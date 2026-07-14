import { NavLink } from 'react-router-dom'

import "./Navbar.css"

const Navbar = () => {
  return (
    <header className="navbar">
      <h2>Controle de Gastos</h2>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/people" className={({ isActive }) => (isActive ? 'active' : '')}>
          Pessoas
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => (isActive ? 'active' : '')}>
          Transações
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar;