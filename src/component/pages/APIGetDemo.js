import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function APIGetDemo() {

    const [posts,setPosts] = useState([]) 
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        userId: "",
        title: "",
        body: "",
     });


    useEffect(() => {
        getPosts();
    },[])

    const getPosts = async () => {
        try{
            
            const response = await api.get("/posts")
            setPosts(response.data)
        }
        catch (error) {
            console.log("Error======>",error)
        }
    }
    

      // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.userId.trim()) {
      newErrors.userId = "User ID is required";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Body is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log("Form Validated:", formData);
        
    const response = await api.post("/posts",{
            userId: Number(formData.userId),    
            title:  formData.title,
            body: formData.body
        });
        
      setFormData({
        userId: "",
        title: "",
        body: "",
     })  

     setErrors({})
 
     if( response.status === 201 ){
        alert('Form Submitted sucessfully')
        setPosts((prevPosts) => [
            response.data,...prevPosts
        ])
     }  
     else{
        alert('Something went wrong!')
     }
       
    } catch (error) {
      console.log("POST Error======>", error);
      alert('Something went wrong!',error)
    }
  };

  return (
    <div className="container mt-4">

      {/* ================= FORM ================= */}

      <h2 className="mb-4">Create Post</h2>

      <form onSubmit={handleSubmit}>

        <div className="row">

          {/* User ID */}
          <div className="col-md-4">
            <div className="form-group mb-3">

              <label htmlFor="userId">
                User ID
              </label>

              <input
                type="number"
                className="form-control"
                id="userId"
                name="userId"
                placeholder="Enter User ID"
                value={formData.userId}
                onChange={handleChange}
              />

              <small className="text-danger">
                {errors.userId}
              </small>

            </div>
          </div>

          {/* Title */}
          <div className="col-md-4">
            <div className="form-group mb-3">

              <label htmlFor="title">
                Title
              </label>

              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter Title"
                value={formData.title}
                onChange={handleChange}
              />

              <small className="text-danger">
                {errors.title}
              </small>

            </div>
          </div>

          {/* Body */}
          <div className="col-md-4">
            <div className="form-group mb-3">

              <label htmlFor="body">
                Body
              </label>

              <input
                type="text"
                className="form-control"
                id="body"
                name="body"
                placeholder="Enter Body"
                value={formData.body}
                onChange={handleChange}
              />

              <small className="text-danger">
                {errors.body}
              </small>

            </div>
          </div>

        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>

      </form>


      {/* ================= TABLE ================= */}

      <h2 className="mt-5 mb-3">
        Post List
      </h2>

      <div className="table-responsive">

        <table className="table table-bordered table-striped">

          <thead className="table-dark">

            <tr>
              <th>Post ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>

          </thead>

          <tbody>

            {posts.length > 0 ? (

              posts.map((post) => (

                <tr key={post.id}>

                  <td>
                    {post.id}
                  </td>

                  <td>
                    {post.userId}
                  </td>

                  <td>
                    {post.title}
                  </td>

                  <td>
                    {post.body}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="text-center"
                >
                  No posts found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}
