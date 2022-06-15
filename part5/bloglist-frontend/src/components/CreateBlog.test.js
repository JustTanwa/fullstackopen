import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'

test('<CreateBlog /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const createErrMock = jest.fn()
  const refMock = jest.fn()
  const user = userEvent.setup()

  render(<CreateBlog handleSubmit={createBlog} creationError={createErrMock} createRef={refMock} />)

  const titleInput = screen.getByPlaceholderText('Title of the blog')
  const authorInput = screen.getByPlaceholderText('Author of the blog')
  const urlInput = screen.getByPlaceholderText('Url of the blog')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'testing a title...' )
  await user.type(authorInput, 'testing a author...' )
  await user.type(urlInput, 'testing a url...' )
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a title...')
  expect(createBlog.mock.calls[0][0].author).toBe('testing a author...')
  expect(createBlog.mock.calls[0][0].url).toBe('testing a url...')
})