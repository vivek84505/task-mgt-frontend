import { useEffect, useState } from "react"

function Emodel(){

    const [ showmodal, setShowModal] = useState(false)
 
     
    useEffect(() => {
           
            const timer = setTimeout(() => {
                 setShowModal(true)
                //window.location.href = "https://www.google.com"
            },5000)

    },[])

    return(
        <div>
            
            { showmodal && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h2>Welcome Student!</h2>
                        <p>This popup appeared after 5 seconds.</p>

                        <button onClick={() => setShowModal(false)}>
                        Close
                        </button>
                    </div>
                </div>
            )}


            {/* {(showmodal == true) ? (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h2>Welcome Student!</h2>
                        <p>This popup appeared after 5 seconds.</p>

                        <button onClick={() => setShowModal(false)}>
                        Close
                        </button>
                    </div>
                </div>
            ):('')} */}
            


        </div>
    )
}


const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center"
  }
};

export default Emodel