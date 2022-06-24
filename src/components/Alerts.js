import React from 'react'

export default function Alerts(props) {
  return (
    <div className="alert alert-success" role="alert">
 {props.message}
</div>
  )
}
