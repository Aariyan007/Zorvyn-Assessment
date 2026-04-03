import React from 'react'
import { useState } from 'react'
import { transactionsData } from './data/mockData'


const App = () => {
  const [transactions, setTransactions] = useState(transactionsData);
  const [role, setRole] = useState('user');

  return (
    <div>
      <h1 className='text-3xl font-bold'>Finance App</h1>
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="viewer">
          Viewer
        </option>
        <option value="admin">
          Admin
        </option>
      </select>
      <p>Current role :  {role}</p>
    </div>
  )
}

export default App