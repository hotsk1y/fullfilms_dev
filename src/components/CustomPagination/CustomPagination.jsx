/* eslint-disable no-lone-blocks */
import React from "react"
import Pagination from "@mui/material/Pagination"
import { useHistory } from "react-router"

import './CustomPagination.scss'

const CustomPagination = ({ totalPages, setPage, activePage, query, type }) => {
  const history = useHistory()

  const handlePageChange = page => {
    setPage(page)
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
