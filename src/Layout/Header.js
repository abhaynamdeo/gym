import React from 'react'
import { AppBar, Typography, IconButton} from '@material-ui/core'
import Toolbar  from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import Brightness2 from '@material-ui/icons/Brightness2'
import BrightnessHigh from '@material-ui/icons/BrightnessHigh'
import Create from '../Components/Create'

export default ({ groups, ex, onCreateExcercise, themeToggle, theme}) => {
    console.log('theme', theme)

    return (
    <AppBar position="static" >
        <Toolbar>
            <IconButton edge="start"  color="inherit" aria-label="Menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{flex: 1}}>
                    Exercise Database
            </Typography>
            <IconButton style={{margin: 10}}
                onClick={themeToggle}
            >   
                {theme.palette.type === 'light' 
                    ? <Brightness2/>
                    : <BrightnessHigh />}
            </IconButton>
            <Create
                groups={groups}
                ex={ex}
                onCreateExcercise={onCreateExcercise}
            />
        </Toolbar> 
    </AppBar>
    )

}