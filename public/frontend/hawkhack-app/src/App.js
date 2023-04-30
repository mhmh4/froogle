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

var event;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Froogle</h1>
        <Link style={{ color: '#eee' }} to="/about"> About Us</Link>
        &nbsp;
        <Link style={{ color: '#eee' }} to="/mainapp"> Mainapp</Link>
        &nbsp;
        <Link style={{ color: '#eee' }} to="/placeholder">Placeholder</Link>
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
            border: '1.5px solid #eee',
            width: "150px",
            borderRadius: 12,
          }
          return (<>
            <br></br>
            <div style={projectStyle}>
            <p style={{ fontWeight: "bold", }}>{project.name}</p>
            <p>{project.calories}</p>
            </div>
            </>)
          }
          const storageArray =[];
          
          async function fetchRecipes(input) {
            let parameters = '';
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
              <div style={{ backgroundColor: "#104911", padding: '3px 0px', color: '#fff' }}>
                <RouterProvider style={{ color: '#fff' }} router={router} />
              </div>
              <div>
                <p>THis is where the about page description will go</p>
                <p>put this into a grid and beef up text</p>
              </div>
              

              <input type="text" placeholder="Enter some ingredients" style={{ 
                width: "40%", 
                height: 15,
                backgroundColor: "#efefef",
                border: "1px solid #eee",
                padding: '10px',
                borderRadius: 15
              }} 
              onChange={(event) => { setName(event.target.value); }}/>
              <button style={
                { 
                  fontSize: 20,
                  color: 'white',
                  backgroundColor: "#71697A" }
                } onClick={() => {
                    let _projects = [...projects];
                    
                    _projects.push({
                      name: name
                    })
                    setProjects(_projects)
                    fetchRecipesAndUpdate();  
                  }}>Add</button>
              <div style={{ display: "flex", gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {projects.map(projectMapper)}
              </div>    
              <div>
              <br></br>
              <br></br>
                  </div>
                  
                  <p>{JSON.stringify(message)}</p>
                  </div>
                  );
                }
                
                export default App;
