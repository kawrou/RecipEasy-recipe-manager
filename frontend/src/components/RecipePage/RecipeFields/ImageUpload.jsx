import React, { useState } from "react";
import { updateRecipeImage } from "../../../services/recipes";

export const ImageUpload = ({ recipeId, token }) => {
    const [recipeImage, setRecipeImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
   const upload_preset = import.meta.env.VITE_UPLOAD_PRESET

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
                image.append("upload_preset", upload_preset)
               const response = await fetch(
                "https://api.cloudinary.com/v1_1/dmzyjpbtb/image/upload",
             {
                method: "post",
                body: image
             }
               )
               const imgData = await response.json()
               imageURL= imgData.url.toString()
               setImagePreview(null)

               await updateRecipeImage(token, recipeId, imageURL);
               setIsLoading(false);
            }

            console.log(imageURL);

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
        
    }

    return (
        <section>
            <div className="container mx-auto p-4">
                <form onSubmit={uploadImage} className="rounded-md overflow-hidden flex items-center">
                    <div className="ml-auto flex space-x-2">
                        <label htmlFor="fileInput" className="bg-indigo-50 hover:bg-gray-200 text-secondary-500 font-kanit font-bold text-lg h-12 px-4 rounded-lg flex items-center cursor-pointer">
                            Choose File
                            <input id="fileInput" type="file" name="image" onChange={handleImageChange} className="hidden" />
                        </label>
                        {
                            isLoading ? ("Uploading...") : (
                                <button className="bg-secondary-500 hover:bg-blue-900 text-white font-kanit font-bold text-lg h-12 px-4 rounded-lg flex items-center shadow-md" type="submit">
                                    Upload Image
                                </button>
                            )
                        }
                    </div>
                </form>
            </div>
        </section>
    )
}