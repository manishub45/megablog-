import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  const src = appwriteService.getFileView(featuredImage); // preview → VIEW

  // (debug) dekhna ho to uncomment:
  // console.log("featuredImage id ->", featuredImage);
  // console.log("file view URL ->", src);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={src || "/placeholder.png"}
            alt={title}
            className="rounded-xl"
            loading="lazy"
            style={{ width: "100%", height: 180, objectFit: "cover" }}
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
