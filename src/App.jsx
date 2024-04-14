import './index.css';
import Header from './components/header';
import Intro from './components/intro';
import Body from './components/body';


function App() {
  

  return (
    <div className="App p-8 mx-auto bg-[#F0F6FF] min-h-[100vh] max-w-[768px]">

      <Header />
      <Intro />
      <Body />
      
  
    </div>
  );
}

export default App;
