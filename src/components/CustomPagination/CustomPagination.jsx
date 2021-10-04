/* eslint-disable no-lone-blocks */
import React from "react"
import Pagination from "@mui/material/Pagination"
import { useHistory } from "react-router"
import { setPageAction } from "../../store/reducers/moviesReducer"

import './CustomPagination.scss'
import { useDispatch, useSelector } from "react-redux"

const CustomPagination = ({ activePage, query, type }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const totalPages = useSelector(state => state.movies.numberOfPages)

  const handlePageChange = page => {
    dispatch(setPageAction(page))
    window.scroll(0, 0)
    
    switch (type) {
      case 'search':
        history.push(`/${type}/${page}/${query}`)
        break;

        case 'genre':
          history.push(`/${type}/${query}/${page}`)
          break;
    
      default:
        history.push(`/${type}/${page}`)
        break;
    }
  }

  console.log(activePage)

  return (
    <div className="pagination">
      <Pagination
        count={totalPages}
        shape="rounded"
        onChange={e => {
          handlePageChange(e.target.textContent)
        }}
        hideNextButton
        hidePrevButton
        size="large"
        siblingCount={4}
        defaultPage={Number(activePage)}
      />
    </div>
  )
}

export default CustomPagination
