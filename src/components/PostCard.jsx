import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group'>
        <div className='w-full justify-center mb-4 overflow-hidden rounded-xl h-40'>
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>
        <h2 className='text-xl text-center font-bold text-gray-900'>
          {title}
        </h2>
        <div className='text-center mt-5'>
            <span className='inline-block px-5 py-2 text-sm rounded-full bg-gray-200 text-gray-700 font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300'>
                Read More
            </span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;