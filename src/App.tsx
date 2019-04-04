import React, { Component } from 'react';
import './App.css';
import Shops from './components/shops/Shops';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme: any) => ({
    root: {
        flexGrow: 1,
        marginTop: 50
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

type Props = {
    classes: {
        root: string,
        paper: string,
        control: string,
    }
}

class App extends Component<Props> {
    render() {
        const {classes} = this.props;

        return (
            <div className="App">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <header className="App-header">
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={8}>
                            <Shops/>
                        </Grid>
                    </Grid>
                </header>
            </div>
        );
    }
}

export default withStyles(styles)(App);
