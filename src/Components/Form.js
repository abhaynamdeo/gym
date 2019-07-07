import React, {useState} from 'react'
import {
    Button, TextField,
    FormControl,
    InputLabel,
    Select,
    Input,
    MenuItem, makeStyles
    } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%',
    }
}));

export default (
    {   
    toggleOpen, 
    onCreateExcercise, 
    groups, 
    ex: 
        {
            title, 
            description, 
            muscles, 
            id
        }
    }
    ) => {
    const classes = useStyles()
    
    const [excercise, setExcercise] = useState(
        {
        title,
        description,
        muscles,
        id
        }
    )

    const handleChange = name => event => {
        setExcercise({ ...excercise, [name]: event.target.value })
    }

    // useEffect (() => {
    //     setExcercise(        
    //         {
    //             title,
    //             description,
    //             muscles,
    //             id
    //         }
    //     )
    // }, [title, description, muscles, id])

    const handleSubmit = () => {
        toggleOpen()
        onCreateExcercise(
            {
                id: excercise.title.toLowerCase().replace('/ /g', '-'),
                ...excercise
            }
        )
        setExcercise({
            title: '',
            description: '',
            muscles: '',
        })
    }   


    console.log("State: ", excercise)

    return (

        <form> 
            <TextField
                autoFocus
                fullWidth
                margin="dense"
                id="title"
                label="Title"
                type="text"
                value={excercise.title}
                onChange={handleChange('title')}
            />
            <TextField
                onChange={handleChange('description')}
                fullWidth
                margin="dense"
                id="Desc"
                label="Description"
                type="text"
                multiline
                rows="4"
                value={excercise.description}
            />
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="muscles">Muscles</InputLabel>
                <Select
                value={excercise.muscles}       
                onChange={handleChange('muscles')}
                input={<Input name="muscles" id="muscles" />}
                >
                    {groups.map(
                        cat => 
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <br/>
            <div style={{display: 'flex', flexDirection: 'row-reverse' }}>
            <Button
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
                style={{marginTop: 10}}
            >
                Submit
            </Button>
            </div>
        </form>
    )
}