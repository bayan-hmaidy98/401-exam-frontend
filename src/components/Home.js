import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import {Row, Card, Button } from 'react-bootstrap';


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coins: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/api').then(response => {
      this.setState({coins: response.data})
    }) .catch(err => alert(err));
  }
  createFav = (index) => {

    const body = {
      title: this.state.coins[index].title,
      image_url: this.state.coins[index].image_url,
      description: this.state.coins[index].description,
      toUSD:this.state.coins[index].toUSD,
    }

    axios.post('http://localhost:3030/createFav' , body ).then(response =>{}).catch(error =>alert (error));

  }


  render() {
    console.log(this.state.coins);
    return (
      <>
        <h1>Crypto List</h1>

        <Row xs={1} md={3} >
        {this.state.coins.length >0 && 
        this.state.coins.map((coin, idx) => {
          return (
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={coin.image_url} />
          <Card.Body>
            <Card.Title>{coin.title}</Card.Title>
            <Card.Text>
             {coin.description}
            </Card.Text>
            <Card.Text>
             {coin.toUSD}
            </Card.Text>
            <Button variant="primary" onClick ={() => this.createFav(idx)}>Add to favorites</Button>
          </Card.Body>
        </Card>
         ) })}
        </Row>
      </>
    )
  }
}

export default Home;
