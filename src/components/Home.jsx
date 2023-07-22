import React, { useState } from 'react';
import '../styles/home.css';
import { db } from '../config/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

export const Home = ({ currentUser, setCurrentUser }) => {
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [newTicket, setNewTicket] = useState({
    firstName: '',
    lastName: '',
    email: '',
    problemdescription: '',
    status: 'New',
  });

  const capitalizeFirstLetter = (word) => {
    if (typeof word !== 'string' || word.length === 0) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const _handelChange = (event) => {
    const { name, value } = event.target;
    setNewTicket((formData) => ({
      ...formData,
      [name]: capitalizeFirstLetter(value),
    }));
  };

  const _submitNewTicket = (event) => {
    event.preventDefault();
    const newSubmission = { ...newTicket };
    const docRef = addDoc(
      collection(db, 'supportTicketRequests'),
      newSubmission
    );
    console.log(
      'Here is your new ticket =================>',
      docRef.id,
      newSubmission
    );
    setNewTicket({
      firstName: '',
      lastName: '',
      email: '',
      problemdescription: '',
      status: 'New',
    });
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
    }, 2500);
  };

  return (
    <div className="mainContainer">
      <div class="ticketForm-box">
        <h2>Submit a service Ticket</h2>
        <div className="userMessageWrapper">
          <h4
            style={
              submittedMessage
                ? { color: '#009d27' }
                : { color: 'transparent', userSelect: 'none' }
            }
          >
            Your Ticket was succesfully submitted!
          </h4>
        </div>
        <div>
          <form onSubmit={_submitNewTicket}>
            <div className="user-box">
              <input
                required
                name="firstName"
                onChange={(e) => _handelChange(e)}
                placeholder="First Name"
                value={newTicket.firstName}
              />
            </div>
            <div className="user-box">
              <input
                required
                name="lastName"
                onChange={(e) => _handelChange(e)}
                placeholder="Last Name"
                value={newTicket.lastName}
              />
            </div>
            <div className="user-box">
              <input
                required
                name="email"
                onChange={(e) => _handelChange(e)}
                type="email"
                placeholder="Email"
                value={newTicket.email}
              />
            </div>
            <div className="user-box">
              <textarea
                required
                style={{ resize: 'none' }}
                name="problemdescription"
                onChange={(e) => _handelChange(e)}
                placeholder="What is the problem?"
                cols="38"
                value={newTicket.problemdescription}
              />
            </div>
            <div className="submitBtnWrapper">
              <button type="submit" className="submitTicketBtn">
                <h3>Submit</h3>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
