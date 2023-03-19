import {Container} from "@material-ui/core"
import Header from '../src/components/Header';
import Body from "./components/Body";
import { useRef } from 'react';

const App =() =>{
   
    const ref = useRef(null);
    
    return(
        <Container ref={ref} maxWidth="lg">
             <Header />
             <Body />
        </Container>
    )
}

export default App;

