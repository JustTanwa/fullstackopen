import React, { useState } from 'react';
import blogService from '../services/blogs';

export default function CreateBlog({ creationError, updateBlogs, createRef }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createNewBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({ title, author, url });
      setAuthor('');
      setTitle('');
      setUrl('');
      creationError({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        style: 'success',
      });

      createRef.current.toggleVisibility();
      
      updateBlogs((prev) => prev.concat(blog));
      setTimeout(() => {
        creationError(null);
      }, 3000);
    } catch (error) {
      console.log(error.response.data.error);
      creationError({
        message: error.response.data.error,
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
          />
        </div>
        <div className='input-group'>
          <label htmlFor='author'>author: </label>
          <input
            type='text'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='url'>url: </label>
          <input
            type='text'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
}
