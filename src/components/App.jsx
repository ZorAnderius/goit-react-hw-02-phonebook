import React from 'react';
import { Component } from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import appCSS from './App.module.css';

import contacts from './contacts_data.json';

let keyOfStorage = true;

export class App extends Component {
  #STORAGE_KEY = 'contacts';

  #localStorage = JSON.parse(localStorage.getItem(this.#STORAGE_KEY));

  state = {
    contacts:
      this.#localStorage && this.#localStorage.length
        ? this.#localStorage
        : contacts,
    filter: '',
  };

  filterContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  addContactToList = contact => {
    this.setState(prevState => {
      const isInclude = prevState.contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      );

      if (isInclude) {
        alert(
          `Sorry, but the contact ${contact.name} is already in your phone book `
        );
        return;
      }
      const newContactsList = [...prevState.contacts, contact];

      localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(newContactsList));
      return { contacts: newContactsList };
    });
  };

  onRemoveContact = contactID => {
    this.setState(prevState => {
      const newContactList = prevState.contacts.filter(
        contact => contact.id !== contactID
      );
      localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(newContactList));

      return { contacts: newContactList };
    });
  };

  initLocalStorage = () => {
    localStorage.setItem(
      this.#STORAGE_KEY,
      JSON.stringify(this.state.contacts)
    );
  };

  checkSameContact = () => {
    const { filter } = this.state;
    const normalaizedFilter = filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalaizedFilter)
    );
  };

  render() {
    if (keyOfStorage) {
      this.initLocalStorage();
      keyOfStorage = false;
    }

    const { filter } = this.state;
    const filterList = this.checkSameContact();
    return (
      <div className={appCSS.main_container}>
        <Section
          title={'Phonebook'}
          styles={{ title: 'phonebook-title', container: 'first-container' }}
        >
          <ContactForm onSubmit={this.addContactToList} />
        </Section>

        <Section
          title={'Contacts'}
          styles={{ title: 'contact-title', container: 'second-container' }}
        >
          <Filter value={filter} filterContacts={this.filterContacts} />
          <ContactList
            filterList={filterList}
            onRemoveItem={this.onRemoveContact}
          />
        </Section>
      </div>
    );
  }
}