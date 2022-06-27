import React from 'react'

export default function Alerts(props) {
  return (
    <div className="alert alert-success my-5 py-4" role="alert">
 {props.message}
</div>
  )
}
