function CDatalist(){

    let originalArray = [2,3,4,5] // multiply by 2
     
    let processedArray = originalArray.map((num) => {
         return num = num * 2
    })

    console.log("processedArray=========>",processedArray)
    let listData = ['Coffee','Tea','Milk','Cold Coffee','Coffee']
     

    return(
        <div>
            <h2>Datalist Demo</h2>
 

                    <ul>
                        {listData.map((item) => (
                            <li key={Math.floor(Math.random()  * 100) + 1}>{item}</li>
                        ))}
                    </ul>
        </div>
    )
}

export default CDatalist