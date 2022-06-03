const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let max = -1;
  let index = -1;
  blogs.forEach((blog, i) => {
    if (blog.likes > max) {
      max = blog.likes;
      index = i;
    }
  });
  let fav = blogs[index];
  return { title: fav.title, author: fav.author, likes: fav.likes };
};

const mostBlog = (blogs) => {
  let author;
  const authorCount = new Map();
  blogs.forEach((blog) => {
    if (!authorCount.has(blog.author)) {
      authorCount.set(blog.author, 1);
    } else {
      authorCount.set(blog.author, authorCount.get(blog.author) + 1);
    }
  });

  author = [...authorCount.entries()].reduce((a, e) => (e[1] > a[1] ? e : a));
  return { author: author[0], blogs: author[1] };
};

const mostLikes = (blogs) => {
  let author;
  const authorCount = new Map();
  blogs.forEach((blog) => {
    if (!authorCount.has(blog.author)) {
      authorCount.set(blog.author, blog.likes);
    } else {
      authorCount.set(blog.author, authorCount.get(blog.author) + blog.likes);
    }
  });
  author = [...authorCount.entries()].reduce((a, e) => (e[1] > a[1] ? e : a));
  return { author: author[0], likes: author[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes,
};
