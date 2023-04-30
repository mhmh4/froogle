import logo from './logo.svg';
import { About } from './pages/about.jsx';
import { Mainapp } from './pages/mainapp';
import { Placeholder } from './pages/placeholder';
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import './App.css';

const router = (
  <BrowserRouter>
    <div style={{ textAlign: 'center' }}>
      {/* <h1>froogle</h1> */}
      {/* <Link style={{ color: '#eee' }} to="/about"> About Us</Link> */}
      {/* &nbsp; */}
      {/* <Link style={{ color: '#eee' }} to="/mainapp"> Mainapp</Link> */}
      {/* &nbsp; */}
      {/* <Link style={{ color: '#eee' }} to="/placeholder">Placeholder</Link> */}
    </div>
  </BrowserRouter>
);

const defaultFoods = [];

const projectMapper = (project) => {
  const projectStyle = {
    border: '1.5px solid #ddd',
    width: "150px",
    borderRadius: 12,
  };
  
  return (
    <>
      <br />
      <div style={projectStyle} onClick={() => {
        const searchInput = document.querySelector('.search');
        searchInput.value = project.name;
      }}>
        <p style={{ fontWeight: "bold" }}>{project.name}</p>
      </div>
    </>
  );
};
const projectStyle = {
  border: '1.5px solid #ddd',
  width: "150px",
  borderRadius: 12,
  transition: "border-color 0.2s ease-in-out"
}

const hoverProjectStyle = {
  ...projectStyle,
  borderColor: "red"
}

const Project = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => setIsHovered(!isHovered);

  return (
    <div
      style={isHovered ? hoverProjectStyle : projectStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <p style={{ fontWeight: "bold" }}>{project.name}</p>
    </div>
  );
};



  const storageArray =[];
  
  async function fetchRecipes(input) {
    console.log("name=" + input);
    return await fetch(`http://localhost:5000/recipes?${input}`)
  }
  
  function App() {
    const [message, setMessage] = useState("");    
    const [projects, setProjects] = useState(() => {
      const storedProjects = localStorage.getItem("projects");
      return storedProjects ? JSON.parse(storedProjects) : [...defaultFoods];
    });
    
    useEffect(() => {
      localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    
    const [name, setName] = useState(() => {
      return localStorage.getItem("name") || "";
    });
    
    useEffect(() => {
      localStorage.setItem("name", name);
    }, [name]);

    
    const [calories, setCalories] = useState("");
    
    const fetchRecipesAndUpdate = async() => {
      let response= (await fetchRecipes(name))
      setMessage(await response.text());
    }
    
    // Get the name boxes and search bar elements

    
    const btnStyle = {
      fontSize: 20, 
      color: "white", 
      backgroundColor: "cornflowerblue",
      borderRadius: '3px',
      border: 0,
      padding: 10,
      margin: '0 10px'
    }
            return (
              <div className="App">
                {/* <img className='foodImg' style={{ right: 23, top: 55 }} src="https://em-content.zobj.net/thumbs/120/google/350/watermelon_1f349.png"/> */}
                {/* <img className='foodImg' style={{ right: 50, top: 100 }} src="https://em-content.zobj.net/thumbs/120/apple/354/mango_1f96d.png"/> */}

                {/* <img className='foodImg' style={{ left: 20, top: 155 }} src="https://em-content.zobj.net/thumbs/120/apple/354/bread_1f35e.png"/> */}

              <div>
                {/* <div style={{ backgroundColor: "#A4BFEB", padding: '10px', color: '#fff' }}>
                  <RouterProvider style={{ color: '#fff' }} router={router} />
                </div> */}
                  <div style={{ textAlign: "center", position: "relative" }}>
                    <img className='foodImg' style={{ left: 370, top: 20 }} src="https://em-content.zobj.net/thumbs/120/google/350/avocado_1f951.png"/>
                    <h1 className="logo">froogle</h1>
                    <img className='foodImg' style={{ right: 350, top: 1 }} src="https://em-content.zobj.net/thumbs/120/apple/354/strawberry_1f353.png"/>

                    <input className="search" style={{ 
marginBottom: '30px',
width: "40%",
height: 15,
backgroundColor: "#efefef",
border: "1px solid #eee",
padding: '18px 20px',
borderRadius: 30,
fontSize: 16,
boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 8px'
                    }} type="text" placeholder="Enter some ingredients"
              onChange={(event) => { setName(event.target.value); }}/>
              <div>
              <button style={{...btnStyle, backgroundColor: '#3E5641dd'}} onClick={() => {
                  if (!name || !name.trim()) return;
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
              <div style={{ padding: '20px 17%' }}>
                <div style={{ display: 'flex' }}>
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
