import React from 'react'

export default function Noteitems(props) {
    const { notes } = props
    return (
        <div className="row card w-50 my-4">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text">{"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus sint, omnis corporis saepe fugiat qui praesentium quia eos earum veritatis accusamus tempora in autem est ipsam temporibus id voluptatum facilis."+notes.description}</p>
          <a href="#" class="btn btn-secondary mx-4">Delete</a>
          <a href="#" class="btn btn-secondary">Update</a>
        </div>
      </div>
    )
}

{/* <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}
