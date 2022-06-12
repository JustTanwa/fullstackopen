import React, { useState } from 'react';

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [view, setView] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setView(!view)}>
          {view ? 'hide' : 'view'}{' '}
        </button>
        {view && (
          <div>
            <p>{blog.url}</p>
            <p>
              likes {blog.likes}{' '}
              <button onClick={() => updateLikes(blog.id, blog)}>like</button>
            </p>
            <p>{blog.user.name}</p>
            {(user.name === blog.user.name) && <button onClick={() => removeBlog(blog)}>remove</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
