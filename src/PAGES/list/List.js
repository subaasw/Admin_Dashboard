import React from 'react'
import DataTable from '../../Components/datatable/DataTable'
import NavBar from '../../Components/navbar/NavBar'
import Sidebar from '../../Components/sidebar/Sidebar'
import "./list.scss"

function List() {
  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <NavBar />
       <DataTable />
      </div>
    </div>
  )
}

export default List