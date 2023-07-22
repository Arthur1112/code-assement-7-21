import React, { useEffect, useState } from 'react';
import '../styles/loginForm.css';
import { auth } from '../config/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import { AdminPanel } from './AdminPanel';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const [password, setPassword] = useState('');
  const [pageLoading, setPageLoading] = useState(false);
  const [supportTickets, setSupportTickets] = useState([
    {
      email: '',
      firstName: '',
      lastName: '',
      problemdescription: '',
      status: '',
      ticketId: '',
    },
  ]);

  const supportTicketsRef = collection(db, 'supportTicketRequests');

  useEffect(() => {
    console.log('Use Effect ran ++++++++++++++++++++++');
    const getSupportTickets = async () => {
      try {
        const data = await getDocs(supportTicketsRef);
        const filteredTickets = data.docs.map((doc) => ({
          ...doc.data(),
          ticketId: doc.id,
        }));
        setSupportTickets(filteredTickets);
        console.log(supportTickets);
      } catch (err) {
        console.log('Error getting Tickets ==============>', err);
      }
    };
    getSupportTickets();
  }, [currentUser]);

  // const _signUp = async () => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     console.log('Created Account!');
  //   } catch (err) {
  //     console.log('Error Creating useer ==================>', err);
  //   }
  // };

  const _loginIn = async () => {
    setPageLoading(true);
    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log('Logged In! =======> ', userCredential.user.email);
          setCurrentUser(userCredential.user.email);
        }
      );
      console.log('Logged In! ================> ', currentUser);
      setPageLoading(false);
    } catch (err) {
      console.log('Error Loging in useer ==================>', err);
    }
  };

  console.log('currentUser:', currentUser);

  useEffect(() => {
    console.log('UseEffect 2 was ran ***');
  }, [currentUser]);

  return (
    <div className="mainFormContainer">
      {!currentUser && (
        <div class="login-box">
          <h2>Admin Login</h2>
          <div>
            <div className="user-box">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="user-box">
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="LoginBtnWrapper">
              <button onClick={() => _loginIn()}>Login</button>
              {/* <button onClick={() => _signUp()}>New user? Sign up now!</button> */}
            </div>
          </div>
          <p
            style={
              pageLoading
                ? {
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
            Loading...
          </p>
        </div>
      )}
      {currentUser && (
        <AdminPanel
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          supportTickets={supportTickets}
          setSupportTickets={setSupportTickets}
        />
      )}
    </div>
  );
};
