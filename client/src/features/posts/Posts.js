import React,{useEffect} from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector,useDispatch } from "react-redux";
import {  selectAllPosts, selectIsLoading, selectError , fetchPosts, getPostsStatus} from '../../features/posts/postsSlice';
import Post from "./Post/Post";

import useStyles from './styles';

const Posts = () => {
   const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const postStatus = useSelector(getPostsStatus);

  useEffect(() => {
    if (postStatus === 'idle') {
        dispatch(fetchPosts())
    }
}, [postStatus, dispatch])


  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post}  />
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;