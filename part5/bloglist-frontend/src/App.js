import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [createError, setCreateError] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // check for logged in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogLoggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('blogLoggedInUser');
  };

  return (
    <div>
      {user === null ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          <h2>blogs</h2>
          {createError !== null && (
            <Notification message={createError.message} messageStyle={createError.style} />
          )}
          <p>
            {user.name} has logged in
            <button onClick={handleLogout}>log out</button>
          </p>
          <CreateBlog creationError={setCreateError} updateBlogs={setBlogs}/>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
