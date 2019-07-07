import React from 'react'
import {AppBar, Tabs, useMediaQuery} from '@material-ui/core'
import Tab from '@material-ui/core/Tab'
import { useTheme } from '@material-ui/core/styles';


export default ({category, onSelect, muscles}) => {
const theme = useTheme();
const isLessThanEqXs = useMediaQuery(theme.breakpoints.down('xs'));

 return (  
    <AppBar position='static'>
        <Tabs
            value={ muscles.findIndex( e => e === category ) + 1}
            onChange={(e, index) => 
                index === 0 
                    ? onSelect('')  
                    : onSelect(muscles[index - 1])
                }
            indicatorColor="secondary"
            textColor="secondary"
            centered={!isLessThanEqXs}
            variant={isLessThanEqXs ? 'scrollable' : 'standard'}
        >
            <Tab label="All" />
            {muscles.map( e => 
            <Tab key={e} label={e} />    
                )}
        </Tabs>
    </AppBar>
 )

}