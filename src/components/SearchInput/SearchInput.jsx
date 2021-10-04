import React from 'react'
import './SearchInput.scss'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'

export default function SearchInput({page, query, setQuery}) {

    const history = useHistory()

  const handleKeyDown = useCallback((e) => {    
    if (e.keyCode === 13) {
      // console.log(query)
      history.push(`/search/${page}/${query}`)
    }
  }, [query, history, page])

    return (
        <div className="search">
          <input
            className="search__input"
            type="text"
            placeholder="Название фильма..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown={handleKeyDown}
          />
          <Link to={query.trim().length > 0 && `/search/${page}/${query}`} className="search__btn">Поиск...</Link>
        </div>
    )
}
