import React, { useState } from "react";

export const ImageUpload = () => {
    const [recipeImage, setRecipeImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
   // const upload_preset = import.meta.env.VITE_UPLOAD_PRESET

    const handleImageChange = (e) => {
        setRecipeImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const uploadImage = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            let imageURL;
            console.log(recipeImage)
            if (recipeImage) {
                const image = new FormData()
                image.append("file", recipeImage)
                image.append("cloud_name", "dmzyjpbtb")
                image.append("upload_preset", "mvrksupa")
               const response = await fetch(
                "https://api.cloudinary.com/v1_1/dmzyjpbtb/image/upload",
             {
                method: "post",
                body: image
             }
               )
               const imgData = await response.json()
               console.log(imgData)
               imageURL= imgData.url.toString()
               setImagePreview(null)
            }
            //here can sent the imageURL into the mongoDb database
            alert(imageURL);

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
        
    }

    return (
        <section>
        <div className="container">
            <h2>Upload Image</h2>
            <div> 
                <form onSubmit={uploadImage}>
                    <p> 
                        <label> Recipe Image</label>
                        <input type="file" name="image" onChange={handleImageChange}/>
                    </p>
                    <p>
                        {
                            isLoading ? ("Uploading...") : (
                                <button type="submit">
                                    Upload Image
                                </button>
                            )
                        }
                    </p>
                </form>
                <div>
                    {imagePreview && (
                        <img src={imagePreview && imagePreview} alt="recipeImage" />
                    )}
                </div>
            </div>
        </div>
        </section>
    )
}