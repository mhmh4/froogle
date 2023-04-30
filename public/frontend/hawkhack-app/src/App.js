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
      <div style={{ textAlign: 'center' }}>
      <h1>froogle</h1>
      {/* <Link style={{ color: '#eee' }} to="/about"> About Us</Link> */}
      {/* &nbsp; */}
      {/* <Link style={{ color: '#eee' }} to="/mainapp"> Mainapp</Link> */}
      {/* &nbsp; */}
      {/* <Link style={{ color: '#eee' }} to="/placeholder">Placeholder</Link> */}
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
  }])
        
        const defaultFoods = [];
        
        const projectMapper = (project) => {
          const projectStyle = {
            border: '1.5px solid #ddd',
            width: "150px",
            borderRadius: 12,
          }
          return (<>
            <br></br>
            <div style={projectStyle}>
            <p style={{ fontWeight: "bold", }}>{project.name}</p>
            </div>
            </>)
          }
          const storageArray =[];
          
          async function fetchRecipes(input) {
            console.log("name=" + input);
            return await fetch(`http://localhost:5000/recipes?${input}`)
          }
          
          function App() {
            const [message, setMessage] = useState("");            
            const [projects, setProjects] = useState([...defaultFoods]);
            const [name, setName] = useState("");
            const [calories, setCalories] = useState("");
            
            const fetchRecipesAndUpdate = async() => {
              let response= (await fetchRecipes(name))
              setMessage(await response.text());
            }
            
            return (
              <div className="App">
                {/* <img className='foodImg' style={{ left: 10, top: 10 }} src="https://em-content.zobj.net/thumbs/120/google/350/avocado_1f951.png"/>
                <img className='foodImg' style={{ right: 23, top: 55 }} src="https://em-content.zobj.net/thumbs/120/google/350/watermelon_1f349.png"/>
                <img className='foodImg' style={{ right: 50, top: 100 }} src="https://em-content.zobj.net/thumbs/120/apple/354/mango_1f96d.png"/>

                <img className='foodImg' style={{ left: 20, top: 155 }} src="https://em-content.zobj.net/thumbs/120/apple/354/bread_1f35e.png"/> */}

              <div>
                {/* <div style={{ backgroundColor: "#A4BFEB", padding: '10px', color: '#fff' }}>
                  <RouterProvider style={{ color: '#fff' }} router={router} />
                </div> */}
                <div className='description'>
                  <div style={{ textAlign: "center" }}>
                    <h1 className="logo">froogle</h1>
                    <input className="search" type="text" placeholder="Enter some ingredients"
              onChange={(event) => { setName(event.target.value); }}/>
              <div>
              <button className='Btn' onClick={() => {
                  let _projects = [...projects];
                  _projects.push({
                    name: name
                  })
                  setProjects(_projects)
                  fetchRecipesAndUpdate();  
                }}>froogle search</button>
              <button className='Btn'>I'm feeling lucky</button>
              </div>
                  </div>
                </div>
              </div>
              <div>
              

                <div style={{ display: "flex", gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {projects.map(projectMapper)}
                </div>    
                <div>
                <br></br>
                </div>
                
                <p>{JSON.stringify(message)}</p>
                </div>
                </div>
                );
              }
                            
export default App;
