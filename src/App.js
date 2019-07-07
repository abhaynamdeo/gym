import React, { Component } from 'react';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Exercise from './Components/Exercise';
import { muscles, exercises} from './Store'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blue, amber, blueGrey, teal, pink} from '@material-ui/core/colors';
import red from '@material-ui/core/colors/red';


const themeLight = createMuiTheme({
  palette: {
    primary: amber,
    secondary: blueGrey,
    error: red,
    type: 'light', // Switching the dark mode on is a single property value change.
  }
});

const themeDark = createMuiTheme({
  palette: {
    primary: {
      main: pink[400]
    },
    secondary: teal,
    error: red,
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});


export default class App extends Component {
  state = {
    exercises: exercises,
    category: '',
    exercise: '',
    editMode: false,
    theme: themeLight
  }

  onThemeToggle = () => this.setState( ({theme}) => 
    theme === themeLight 
    ? 
      {
        theme: themeDark
      }
     :
      {
        theme: themeLight
      }
    )

  onCategorySelect = (category) => {
    this.setState ({
      category
    })
  }


  getExerciseByMuscles() {
    const categories = muscles.reduce(
      (cat, muscles) => ({...cat, [muscles]: []}), {}
    )

    return Object.entries(this.state.exercises.reduce( (cat, exc) => {
      const {muscles} = exc 
      cat[muscles] = [...cat[muscles], exc]      
      return cat
    }, categories))
  }

  onExerciseSelect = (id) => {''
    console.log('select fired')
    let ex = this.state.exercises.find( e => e.id === id)
    this.setState(
      {exercise: ex}
    )
  }

  onCreateExcercise = (ex) => {
    // TODO Validation
    
    this.setState ( ({exercises, editMode}) => 
      (
        {
          exercises: [...exercises.filter(e => e.id !== ex.id), ex],
          exercise: ex,
          // editMode: !editMode
        }
      )
    )

  }

  onExerciseDelete = (id) => {
    
    this.setState(({ exercises, exercise, editMode}) => 
      ({
        exercises: exercises.filter( e => e.id !== id),
        exercise: exercise.id === id ? '' : exercise,
        editMode: exercise.id === id ? false : editMode,        
      })
    ) 
  }

  onExerciseEdit = (id) => {
    let exercise = this.state.exercises.find( e => e.id === id)
    this.setState(
      {
        exercise,
        editMode: true
      }
    )
  }

  onToggleOpen = () => {
    const ed =  !this.state.editMode
    this.setState( 
        { 
          editMode: ed
        }
      )
      
    console.log('edit mode:', ed, this.state)
  }

  render() {
    const { category, exercise, editMode, theme} = this.state,
      exercises = this.getExerciseByMuscles()
   
    return (
      <ThemeProvider theme={theme}>
        
          <Header
            groups={muscles}  
            ex={exercise}
            onCreateExcercise={this.onCreateExcercise}
            themeToggle={this.onThemeToggle}
            theme={theme}
          />
          <Exercise 
            exercises={exercises}
            category={category}
            onSelect={this.onExerciseSelect}
            onDelete={this.onExerciseDelete}
            onEdit={this.onExerciseEdit}
            exercise={exercise}
            editMode={editMode}
            toggleOpen={this.onToggleOpen}
            groups={muscles}
            onCreateExcercise={this.onCreateExcercise}
          />
          <Footer
              onSelect={this.onCategorySelect}
              category={category}
              muscles={muscles}
          />
      </ThemeProvider>
    );
  }
  
}

