import React,{useState} from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from '../components/Posts/Posts';
import Form from "../components/Form/Form";



const Dashboard = () => {

  const [currentId, setCurrentId] = useState(0);
 
  return (
    <Grow in>
    <Container>
      <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={7}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Container>
  </Grow>
  );
};

export default Dashboard;
