import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import BeerForm from './BeerForm';
import BeerRows from './BeerRows';

class Table extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      beers: []
    };
    this.refreshBeersList = this.refreshBeersList.bind(this);
    this.deleteBeer = this.deleteBeer.bind(this);
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
  deleteBeer(beerID) {
    fetch(`/api/beers/${beerID}`, {
     method: 'delete'
     })
     .then(console.log('Deleted the beer!'))
     .catch(error => {throw error});
   this.refreshBeersList();
  }
  render() {
    return (
      <div className="container">
          <h1>Beer Tracker</h1>
          <hr/>
          <BeerForm onRefresh={this.refreshBeersList} />
          <hr/>
          <div className="row">
      			<div className="col-md-12">
      				<div className="panel panel-primary">
      					<div className="panel-heading">
      						<h3 className="panel-title">Beer DB<i className="glyphicon glyphicon-refresh pull-right" onClick={this.refreshBeersList}></i></h3>
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
                      this.state.beers.map((beer,i) => <BeerRows key={i} beer={beer} onDelete={this.deleteBeer} /> ) :
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
