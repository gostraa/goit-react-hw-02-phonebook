import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const isExist = this.state.contacts.find(
      el => el.name.toLocaleLowerCase() === this.state.name.toLocaleLowerCase()
    );

    if (isExist) {
      alert('this contact already exist 😮');
      return;
    }
    const contactsList = {
      name: this.state.name,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactsList],
    }));
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  handleFilterContacts = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalazeFilter = filter.toLocaleLowerCase();
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalazeFilter)
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
        />
        filter your contacts 😄
        <Filter filterContacts={this.handleFilterContacts} />
        <Contacts
          filteredArr={filteredContacts}
          tel={this.state.number}
          deleteContact={this.handleDeleteContact}
        />
      </>
    );
  }
}
