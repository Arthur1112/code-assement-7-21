import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import '../styles/adminPanel.css';
import { db } from '../config/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { auth as DbAuth } from '../config/firebase-config';

export const AdminPanel = ({
  currentUser,
  setCurrentUser,
  supportTickets,
  setSupportTickets,
}) => {
  const [confirmationMessage, setConfirmationMessage] = useState();
  const [textareaMessage, setTextareaMessage] = useState();
  const [selectedTicket, setSelectedTicket] = useState();

  const _signOutUser = async () => {
    try {
      await signOut(DbAuth);
      setCurrentUser('');
      console.log('Signed Out, Thanks!');
    } catch (err) {
      console.log('Error Signing Out ==================>', err);
    }
  };

  const _respondToTicket = () => {
    setConfirmationMessage(true);
    setTextareaMessage('');
    setTimeout(() => {
      setConfirmationMessage(false);
    }, 2500);
    console.log('Would normally send email here with body: …');
  };

  const _updateTextareaMessage = (event) => {
    setTextareaMessage(event.target.value);
  };

  const _updateStatus = async (status) => {
    if (selectedTicket) {
      const userToUpdate = selectedTicket.ticketId;
      await updateDoc(doc(db, 'supportTicketRequests', userToUpdate), {
        status: status,
      });
      const updatedSupportTickets = supportTickets.map((item) => {
        if (item.ticketId === userToUpdate) {
          return {
            ...item,
            status: status,
          };
        }
        return {
          ...item,
        };
      });
      setSupportTickets(updatedSupportTickets);
      const updatedSelectedTicket = { ...selectedTicket };
      updatedSelectedTicket.status = status;
      setSelectedTicket(updatedSelectedTicket);
    }
  };

  const _indicatorColor = (status) => {
    switch (status) {
      case 'new':
        return { backgroundColor: 'green' };
      case 'In Progress':
        return { backgroundColor: 'orange' };
      case 'Resolved':
        return { backgroundColor: 'blue' };
      default:
        return { backgroundColor: 'red' };
    }
  };

  return (
    <>
      <button
        className="signoutBtn ticketSubmitBtn"
        onClick={() => _signOutUser()}
      >
        Sign Out
      </button>
      <div className="adminContainer">
        <div className="ticketListContaienr">
          {supportTickets.map((ticket, i) => {
            return (
              <div
                onClick={() => {
                  setSelectedTicket(ticket);
                }}
                key={i}
                className="ticketPill"
              >
                <p>
                  <strong>
                    {ticket.firstName} {ticket.lastName}
                  </strong>
                </p>
                <div className="statusIndicatorWrapper">
                  <div
                    style={_indicatorColor(ticket.status)}
                    className="statusIndicator"
                  />
                  {ticket.status}
                </div>
              </div>
            );
          })}
        </div>
        <div className="selectedTicketContaienr">
          <div className="selectedUserInfoWrapper">
            <p>
              <strong>Ticket ID:</strong> {selectedTicket?.ticketId}
            </p>
            <p>
              <strong>Name:</strong> {selectedTicket?.firstName}{' '}
              {selectedTicket?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedTicket?.email}
            </p>
            <p>
              <strong>User Problem:</strong>{' '}
              {selectedTicket?.problemdescription}
            </p>
          </div>
          <div className="adminWorkWrapper">
            <div
              style={!selectedTicket ? { opacity: 0, userSelect: 'none' } : {}}
              className="topRowSstatusAdminWrapper"
            >
              <div className="statusAdminWrapper">
                <span className="statusAdminText">Ticket Status:</span>
                <div className="statusInnerWrapper">
                  <div className="button-wrap">
                    <input
                      className="hidden radio-label"
                      type="radio"
                      id="new-button"
                      name="drone"
                      value="New"
                      checked={
                        selectedTicket && selectedTicket.status === 'New'
                          ? true
                          : false
                      }
                    />
                    <label
                      style={!selectedTicket ? { cursor: 'default' } : {}}
                      onClick={(e) => _updateStatus('New')}
                      className="button-label"
                    >
                      <h1>New</h1>
                    </label>
                    <input
                      className="hidden radio-label"
                      type="radio"
                      id="inProgress-button"
                      name="drone"
                      value="In Progress"
                      checked={
                        selectedTicket &&
                        selectedTicket.status === 'In Progress'
                          ? true
                          : false
                      }
                    />
                    <label
                      style={!selectedTicket ? { cursor: 'default' } : {}}
                      onClick={(e) => _updateStatus('In Progress')}
                      className="button-label"
                    >
                      <h1>In Progress</h1>
                    </label>
                    <input
                      className="hidden radio-label"
                      type="radio"
                      id="resolved-button"
                      name="drone"
                      value="resolved"
                      checked={
                        selectedTicket && selectedTicket.status === 'Resolved'
                          ? true
                          : false
                      }
                    />
                    <label
                      style={!selectedTicket ? { cursor: 'default' } : {}}
                      onClick={(e) => _updateStatus('Resolved')}
                      className="button-label"
                    >
                      <h1>Resolved</h1>
                    </label>
                  </div>
                </div>
              </div>
              <div className="confirmationMessageWrapper">
                <h4
                  style={
                    confirmationMessage
                      ? {
                          color: '#7fff9f',
                          fontSize: 18,
                          fontWeight: 'bolder',
                        }
                      : {
                          color: 'transparent',
                          userSelect: 'none',
                          fontSize: 18,
                        }
                  }
                >
                  Email Sent!
                </h4>
              </div>
            </div>
            <div className="bottomRowStatusAdminWrapper">
              <textarea
                style={{ resize: 'none' }}
                placeholder="Respond to user"
                name=""
                className="Admintextarea"
                // cols="70"
                rows="3"
                onChange={_updateTextareaMessage}
                value={textareaMessage}
              />
              <button
                className="ticketSubmitBtn"
                type="reset"
                onClick={() => _respondToTicket()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
