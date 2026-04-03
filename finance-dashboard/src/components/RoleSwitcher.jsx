import React from 'react'
import { useState } from 'react'

const RoleSwitcher = ({role,setRole}) => {
  return (
    <select className='border p-2 rounded' value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
    </select>
  )
}

export default RoleSwitcher