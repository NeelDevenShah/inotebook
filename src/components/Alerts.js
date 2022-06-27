import React, { useContext } from 'react'
import Context from '../Context'

export default function Alerts(props) {
  const context=useContext(Context);
const {alert}=context;
  return (
    <>
      <div className={`alert alert-${alert.type} role=alert`}>
        {alert.msg}
      </div>
    </>
  )
}
