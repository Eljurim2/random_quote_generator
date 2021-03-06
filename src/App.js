import React, {Component} from 'react';
import {random} from 'lodash';
import 'typeface-roboto';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import QuoteMachine from './Components/QuoteMachine';

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center'
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state ={
      quotes: [],
      selectedQuoteIndex: null,
    }
    this.assignNewQuoteindex = this.assignNewQuoteindex.bind(this);
    this.generateNewQuoteIndex = this.generateNewQuoteIndex.bind(this);
  }

  componentDidMount() {

    fetch("https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json")
      .then(data => data.json())
      .then(quotes => this.setState({quotes}, this.assignNewQuoteindex));

  }

  get selectedQuote() {
    if (!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)) {
      return undefined;
    }
    return this.state.quotes[this.state.selectedQuoteIndex];
  }

/*
*Returns an integer representing an index in state.quotes
*If state.quotes is empty, returns undefined
*/
  generateNewQuoteIndex() {
    if(!this.state.quotes.length) {
      return undefined;
    }
    return random(0, this.state.quotes.length - 1);
  }

  assignNewQuoteindex() {
    this.setState({selectedQuoteIndex: this.generateNewQuoteIndex() })

  }


render() {
  return (
    <Grid className = {this.props.classes.container} id="quote-box" justify="center" container>
      <Grid xs = {11} lg = {8} item>
      {
        this.selectedQuote ?
          <QuoteMachine selectedQuote={this.selectedQuote} assignNewQuoteindex={this.assignNewQuoteindex} />
          : null}
      </Grid>
    </Grid>
  );
}
}

export default withStyles(styles)(App);
