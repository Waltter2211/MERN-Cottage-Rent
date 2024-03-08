import { useContext } from "react"
import UserContext from "../contexts/UserContext"
import Home from "./Home"


function Private({Component}) {

    let loggedUser = useContext(UserContext)

    console.log(loggedUser.loggedUser)

  return (
    <div>
        {loggedUser.loggedUser !== null?<Component />:<Home />}
    </div>
  )
}

export default Private