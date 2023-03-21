import {Container} from "@material-ui/core"
import Header from '../src/components/Header/Header.jsx'
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth  from "./pages/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App =() =>{ 
    return( 
        <GoogleOAuthProvider clientId="706205926012-0o6hk3tcrq44k139sogu1arsckpo0quv.apps.googleusercontent.com">
        <Router>
        <Container  maxWidth="lg">
            <Header />
            <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/auth' element={<Auth />} />
            </Routes>  
        </Container>
        </Router>
        <ToastContainer />
        </GoogleOAuthProvider> 
    )
}

export default App;

