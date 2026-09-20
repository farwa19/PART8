import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

import { useQuery } from '@apollo/client/react'
const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  if (result.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  if (result.error || booksResult.error) {
    return <div>{(result.error || booksResult.error).message}</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        persons={result.data.allAuthors}
        show={page === 'authors'}
      />

      <Books
        books={booksResult.data.allBooks}
        show={page === 'books'}
      />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
