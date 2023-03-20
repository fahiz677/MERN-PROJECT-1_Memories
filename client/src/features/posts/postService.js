import axios from 'axios';



const url = 'http://localhost:5000/posts';

export const fetchPosts = async() => await axios.get(url);

export const createPost = async(newPost) => await axios.post(url,newPost);

export const updatePost = async(id, updatedPost) => await axios.patch(`${url}/${id}`, updatedPost);

export const likePost = async(id) => await axios.patch(`${url}/${id}/likePost`);

export const deletePost = async(id) => await axios.delete(`${url}/${id}`);



const postService = {
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
  }

export default postService;