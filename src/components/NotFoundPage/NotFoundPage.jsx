import React from "react"
import { useHistory } from "react-router"
import "./NotFoundPage.scss"

const NotFoundPage = () => {
  const sadCat = `https://data.whicdn.com/images/347582182/original.jpg`

  const history = useHistory()

  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className="notFound">
      <div className="container">
        <div className="wrapper">
          <h1 className="notFound__title">
            В базе данных не нашлось информации <br /> об этом запросе :(
          </h1>
          <div className="back" onClick={handleBack}><img src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png" alt="back" /> Назад</div>
          <div className="cat">
            <img src={sadCat} alt="sad cat" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
