import React from "react"
import "./Loader.scss"

import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"

export default function Loader() {
  return (
    <div className="loader">
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    </div>
  )
}
