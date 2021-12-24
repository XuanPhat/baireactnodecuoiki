import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

function Index() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [item, setItem] = useState([]);
  const [errorBlank, setErrorBlank] = useState([]);
  const [toggle, setToggle] = useState(false);
  const data = { firstName, lastName, email };

  useEffect(() => {
    axios
      .get('http://localhost:3001/User/read')
      .then(res => {
        setItem(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Create user</h1>
        <input
          placeholder="First Name"
          type="text"
          onChange={e => {
            setFirstName(e.target.value);
          }}
          value={firstName}
        />
        <input
          placeholder="Last Name"
          type="text"
          onChange={e => {
            setLastName(e.target.value);
          }}
          value={lastName}
        />
        <input
          placeholder="Email"
          type="text"
          onChange={e => {
            setEmail(e.target.value);
          }}
          value={email}
        />

        <div className="button_flex">
          <button
            className="Submit"
            onClick={e => {
              e.preventDefault();
              axios
                .post('http://localhost:3001/User/insert', data)
                .then(res => alert('Create success'))
                .catch(err => setErrorBlank(err.response.data));

              setFirstName('');
              setLastName('');
              setEmail('');
            }}
          >
            Create
          </button>
        </div>
      </div>

      <table>
        <tr>
          <th>User id</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
        </tr>
        {item.map(item => (
          <tr>
            <td>{item._id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Index;
