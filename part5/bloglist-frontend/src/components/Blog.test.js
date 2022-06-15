import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  let mockHandler;

  beforeEach(() => {
    const blog = {
      title: 'blog title',
      author: 'theo author',
      url: 'www.example.com',
      likes: 1,
      user: {
        id: 'userid',
        username: 'testusername',
        name: 'Hammy Joe',
      },
    };
    mockHandler = jest.fn();
    container = render(<Blog blog={blog} updateLikes={mockHandler} user={blog.user}/>).container;
  });

  test('renders content', () => {
    const div = container.querySelector('.blogItem');
    expect(div).toBeDefined();
  });

  test('blog does not render url and likes initially', () => {
    const innerDiv = container.querySelector('.moreInfo');
    expect(innerDiv).toBe(null);
  });

  test('after clicking the view button, url and likes are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const div = container.querySelector('.moreInfo');
    expect(div).toBeDefined();
  });
  
  test("like button clicked twice, event handle is called twice", async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view');
    await user.click(viewButton);
    
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })

});
