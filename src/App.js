import React, { useState } from 'react';
import quotes from './quotes.json';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image from './plantBackground.png';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundImage: `url(${Image})`,

  },
  title: {
    fontSize: 14,
  },
  quote: {
    fontFamily: "sans-serif",
  },
  pos: {
    marginBottom: 12,
    fontStyle: 'italic'
  },
});

function App() {

  const generateRandomQuote = (quotes) => {
    const keys = quotes.map(quote => Object.keys(quote));
    const randIndex = Math.floor(Math.random() * keys.length);
    const text = quotes[randIndex].text;
    const name = quotes[randIndex].author;
  
    return {text, name}
  }

  const getNameAndText = (quotes) => {
    const storageName = window.localStorage.getItem('name');
    const storageText = window.localStorage.getItem('text');

    if (storageText === "undefined" || storageText === null ) {
      const name = generateRandomQuote(quotes).name;
      const text = generateRandomQuote(quotes).text;
      return { name, text }
    } else {
      const name = JSON.parse(storageName);
      const text = JSON.parse(storageText);
      return { name, text }
    }
  }

  const [ name, setName ] = useState(getNameAndText(quotes).name);
  const [ text, setText ] = useState(getNameAndText(quotes).text);

  const setNameAndText = () => {
    const name = generateRandomQuote(quotes).name; 
    const text = generateRandomQuote(quotes).text;
    setName(name);
    setText(text);

    const stringifiedName = JSON.stringify(name);
    const stringifiedText = JSON.stringify(text);

    window.localStorage.setItem('name', stringifiedName);
    window.localStorage.setItem('text', stringifiedText);
  }

  const classes = useStyles();

  return (
     <Card className={classes.root}>
      <CardContent>
       <Typography className={classes.title} color="textSecondary" gutterBottom>
         Quote generator
       </Typography>
       <Typography className={classes.quote} variant="h5" component="h2">
       {text}
       </Typography>
       <Typography className={classes.pos} color="textSecondary">
       {name}
       </Typography>
     </CardContent>
     <CardActions>
       <Button size="small" color="primary" onClick={() => {
          setNameAndText()
        }}>New quote</Button>
     </CardActions>
   </Card>
  );
}

export default App;
