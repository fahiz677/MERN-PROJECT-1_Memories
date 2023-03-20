import React,{useEffect} from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector,useDispatch } from "react-redux";
import {fetchPosts, reset} from '../../features/posts/postSlice'
import Post from './Post/Post'
import useStyles from './styles'

const Posts = ({setCurrentId}) => {
  const classes = useStyles();
  
  const dispatch = useDispatch()

  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    
    dispatch(fetchPosts())

    return () => {
      dispatch(reset())
    }
  }, [ isError, message, dispatch])

  if (isLoading) {
    return <CircularProgress /> 
  }
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;