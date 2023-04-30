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

const DEFAULTS = [
  "Tomatoes, basil, and mozzarella","Avocado, lime, and cilantro","Peanut butter, soy sauce, and honey","Lemon, garlic, and olive oil","Bacon, lettuce, and tomato","Ginger, garlic, and soy sauce","Cinnamon, nutmeg, and cloves","Blueberries, honey, and yogurt","Parmesan cheese, garlic, and breadcrumbs","Apples, cinnamon, and caramel","Chicken, lemon, and rosemary","Black beans, corn, and cilantro","Cucumber, mint, and feta cheese","Garlic, onion, and bell pepper","Beef, mushrooms, and red wine","Sweet potato, cinnamon, and nutmeg","Salmon, dill, and lemon","Shrimp, garlic, and butter","Spinach, feta cheese, and sun-dried tomatoes","Pork, apple, and sage","Cherry tomatoes, garlic, and balsamic vinegar","Asparagus, lemon, and Parmesan cheese","Broccoli, garlic, and olive oil","Cauliflower, curry powder, and coconut milk","Carrots, ginger, and honey","Strawberries, balsamic vinegar, and black pepper","Green beans, almonds, and lemon zest","Quinoa, black beans, and avocado","Tuna, mayonnaise, and celery","Cilantro, lime, and jalapeno","Zucchini, garlic, and Parmesan cheese","Chocolate, hazelnut, and cream","Pesto, tomato, and mozzarella","Potato, cheddar cheese, and bacon","Cornmeal, flour, and buttermilk","Basil, tomato, and garlic","Artichoke, lemon, and garlic","Ham, Swiss cheese, and mustard","Figs, prosciutto, and balsamic vinegar","Cranberries, orange, and pecans","Blackberry, thyme, and goat cheese","Lemon, honey, and ginger","Cinnamon, sugar, and butter","Brown sugar, butter, and vanilla extract","Garlic, lemon, and olive oil","Tomato, onion, and cilantro","Chicken, mushroom, and thyme","Sausage, onion, and bell pepper","Cabbage, onion, and bacon","Eggplant, tomato, and mozzarella","Cherry, almond, and chocolate",
"Pineapple, coconut, and rum",
"Caramel, sea salt, and chocolate",
"Peanut butter, banana, and honey",
"Raspberry, lemon, and white chocolate",
"Maple syrup, bacon, and pecans",
"Sesame oil, soy sauce, and honey",
"Garlic, ginger, and hoisin sauce",
"Lemon, garlic, and oregano",
"Chili powder, cumin, and garlic",
"Cheddar cheese, jalapeno, and bacon",
"Scallions, garlic, and soy sauce",
"Turmeric, ginger, and coconut milk",
"Garlic, lemon, and cumin",
"Black pepper, thyme, and garlic",
"Ginger, garlic, and chili paste",
"Beef, onion, and green pepper",
"Bell pepper, onion, and garlic",
"Green onions, garlic, and ginger",
"Carrots, garlic, and ginger",
"Chicken, onion, and garlic",
"Cumin, coriander, and paprika",
"Apple, cinnamon, and nutmeg",
"Cinnamon, cloves, and ginger",
"Apple, cranberry, and walnut",
"Banana, peanut butter, and chocolate",
"Blueberry, lemon, and cream cheese",
"Lemon, garlic, and parsley",
"Sage, onion, and thyme",
"Potato, leek, and bacon",
"Butternut squash, sage, and brown butter",
"Fennel, orange, and olive oil",
"Pear, blue cheese, and arugula",
"Pecan, maple, and bourbon",
"Raspberry, brie, and basil",
"Coconut, lime, and cilantro",
"Cherry, almond, and cream cheese",
"Sweet potato, pecan, and marshmallow",
"Prosciutto, melon, and mint",
"Parmesan cheese, lemon, and black pepper",
"Green apple, cheddar cheese, and mustard",
"Feta cheese, cucumber, and red onion",
"Corn, tomato, and basil",
"Peach, basil, and balsamic vinegar",
"Honey, mustard, and thyme",
"Cucumber, avocado, and lime",
"Grapefruit, avocado, and shrimp",
"Lemon, basil, and pine nuts",
"Cherry tomato, mozzarella, and basil pesto.",
"Salmon, avocado, and wasabi",
"Quinoa, roasted vegetables, and tahini",
"Blackberry, mint, and lime",
"Cranberry, orange, and ginger",
"Grape, almond, and blue cheese",
"Radish, cucumber, and feta cheese",
"Caprese salad: tomato, mozzarella, and basil",
"Egg, spinach, and feta cheese",
"Lamb, rosemary, and garlic",
"Pear, walnut, and blue cheese",
"Brussels sprouts, bacon, and apple cider vinegar",
"Pesto, pine nuts, and Parmesan cheese",
"Beetroot, goat cheese, and arugula",
"Mushroom, truffle, and Parmesan cheese",
"Green beans, shallot, and bacon",
"Pork, apple, and cinnamon",
"Red pepper, tomato, and basil",
"Sweet potato, kale, and chorizo",
"Tomato, feta cheese, and olives",
"Tuna, avocado, and sesame seeds",
"Zucchini, feta cheese, and mint",
"Blueberry, lemon, and thyme",
"Coconut, lime, and mango",
"Apricot, almond, and honey",
"Balsamic vinegar, olive oil, and garlic",
"Cherry, lime, and tequila",
"Mango, lime, and chili",
"Blueberry, banana, and chia seeds",
"Lemon, honey, and rosemary",
"Cucumber, celery, and lemon",
"Feta cheese, cherry tomato, and oregano",
"Ginger, honey, and lemon",
"Pineapple, jalapeno, and cilantro",
"Fennel, orange, and pomegranate",
"Balsamic vinegar, olive oil, and honey",
"Parmesan cheese, garlic, and lemon zest",
"Ricotta cheese, basil, and lemon",
"Butternut squash, sage, and nutmeg",
"Gouda cheese, apple, and rosemary",
"Pistachio, honey, and goat cheese",
"Radicchio, pear, and gorgonzola",
"Red onion, goat cheese, and arugula",
"Watermelon, feta cheese, and mint",
"Carrot, ginger, and orange",
"Banana, chocolate, and hazelnut",
"Blueberry, lemon, and ricotta cheese",
"Chocolate, raspberry, and cream",
"Mango, coconut, and lime",
"Pomegranate, orange, and mint",
"Sweet potato, black beans, and avocado",
"Lemon, olive oil, and parsley",
"Peach, basil, and goat cheese",
"Shrimp, garlic, and lemon",
"Strawberry, basil, and balsamic vinegar",
"Cranberry, walnut, and blue cheese",
"Lemon, thyme, and garlic",
"Apple, cheddar cheese, and rosemary",
"Caramel, apple, and cinnamon",
"Carrot, raisin, and walnut",
"Cauliflower, tahini, and lemon",
"Cherry, almond, and vanilla",
"Chickpea, cucumber, and feta cheese",
"Orange, carrot, and ginger",
"Pecan, goat cheese, and honey",
"Pear, prosciutto, and arugula",
"Roasted vegetables, quinoa, and feta cheese"
]




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
  width: "200px",
  margin: '10px 10px',
  borderRadius: 12,
  // transition: "border-color 0.2s ease-in-out"
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

    
    let [name, setName] = useState(() => {
      return localStorage.getItem("name") || "";
    });
    
    const handleProvideIngredientsClick = () => {
      setName('test');
    }

    useEffect(() => {
      localStorage.setItem("name", name);
    }, [name]);

    
    const [calories, setCalories] = useState("");
    
    const fetchRecipesAndUpdate = async() => {
      let response= (await fetchRecipes(name))
      setMessage(await response.text());
    }
    
    // Get the name boxes and search bar elements

    function parse(data) {
      console.log(data);
      return data
    }
    
    const btnStyle = {
      fontSize: 16, 
      color: "white", 
      backgroundColor: "cornflowerblue",
      borderRadius: '6px',
      border: 0,
      padding: 10,
      margin: '0 10px',
      cursor: 'pointer',
      width: 190
    }
            return (
              <div className="App">

              <div>
                {/* <div style={{ backgroundColor: "#A4BFEB", padding: '10px', color: '#fff' }}>
                  <RouterProvider style={{ color: '#fff' }} router={router} />
                </div> */}
                  <div style={{ textAlign: "center", position: "relative" }}>
                    <img className='foodImg' style={{ left: 400, top: 20, rotate: '-80deg' }} src="https://em-content.zobj.net/thumbs/120/google/350/avocado_1f951.png"/>
                    <h1 className="logo">froogle</h1>
                    <img className='foodImg' style={{ right: 350, top: 1, rotate: '40deg' }} src="https://em-content.zobj.net/thumbs/120/apple/354/strawberry_1f353.png"/>
                    <img className='foodImg' style={{ right: 430, top: 40, rotate: '30deg' }} src="https://em-content.zobj.net/thumbs/120/apple/354/bell-pepper_1fad1.png"/>
                    <img className='foodImg' style={{ right: 343, top: 55 }} src="https://em-content.zobj.net/thumbs/120/google/350/watermelon_1f349.png"/>
                <img className='foodImg' style={{ left: 330, top: 50 }} src="https://em-content.zobj.net/thumbs/120/apple/354/mango_1f96d.png"/>

                {/* <img className='foodImg' style={{ left: 20, top: 155 }} src="https://em-content.zobj.net/thumbs/120/apple/354/bread_1f35e.png"/> */}

                    <input className="search" style={{ 
marginBottom: '30px',
width: "40%",
height: 15,
backgroundColor: "#eee",
border: "1px solid #eee",
padding: '18px 20px',
borderRadius: 30,
fontSize: 16,
boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 2px'
                    }} type="text" placeholder="Enter some ingredients"
              onChange={(event) => { setName(event.target.value); }}/>
              <div>
              <button style={{...btnStyle}} onClick={() => {
                  if (!name || !name.trim()) return;
                  let _projects = [...projects];
                  _projects.push({
                    name: name
                  })
                  setProjects(_projects)
                  fetchRecipesAndUpdate();  
                }}>Search for Recipes</button>
              <button style={btnStyle} onClick={handleProvideIngredientsClick}>Provide Ingredients</button>
                  </div>
                </div>
              </div>
              <div style={{ padding: '20px 20%' }}>
                <div style={{ display: 'flex', minHeight: 70, overflow: 'scroll' }}>
                  {projects.map(projectMapper)}
                </div>    
                <div>
                <br></br>
                </div>                
                <p>{parse(JSON.stringify(message))}</p>
                <p>{choice(DEFAULTS)}</p>
                </div>
                </div>
                );
              }
                            
export default App;
