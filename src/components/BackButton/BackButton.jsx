import React from "react"
import "./BackButton.scss"
import { useHistory } from "react-router"

const BackButton = () => {
  const history = useHistory()

  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className="back" onClick={handleBack}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
        alt="back"
      />{" "}
      Назад
    </div>
  )
}

export default BackButton
