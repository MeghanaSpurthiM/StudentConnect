import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// Using Stack layout from ReactBootstrap
import Stack from 'react-bootstrap/Stack';

// Using Bootstrap Components for responsive design
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// React Component to return one card of person's information
function PersonRow(props) {

    // To keep track of the number of clicks on the like button
    const [likes, setLikes] = React.useState(0);
    
    //Event Handler for the OnClick event on like button
    function handleClick() {
      setLikes(likes + 1);
    }

  // Reads the passed person information using props - puts them into a card and returns the component
  return (
    <Card id="customCard">
      <Card.Body id="cb">
      <ul>
        
        
          <Stack gap={2}>
            <li>Name: {(props.person.name)}</li>
            <li>Favorite: {(props.person.favoriteColor)}</li>

            <Stack direction="horizontal" gap={3}>
            
            <li>Favorite Food: {(props.person.favoriteFood)}</li>
        
            <Button variant="secondary" className='p-2 ms-auto' onClick={handleClick}>Like({likes})</Button>
            
            </Stack>
          </Stack>
        
       
        </ul>
      </Card.Body>
    </Card>
   
  );
}

// Component for Title - different props can generate components with different text - it is dynamic
function Header({ title }) {
  return <p className='h1'>{title ? title : 'Default Title'}</p>;
} 

// Starting point of execution"
function App() {
  
  // People array of information with 3 attributes each 
  // Please feel free to add more entries to the array and run it - the app is coded to be dynamic 
  // and will generate the new card components on the fly

  const People = [{'name':'Meghana','favoriteFood':'Tiramisu','favoriteColor':'Blue'},
    {'name':'Spurthi','favoriteFood':'Rasmalai','favoriteColor':'Green'},
    
  ]
 
  document.title = "MyClassmates"

  return (
  
    <div>
       <div className='container'>
        <div className='row '>
          <Header title="My Classmates" className=".ml-1 .px-2 "/>
        </div>
        <div className='row'>
        <ul>  
          {/* Using stack layout from ReactBootstrap to pile the records */}
            <Stack gap={3} className='.ml-1 .px-2'>
              {/* Reading each record from the People array and using map() to iterate through the list */}
                  {People.map((person) => (
                    // Card component for each record
                    <PersonRow person={person} key={person.name} ></PersonRow>
                  ))}
            </Stack>
        </ul>
        </div>
      </div>
    </div>
   );
}
   

export default App;
