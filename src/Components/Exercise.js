import React  from 'react'
import { Paper, Grid, List, ListItem, ListItemText, 
    Typography,
    IconButton,
    Icon,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import  {makeStyles} from '@material-ui/styles'
import Form from './Form'


const useStyles = makeStyles({
    paper: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10, 
        height: 'calc(100% - 10px)',
        overflowY: 'auto'
    },
    '@global': {
        'html, body, #root': {
            height: '100%'
        }
    },
    container:{
        height: 'calc(100% - 64px - 48px)'
    }
})

export default ({ 
    exercises, 
    category, 
    onSelect,
    onDelete, 
    onEdit, 
    editMode,
    onCreateExcercise,
    toggleOpen,
    groups,                                                                             
    exercise: 
        {
            title = 'Welcome!', 
            description ='Please select an excercise from left', 
            muscles='',
            id
        } 
    }
            ) => {
const classes = useStyles()

return (
    <Grid container className={classes.container}>
    <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
            {exercises.map(([cat, exr]) => 
                !category || category === cat 
                ? <div key={cat}>
                    <Typography variant='h5' style={{textTransform: "capitalize"}}>
                        {cat}
                    </Typography>        
                    <List>
                        {exr.map( ({title, id}) => 
                            <ListItem button
                                key={id}
                                onClick={() => onSelect(id)}
                            >
                                <ListItemText>{title}</ListItemText>
                                <IconButton
                                    aria-label="Edit"
                                    onClick={(e) => {
                                        e.stopPropagation() 
                                        onEdit(id)
                                        }
                                    }
                                    color="primary"
                                >
                                    <Icon>edit_icon</Icon>
                                </IconButton>
                                <IconButton 
                                    aria-label="Delete"
                                    onClick={(e) => {
                                        e.stopPropagation() 
                                        onDelete(id)}
                                    }
                                    color="primary"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem> 
                        )}
                    </List>
                </div>
                : 
                null
            )}
        </Paper>
    </Grid>
        <Grid item xs={12} sm={6} >
            <Paper className={classes.paper}>
                {editMode 
                    ? 
                    <Form
                        key={id}
                        onCreateExcercise={onCreateExcercise}
                        groups={groups}
                        ex={{title, description, id, muscles}}
                        toggleOpen={toggleOpen}
                    /> 
                    : <div>
                        <Typography variant="h3">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" style={{ marginTop: 10 }}>
                            {description}
                        </Typography>
                    </div>    
                }
            </Paper>
    </Grid> 
</Grid>
)
}
