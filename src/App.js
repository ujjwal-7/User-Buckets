import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BoardProvider } from "./context/boards";
function App() {
  
  
  return (
    
      <BoardProvider>
        <Navbar/>
        <Home/>
      </BoardProvider>
    
  )
}

export default App;
