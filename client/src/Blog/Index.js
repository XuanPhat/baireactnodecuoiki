import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

function Index() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [item, setItem] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    axios
      .get('http://localhost:3001/blog/read')
      .then(res => {
        setItem(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [item]);
  const data = { title, body, author };

  return (
    <>
      <div className="container">
        <h1>List Blog</h1>
        <input
          placeholder="Acticle Title"
          type="text"
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <input
          placeholder="Acticle Body"
          type="text"
          onChange={e => {
            setBody(e.target.value);
          }}
        />
        <input
          placeholder="Acticle Author"
          type="text"
          onChange={e => {
            setAuthor(e.target.value);
          }}
        />
        <button
          onClick={e => {
            e.preventDefault();
            axios
              .post('http://localhost:3001/blog/insert', data)
              .then(res => setItem([res.data, ...data]))
              .catch(err => console.log(err));
          }}
        >
          Submit
        </button>
      </div>
      {item.map(item => (
        <>
          {toggle ? (
            <div className="Model">
              <h1>Edit Blog</h1>
              <input
                placeholder="Acticle Title"
                type="text"
                value={item.title}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
              <input
                placeholder="Acticle Body"
                type="text"
                value={item.body}
                onChange={e => {
                  setBody(e.target.value);
                }}
              />
              <input
                placeholder="Acticle Author"
                type="text"
                value={item.author}
                onChange={e => {
                  setAuthor(e.target.value);
                }}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="listItem" key={item._id}>
            <h5>{item.title}</h5>
            <h5>{item.body}</h5>
            <h5>{item.author}</h5>

            <button
              onClick={e =>
                axios
                  .delete(`http://localhost:3001/blog/delete/${item._id}`)
                  .then(e => console.log(e))
                  .catch(err => console.log(err))
              }
            >
              xoa
            </button>
            <button
              onClick={() => {
                const tog = !toggle;
                setToggle(tog);
                console.log(item);
              }}
            >
              Edit
            </button>
          </div>
        </>
      ))}
    </>
  );
}

export default Index;
