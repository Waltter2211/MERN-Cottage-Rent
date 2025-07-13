import React, { useContext } from "react"
import UserContext from "../contexts/UserContext"
import Home from "./Home"
import PropTypes from 'prop-types';


function Private({Component}) {
    let loggedUser = useContext(UserContext)
  return (
    <div>
        {loggedUser.loggedUser !== null?<Component />:<Home />}
    </div>
  )
}

Private.propTypes = {
  Component: PropTypes.object.isRequired
}

export default Private