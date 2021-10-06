import React from "react"
import { useHistory } from "react-router"
import "./NotFoundPage.scss"
import sadCat from './cat.jpg'

const NotFoundPage = () => {

  const history = useHistory()

  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className="notFound">
      <div className="container">
        <div className="wrapper">
          <h1 className="notFound__title">
            Nothing found :(
          </h1>
          <div className="back" onClick={handleBack}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              alt="back"
            />{" "}
            Go back
          </div>
          <div className="cat">
            <img src={sadCat} alt="sad cat" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
