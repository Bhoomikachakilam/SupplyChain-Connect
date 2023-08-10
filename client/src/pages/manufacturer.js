import React from 'react'
import Navbar from '../components/Navbar'
import OrderList from '../components/manufacturerorderList'
function manufacturer({userName}) {
  return (
      <div>
          <Navbar link={"/orderform"} name={"Addorder"} />
      <OrderList />
    </div>
  )
}

export default manufacturer