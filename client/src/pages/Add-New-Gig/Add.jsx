import React, { useEffect, useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [errors, setErrors] = useState({}); // New state for form errors



  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => { 
    e.preventDefault();


     // Check for form validation
     const validationErrors = {};
     if (!state.title) {
       validationErrors.title = "Title is required";
     }
     if (!state.cat) {
       validationErrors.cat = "Category is required";
     }

     if (!state.desc) {
       validationErrors.desc = "Description is required";
     }
     if (!state.shortTitle) {
       validationErrors.shortTitle = "Short Title is required";
     }
     if (!state.shortDesc) {
       validationErrors.shortDesc = "Short Desc is required";
     }
     if (!state.deliveryTime) {
       validationErrors.deliveryTime = "Delivery Time is required";
     }
     if (!state.revisionNumber) {
       validationErrors.revisionNumber = "Revision Number is required";
     }
    
     if (!state.price) {
       validationErrors.price = "Price is required";
     }
     // Add similar checks for other required fields
 
     // If there are errors, update the state and stop form submission
     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
       return;
     }
 
     // Reset the errors state if there are no errors
     setErrors({});
 



    mutation.mutate(state);
    navigate("/mygigs")







  };

  return (
    <div className="add">
      <div className="container">
        <h1 className="text-3xl font-bold">Add New Gig</h1>
        <div className="sections">
          <div className="info ">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              className="border border-gray-400"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            {errors.title && <span className="error">{errors.title}</span>} {/* Display error message */}

            <label htmlFor="">Category</label>
            <select name="cat" id="cat" className="border border-gray-400" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            {errors.cat && <span className="error">{errors.cat}</span>} {/* Display error message */}

            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                //  className="border border-gray-400"
                  type="file"
                  name="cover"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                {errors.cover && <span className="error">{errors.cover}</span>} {/* Display error message */}
                
                <label htmlFor="">Upload Images</label>
                <input
                  //  className="border border-gray-400"
                  type="file"
                  name="gigImage"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
                {errors.gigImage && <span className="error">{errors.gigImage}</span>} {/* Display error message */}

              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              className="border border-gray-400"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>            
            {errors.desc && <span className="error">{errors.desc}</span>} {/* Display error message */}

            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
             className="border border-gray-400"
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            {errors.shortTitle && <span className="error">{errors.shortTitle}</span>} {/* Display error message */}

            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              className="border border-gray-400"
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            {errors.shortDesc && <span className="error">{errors.shortDesc}</span>} {/* Display error message */}

            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number"  className="border border-gray-400" name="deliveryTime" onChange={handleChange} />
            {errors.deliveryTime && <span className="error">{errors.deliveryTime}</span>} {/* Display error message */}

            <label htmlFor="">Revision Number</label>
            <input
             className="border border-gray-400"
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />

            {errors.revisionNumber && <span className="error">{errors.revisionNumber}</span>} {/* Display error message */}



            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input name="feature"  className="border border-gray-400" type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            {errors.feature && <span className="error">{errors.feature}</span>} {/* Display error message */}

            <label htmlFor="">Price</label>
            <input type="number" className="border border-gray-400" onChange={handleChange} name="price" />
            {errors.price && <span className="error">{errors.price}</span>} {/* Display error message */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;