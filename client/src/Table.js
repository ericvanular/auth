import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import BeerForm from './BeerForm';
import { Button } from 'react-bootstrap';

class Table extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      beers: []
    };
    this.refreshBeersList = this.refreshBeersList.bind(this);
  }
  componentDidMount() {
    this.refreshBeersList();
  }
  refreshBeersList() {
    fetch('/api/beers')
      .then(response => response.json())
      .then(json => {
        this.setState({ beers: json })
        console.log('Got the beer!')
      })
      .catch(error => {throw error});
  }
  render() {
    return (
      <div className="container">
          <h1>BEER FERDA BOYS</h1>
          <hr/>
          <BeerForm onRefresh={this.refreshBeersList} />
          <hr/>
          <div className="row">
      			<div className="col-md-12">
      				<div className="panel panel-primary">
      					<div className="panel-heading">
      						<h3 className="panel-title">Beer goes here</h3>
      						<div className="clearfix">
                      <Button className='pull-right' onClick={this.refreshBeersList}><i className="glyphicon glyphicon-refresh"></i></Button>
      						</div>
      					</div>
      					<table className="table table-hover" id="dev-table">
                  <thead>
                    <tr>
                      <th>Beer Name</th>
                      <th>Beer Type</th>
                      <th>Quantity</th>
                      <th>Owner</th>
                      <th>Drank Em?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.beers.length ?
                      this.state.beers.map((beer,i) =>
                      <tr key={i}>
                        <td>{beer.name}</td>
                        <td>{beer.type}</td>
                        <td>{beer.quantity}</td>
                        <td>{beer.userId}</td>
                        <td>&#10005;</td>
                      </tr> ) :
                      <tr>
                        <td>No beers here yet!</td>
                      </tr>
                    }
                  </tbody>
      					</table>
      				</div>
      			</div>
      		</div>
      	</div>
    );
  }
}

export default Table;
