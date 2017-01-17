import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

class BeerRows extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(e) {
    e.preventDefault();
    let beerid = this.props.beer._id;
    this.props.onDelete(beerid);
  }
  render() {
    return (
      <tr>
        <td>{this.props.beer.name}</td>
        <td>{this.props.beer.type}</td>
        <td>{this.props.beer.quantity}</td>
        <td>{this.props.beer.userId}</td>
        <td><Button onClick={this.handleDelete}>Delete</Button></td>
      </tr>
    );
  }
}

BeerRows.proptypes = {
  beer: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default BeerRows;
