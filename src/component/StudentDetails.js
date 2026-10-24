 
function StudentDetails(props){
    {}
    console.log("StudentDetails Component Rendered============>")
    
    return(
        <div>
            <div class="student_id">
            <div class="top_section">

            <div class="student_name">
            <ul class="student_info">

            <li class="name">{props.details.name}</li>

            <li class="age"><span class="bold">Age: {props.details.age}</span></li>
            </ul>
            </div>
            </div>

            <div class="bottom_section">
            <div class="student_details">
            <ul>

            <li><span class="bold">ID:</span> {props.details.id} </li>

            <li><span class="bold">Course:</span> {props.details.course} </li>

            <li><span class="bold">Class:</span> {props.details.class} </li>
            </ul>
            </div>
            </div>
            </div>
        </div>
    )
}

export default StudentDetails;