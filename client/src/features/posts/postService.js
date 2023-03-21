// import axios from 'axios';



// const url = 'http://localhost:5000/posts';

// export const fetchPosts = async() => {
  
//  const {data} =  await axios.get(url,);

//  return data;
// }

// export const createPost = async(newPost,) => {
  
//  const {data} =  await axios.post(url,newPost,);
//  return data;
// }

// export const updatePost = async(id, updatedPost,) =>{

  

//   const {data} = await axios.patch(`${url}/${id}`, updatedPost,);

//   return data ;
// } 

// export const likePost = async(id,) => {
  
//   const {data} = await axios.patch(`${url}/${id}/likePost`,);
//   return data;
// }

// export const deletePost = async(id,) =>{
  
//   const {data} = await axios.delete(`${url}/${id}`,);
//   return data;
// } 








import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
  }

  return req;
});

 const fetchPosts = () => API.get('/posts');
 const createPost = (newPost) => API.post('/posts', newPost);
 const likePost = (id) => API.patch(`/posts/${id}/likePost`);
 const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
 const deletePost = (id) => API.delete(`/posts/${id}`);

const postService = {
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
  }

export default postService;