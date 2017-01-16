import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Button, Modal } from 'react-bootstrap';

class BeerForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      beername: '',
      beertype: '',
      beerquantity: '',
      beerowner: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  closeModal(event) {
    event.preventDefault();
    this.setState({show: false});
  }
  handleChange(event) {
    if (event.target.name === 'beername') {
      this.setState({ beername: event.target.value });
    }
    if (event.target.name === 'beertype') {
      this.setState({ beertype: event.target.value });
    }
    if (event.target.name === 'beerquantity') {
      this.setState({ beerquantity: event.target.value });
    }
    if (event.target.name === 'beerowner') {
      this.setState({ beerowner: event.target.value });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.beername.length < 1) {
      this.beernameInput.focus();
    }
    if (this.state.beername.length > 0 && this.state.beertype.length > 0 && this.state.beerquantity.length > 0 && this.state.beerowner.length > 0) {
      var beerObj = {
        name: this.state.beername,
        type: this.state.beertype,
        quantity: this.state.beerquantity,
        userid: this.state.beerowner
      };
      fetch('/api/beers', {
       method: 'post',
       headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'
       },
       body: JSON.stringify(beerObj)
     })
     .catch(error => {throw error});
      this.setState({ beername: '', beertype: '', beerquantity: '', beerowner: '', show: false });
    }
    this.props.onRefresh();
  }
  render() {
    let close = () => this.setState({ show: false});

    return (
      <div className="modal-container">
        <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({ show: true})}>
          Add Beer
        </Button>
        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Add Beer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>Beer Name</label>
                  <input
                    label="BeerName"
                    ref={(input) => { this.beernameInput = input; }}
                    type="text"
                    name="beername"
                    className="form-control"
                    placeholder="Enter the name of your beer"
                    value={this.state.beername}
                    onChange={this.handleChange}
                  />
              </div>
              <div className="form-group">
                  <label>Beer Type</label>
                  <input
                    label="BeerType"
                    ref={(input) => { this.beertypeInput = input; }}
                    type="text"
                    name="beertype"
                    className="form-control"
                    placeholder="What type of beer is it?"
                    value={this.state.beertype}
                    onChange={this.handleChange}
                  />
              </div>
              <div className="form-group">
                  <label>Beer Quantity</label>
                  <input
                    label="BeerQuantity"
                    ref={(input) => { this.beerquantityInput = input; }}
                    type="text"
                    name="beerquantity"
                    className="form-control"
                    placeholder="How many of these beers do you have?"
                    value={this.state.beerquantity}
                    onChange={this.handleChange}
                  />
              </div>
              <div className="form-group">
                  <label>Beer Owner</label>
                  <input
                    label="BeerOwner"
                    ref={(input) => { this.beerownerInput = input; }}
                    type="text"
                    name="beerowner"
                    className="form-control"
                    placeholder="Who's beers are these?"
                    value={this.state.beerowner}
                    onChange={this.handleChange}
                  />
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-success" value="Log the Beer!" />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <span>Wanna look up beer prices? <a href="http://www.thebeerstore.ca/">Beer Store</a></span>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default BeerForm
