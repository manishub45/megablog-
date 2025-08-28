import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * A reusable form component for both creating and updating a blog post.
 * It operates in 'Edit Mode' if a 'post' prop is provided, which contains the data
 * of an existing post. Otherwise, it runs in 'Create Mode' for a new post.
 * @param {Object} {post} - The post object to be edited. Null or undefined for a new post.
 */
export default function PostForm({ post }) {
    // Initialize react-hook-form with default values.
    // If we are in 'Edit Mode' (post object exists), pre-fill the form with its data.
    // Otherwise, use empty or default values for a new post.
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    // Retrieve current user's data from the Redux store to associate the post with the user.
    const userData = useSelector((state) => state.auth.userData);

    /**
     * Handles the form submission for both creating and updating a post.
     * @param {Object} data - The data collected from the form by react-hook-form.
     */
    const submit = async (data) => {
        // --- EDIT MODE LOGIC ---
        // If a 'post' object exists, we are updating an existing post.
        if (post) {
            // Check if the user has selected a new image file.
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            // If a new image is successfully uploaded, delete the old one.
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            // Update the post in the database.
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                // If a new file was uploaded, use its ID.
                // Otherwise, keep the existing image (undefined means don't update this field).
                featuredImage: file ? file.$id : undefined,
            });

            // If the update is successful, navigate to the post's page.
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // --- CREATE MODE LOGIC ---
            // If no 'post' object exists, we are creating a new post.
            
            // First, upload the featured image file. This is required for a new post.
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                // Get the file ID from the successful upload response.
                const fileId = file.$id;
                // Add the file ID to our form data object.
                data.featuredImage = fileId;
                
                // Create the post document in the database, merging the form data with the user's ID.
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                // If the creation is successful, navigate to the new post's page.
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    /**
     * A memoized function to transform a string into a URL-friendly slug.
     * It trims, converts to lowercase, and replaces spaces/special characters with hyphens.
     * @param {string} value - The input string (e.g., the post title).
     * @returns {string} The transformed slug.
     */
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    // A React effect to set up a subscription that watches the 'title' field.
    // When the title changes, it automatically generates and sets the 'slug' field.
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            // We only care about changes to the 'title' field.
            if (name === "title") {
                // Programmatically set the value of the 'slug' field.
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        // Cleanup function: Unsubscribe when the component is unmounted to prevent memory leaks.
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    // The image is only required when creating a new post (!post).
                    {...register("image", { required: !post })}
                />
                {/* If in Edit Mode, show a preview of the current featured image. */}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {/* The button text changes based on whether we are editing or creating. */}
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}