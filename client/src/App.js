import {Container} from "@material-ui/core"
import Header from '../src/components/Header/Header.jsx'
import Dashboard from "./pages/Dashboard";


const App =() =>{
   
    
    
    return(
        <Container  maxWidth="lg">
             <Header />
             < Dashboard />
        </Container>
    )
}

export default App;

