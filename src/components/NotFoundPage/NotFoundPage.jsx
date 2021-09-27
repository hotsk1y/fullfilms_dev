import React from "react"
import "./NotFoundPage.scss"

const NotFoundPage = () => {
  const sadCat = `https://data.whicdn.com/images/347582182/original.jpg`

  return (
    <div className="notFound">
      <div className="container">
        <div className="wrapper">
          <h1 className="notFound__title">
            В базе данных не нашлось информации об этом запросе :(
          </h1>
          <div className="cat">
            <img src={sadCat} alt="sad cat" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
