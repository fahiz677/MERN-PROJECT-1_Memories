import React from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from "react-redux";
import {  selectAllPosts, selectIsLoading, selectError } from '../../reducers/posts';
import Post from "./Post/Post";

import useStyles from './styles';

const Posts = () => {
   const classes = useStyles();

  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);


  if (isLoading) {
    return <p>Loading...</p>;
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