import logo from "./logo.svg";
import "./App.css";
import Signup from "./auth/Signup";
import Navbar from "./shared/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Signup />
    </div>
  );
}

export default App;
