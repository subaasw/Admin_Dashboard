import React from 'react'
import Sidebar from '../../Components/sidebar/Sidebar'
import  "./home.scss"

import NavBar from "../../Components/navbar/NavBar"
import Widgets from '../../Components/widgets/Widgets'
import Featured from '../../Components/featured/Featured'
import Chart from '../../Components/chart/Chart'
import Table_ from '../../Components/table_/Table_'


function Home() {
  return (
    <div className='home'>
        <Sidebar />
        <div className='homeContainer'>
          <NavBar />
          <div className='widgets'>
            <Widgets type="user" />
            <Widgets type="order"/>
            <Widgets type="earning"/>
            <Widgets type="balance"/>
          </div>
          <div className='charts'>
            <Featured />
            <Chart aspect={2/1} title="Last 6 Months (Revenue)" />
          </div>

          <div className='listContainer'>
            <div className='listTitle'>
              Latest Transactions
            </div>
            <Table_ />
          </div>
          </div>
    </div>
  )
}

export default Home