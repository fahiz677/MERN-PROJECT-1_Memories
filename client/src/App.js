import {Container} from "@material-ui/core"
import Header from '../src/components/Header';
import Body from "./components/Body";


const App =() =>{
   
    
    
    return(
        <Container  maxWidth="lg">
             <Header />
             <Body />
        </Container>
    )
}

export default App;

