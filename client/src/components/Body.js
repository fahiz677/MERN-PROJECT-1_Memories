import React from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from "../features/posts/Posts";
import Form from "../features/Form/Form";
// import useStyles from '../styles';
const Body = () => {
  // const classes = useStyles();
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Body;
