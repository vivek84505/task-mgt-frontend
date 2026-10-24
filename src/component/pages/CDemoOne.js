import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"


function CDemoOne(){

    const {theme,toggleTheme } = useContext(ThemeContext)
    return(
        <div>
             <div className="container mt-5">
      <div
        className={`card shadow p-4 text-center ${
          theme === "light"
            ? "bg-light text-dark border-dark"
            : "bg-dark text-white border-light"
        }`}
      >
        <h2>Welcome to React Context API</h2>

        <p className="mt-3">
          Current Theme: <strong>{theme.toUpperCase()}</strong>
        </p>

        <p>
          This box changes its appearance automatically using the
          <strong> useContext </strong> hook.
        </p>
      </div>
    </div>
        </div>
    )
}

export default CDemoOne