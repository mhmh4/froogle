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

import { DEFAULTS } from './Defaults'; import './Defaults';
import './App.css';


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function choice(options) {
  let random_index = getRandomIntInclusive(0, options.length - 1);
  return options[random_index];
}

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
    width: "200px !important",
    borderRadius: 12,
  };

  return (
    <>
      <br />
      <div className='project' style={projectStyle} onClick={() => {
        const searchInput = document.querySelector('.search');
        searchInput.value = project.name;
      }}>
        <p>{project.name}</p>
      </div>
    </>
  );
};
const projectStyle = {
  border: '1px solid #cdcdcd',
  minWidth: "200px !impotant",
  margin: '5px 5px',
  padding: '0 10px',
  borderRadius: 12,
  // transition: "border-color 0.2s ease-in-out"
  textOverflow: 'ellipsis',
  cursor: 'pointer'
}

const hoverProjectStyle = {
  ...projectStyle,
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
  
    let [name, setName] = useState(() => {
      return localStorage.getItem("name") || "";
    });
  
    const handleProvideIngredientsClick = () => {
      setName(choice(DEFAULTS));
    };
    
  
    useEffect(() => {
      localStorage.setItem("name", name);
    }, [name]);
  
    const [calories, setCalories] = useState("");
  
    const fetchRecipesAndUpdate = async () => {
      let response = await fetchRecipes(name);
      setMessage(await response.text());
    };
    
    function parse(data) {
      console.log(data);
      return data;
    }
  
    const btnStyle = {
      fontSize: 16,
      color: "white",
      backgroundColor: "#013220",
      borderRadius: "6px",
      border: 0,
      padding: 10,
      // margin: "0 10px",
      cursor: "pointer",
      width: 190,
    };
  
    const handleClearStorageClick = () => {
      localStorage.clear();
      setProjects([...defaultFoods]);
    };
  

    return (
      <div className="App">
        <div style={{   height: '200px', width: '200px', rotate: '30deg', zIndex: -1, backgroundColor: 'green', opacity: 0.05, position: 'absolute', left: 0, top: -90 }}></div>
        <div style={{   height: '200px', width: '200px', rotate: '30deg', zIndex: -1, backgroundColor: 'green', opacity: 0.05, position: 'absolute', right: -10, top: 100, borderRadius: '50%' }}></div>
        <div>
          <div style={{ textAlign: "center", position: "relative" }}>
            <div className="heading">
            <h1 className="logo" title="The home of recipe ideas">🥑 froogle</h1>

            <p className='text' style={{ color: '#333', marginBottom: '20px',
             fontSize: '20px',
             marginTop: '-2.3%',
             marginRight: '1%',         
             }}>The home of recipe ideas</p>
             </div>
            <input
              className="search"
              style={{
                marginBottom: "30px",
                width: "40%",
                height: 15,
                backgroundColor: "#eee",
                border: "1px solid #eee",
                padding: "18px 20px",
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                fontSize: 16,
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 2px",
              }}
              type="text"
              
              placeholder="Enter some ingredients here..."
              value = {name}
              onChange={(event) => {
              setName(event.target.value);
                
              }}
            />
              <button
                style={{ ...btnStyle, 
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                  padding: "16px 20px", 
                  borderTopLeftRadius: 0, 
                  width: '100px',
                  borderBottomLeftRadius: 0,
                  backgroundColor: '#466d1d',
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 2px",
              }}
                onClick={() => {
                  if (!name || !name.trim()) return;
                  let _projects = [...projects];
                  _projects.push({
                    name: name,
                  });
                  setProjects(_projects);
                  fetchRecipesAndUpdate();
                  
                  
                }}
              >
                Search
              </button>
            <div>
              <button style={{...btnStyle, margin: "0 10px"}} onClick={handleProvideIngredientsClick} value={name}>
                Provide Ingredients
              </button>
              <button style={{...btnStyle, margin: "0 10px"}} onClick={handleClearStorageClick}>
                Clear History
              </button>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px 20%" }}>
          <div style={{ display: "flex", minHeight: 70, overflowX: "scroll", backgroundColor: '#eee', borderRadius: '10px' }}>
            {projects.map(projectMapper)}
          </div>
          <div>
            <br></br> 
            </div>
            <p>
            <ol>{parse(message)} </ol></p>
         
              
        </div>
      </div>
    );
  }
  
                            
export default App;
