import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_AUTHORS, ALL_BOOKS,EDIT_YEAR } from '../queries'
import { useMutation } from '@apollo/client/react'
const Authors = ({ persons,show }) => {
  
  console.log(persons)
   const result = useQuery( ALL_BOOKS)
   console.log("here",result.data)

  const [selectedAuthor, setSelectedAuthor] = useState('')
const [born, setBorn] = useState('')

      const [changeYear] = useMutation(EDIT_YEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onCompleted: (data) => {
    console.log('mutation result:', data)
  },
  onError: (error) => {
    console.log('mutation error:', error)
  },
    
  })
  const submit = async (event) => {
    event.preventDefault()

    await changeYear({
  variables: {
    name: selectedAuthor,
    born: Number(born),
  },
})

    setSelectedAuthor('')
    setBorn('')
  }



  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {persons.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1> Set birth year</h1>
      <form onSubmit={submit}>
        <div>
      <label for="authorsname">Select year</label>
<select
  id="author"
  value={selectedAuthor}
  onChange={({ target }) => setSelectedAuthor(target.value)}
  required
>
  <option value="" disabled>select author</option>
  {persons.map(author => (
    <option key={author.id} value={author.name}>
      {author.name}
    </option>
  ))}
</select>
<label htmlFor="born">Birth year</label>

<input
  id="born"
  type="number"
  value={born}
  onChange={({ target }) => setBorn(Number(target.value))}
/>
    </div>
    <button type="submit">update author</button>
     </form>
    </div>
  )
}

export default Authors
