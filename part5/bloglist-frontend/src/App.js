import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [createError, setCreateError] = useState(null);

  const createNoteRef = useRef();

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

  const updateLikes = async (id, blog) => {
    const blogToUpdate = blog;
    blogToUpdate.likes += 1;
    console.log(blogToUpdate);
    const updatedBlog = await blogService.update(id, blogToUpdate);
    console.log(updatedBlog);
    setBlogs(
      blogs.map((blog) => {
        if (blog.id === id) {
          return updatedBlog;
        }
        return blog;
      })
    );
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.title !== blog.title));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmitBlog = async (blogObj) => {
    const blog = await blogService.create({
      title: blogObj.title,
      author: blogObj.author,
      url: blogObj.url,
    });
    setBlogs((prev) => prev.concat(blog));
  };

  return (
    <div>
      {user === null ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          <h2>blogs</h2>
          {createError !== null && (
            <Notification
              message={createError.message}
              messageStyle={createError.style}
            />
          )}
          <p>
            {user.name} has logged in
            <button onClick={handleLogout}>log out</button>
          </p>
          <Togglable buttonLabel='create new blog' ref={createNoteRef}>
            <CreateBlog
              handleSubmit={handleSubmitBlog}
              creationError={setCreateError}
              createRef={createNoteRef}
            />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateLikes={updateLikes}
                removeBlog={removeBlog}
                user={user}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
