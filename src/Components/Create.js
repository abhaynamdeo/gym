import React from 'react'
import {Fab,  Dialog, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import Form from './Form'

export default ({onCreateExcercise, groups, ex}) => {

    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => setOpen(!open)

    return (
        <>
            <Fab 
                size="small" 
                onClick={toggleOpen}
            >
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Excersice</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter a new Excersice.
                </DialogContentText>    
                <Form
                    toggleOpen={toggleOpen}     
                    onCreateExcercise={onCreateExcercise} 
                    groups={groups}
                    ex={
                        {
                        title: '',
                        description: '',
                        muscles: '',
                        id: ''
                        }
                    }
                /> 
            </DialogContent>
        </Dialog>
      </>
      )
}