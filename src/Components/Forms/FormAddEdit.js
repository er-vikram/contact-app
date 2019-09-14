import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    first: '',
    last: '',
    email: '',
    phone: '',
    status: true
  }

/**
 * Handle Methods
 */

  onChange = e => {
    if( 'status' === e.target.name ) {
      this.setState({[e.target.name]: e.target.checked})
    } else {
      this.setState({[e.target.name]: e.target.value})
    }
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('https://my-json-server.typicode.com/er-vikram/contactDB/contacts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        phone: this.state.phone,
        status: this.state.status
      })
    })
      .then(response => response.json())
      .then(item => {
        // Real API need to be implemented to get updated unique ID
        this.props.addItemToState(item);
        this.props.toggle();
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('https://my-json-server.typicode.com/er-vikram/contactDB/contacts/'+this.state.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        phone: this.state.phone,
        status: this.state.status
      })
    })
      .then(response => response.json())
      .then(item => {
          this.props.updateState(item);
          this.props.toggle();
      })
      .catch(err => console.log(err))
  }

/**
 * Lifecycle Methods
 */

  componentDidMount(){
    if(this.props.item){
      const { id, first, last, email, phone, status } = this.props.item;
      this.setState({ id, first, last, email, phone, status });
    }
  }

  render() {

    const { first, last, email, phone, status } = this.state;

    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="first">First Name</Label>
          <Input type="text" name="first" id="first" onChange={this.onChange} value={first === null ? '' : first} />
        </FormGroup>
        <FormGroup>
          <Label for="last">Last Name</Label>
          <Input type="text" name="last" id="last" onChange={this.onChange} value={last === null ? '' : last}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={email === null ? '' : email}  />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input type="text" name="phone" id="phone" onChange={this.onChange} value={phone === null ? '' : phone}  placeholder="ex. 999-888-7777" />
        </FormGroup>
        <FormGroup check style={{margin:"20px 0"}}>
          <Label check for="status">
            <Input type="checkbox" name="status" id="status" onChange={this.onChange} checked={status} />{' '}
            Active
          </Label>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
