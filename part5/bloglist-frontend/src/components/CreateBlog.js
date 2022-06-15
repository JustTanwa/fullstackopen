import React, { useState } from 'react';

export default function CreateBlog({ creationError, createRef, handleSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createNewBlog = async (event) => {
    event.preventDefault();
    try {
      handleSubmit({ title, author, url });
      setAuthor('');
      setTitle('');
      setUrl('');
      creationError({
        message: `a new blog ${title} by ${author} added`,
        style: 'success',
      });

      createRef.current.toggleVisibility();

      setTimeout(() => {
        creationError(null);
      }, 3000);
    } catch (error) {
      const message = error.response?.data.error || "Error";
      creationError({
        message,
        style: 'failed',
      });
      setTimeout(() => {
        creationError(null);
      }, 3000);
    }
  };

  return (
    <div>
      <h2>Create a new blog list</h2>
      <form onSubmit={createNewBlog}>
        <div className='input-group'>
          <label htmlFor='title'>title: </label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='Title of the blog'
          />
        </div>
        <div className='input-group'>
          <label htmlFor='author'>author: </label>
          <input
            type='text'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='Author of the blog'
          />
        </div>
        <div className='input-group'>
          <label htmlFor='url'>url: </label>
          <input
            type='text'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='Url of the blog'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
}
