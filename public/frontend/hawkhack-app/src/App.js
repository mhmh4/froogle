import logo from './logo.svg';
import {About} from './pages/about.jsx';
import {Mainapp} from './pages/mainapp';
import {Placeholder} from './pages/placeholder';
import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
      <h1>Home Page</h1>
      <Link to="/about"> About Us</Link>
      <Link to="/mainapp"> Mainapp</Link>
      <Link to="/placeholder">Placeholder</Link>
    </div>
    ),
    
  },
  {
    path: "/about",
    element: (
      <>
        <About/>
      </>
    ),
  },
  {
    path: "/mainapp",
    element: (
      <>
        <Mainapp/>
      </>
    ),
  },
  {
    path: "/placeholder",
    element: (
      <>
        <Placeholder/>
      </>
    ),
  }

])

const defaultFoods = [{
  name: "Apple",
  calories: "65",
  tags: ["Crisp", "crunchy", "sweet", ]
},
{
  name: "Chicken",
  calories: "120",
  tags: ["artsy"]
}, {
  name: "Rice",
  calories: "60",
  tags: ["shrek"]
}];

const projectMapper = (project) => {
  const projectStyle = {
    backgroundColor: "rgba(255,200,200,50)",
    width: "50%",
    marginLeft: "25%",
    borderRadius: 10
  }
  return (<>
    <br></br>
    <div style={projectStyle}>
      <p style={{ fontWeight: "bold", color:"red" }}>{project.name}</p>
      <p>{project.calories}</p>
    </div>
  </>)
}
const storageArray =[];

async function fetchServer() {
  return await fetch("http://localhost:5000/recipes")
}

function App() {
  const [message, setMessage] = useState("");
  const x = async() => {
    let response= (await fetchServer())
    setMessage(await response.text());
    
  }
  x();
  
  const [projects, setProjects] = useState([...defaultFoods]);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");

  return (
    <div className="App">
      <div>
        <RouterProvider router={router} />
      </div>
    <p>{JSON.stringify(message)}</p>
      <div>
        <input type="text" placeholder="Name" style={{ width: "80%" }}
          onChange={(event) => { setName(event.target.value); }}/>
        <br></br>
        <br></br>
        <button style={
          { fontSize: 20,
            color: 'white',
            backgroundColor: "#71697A" }} onClick={() => {
          let _projects = [...projects];

          _projects.push({
            name: name
          })
          setProjects(_projects)
        }}>Add Foods</button>
      </div>
        <p>Foods</p>
        {projects.map(projectMapper)}
    </div>
  );
}

export default App;
