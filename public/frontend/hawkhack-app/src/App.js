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
              <div className="App" style={{ display: 'flex' }}>
              <div className='left'>
                <style>
                  @import url('https://fonts.googleapis.com/css2?family=Baloo+Da+2&display=swap');
                </style>
                <div style={{ backgroundColor: "#759EB8", padding: '10px', color: '#fff' }}>
                  <RouterProvider style={{ color: '#fff' }} router={router} />
                </div>
                <div className='description'>
                  <div>
                    <h2>Welcome to Froogle! 👋</h2>
                    <h3>About</h3>
                    <p>
                      Welcome to our revolutionary cooking website! 
                      Our one of a kind platform provides you with personalized recipe 
                      recommendations based on the ingredients you have on hand!
                    </p>
                    <h3>Instructions</h3>
                    <p>
                    Simply input the ingredients you have , and let the magic work!  We will generate a list of mouthwatering, legendary recipes for you to choose from! Whether you're a beginner in the kitchen or an experienced chef, our website is designed to help you cook the perfect meal in no time!
                    </p>
                  </div>
                </div>
              </div>
              <div className='right'>
              
              <input type="text" placeholder="Enter some ingredients" style={{ 
                margin: '30px 0',
                width: "50%", 
                height: 15,
                backgroundColor: "#efefef",
                border: "1px solid #eee",
                padding: '12px 15px',
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
                </div>
                );
              }
              
              
              export default App;
              