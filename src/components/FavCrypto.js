import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Row, Card, Button } from 'react-bootstrap';

import UpdateForm from './UpdateForm';

class FavCrypto extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favCoins: [],
      coinsObj: {},
      showingUpdatModal: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/favCrypto').then(response => {
      this.setState({ favCoins: response.data })
    }).catch(error => alert(error));
  }

  deleteCoin = (id) => {
    axios.delete(`http://localhost:3030/deleteCoin/${id}`).then(response => {
      this.setState({ favCoins: response.data })
    }).catch(err => alert(err));
  }

  showModal = (element) => {
    this.setState({
      coinsObj: element,
      showingUpdatModal: true,
    })
  }

  updateModal = (e) => {
    const coinId = this.state.coinsObj._id;

    const body = {
      title: e.target.title.value,
        description: e.target.description.value,
        image_url: e.target.image_url.value,
        toUSD: e.target.toUSD.value,
    }

    axios.put(`http://localhost:3030/updateCoin/${coinId}` , body).then(response => {
      const updatedArr = this.state.favCoins.map(coin => {
        if (coin._id === coinId){
          coin.title = response.data.title;
          coin.description = response.data.description;
          coin.image_url = response.data.image_url;
          coin.toUSD = response.data.toUSD

          return coin;
        }
        return coin;
      })

      this.setState({ 
        favCoins: updatedArr,
        coinsObj: {},
        showingUpdatModal: false
      })
    }).catch(error => alert (error));

  

  }


  render() {
    return (
      <>
        <h1>Fav Crypto List</h1>

        
      {this.showModal &&
        <UpdateForm
        
        show = {this.state.showingUpdatModal}
        showingModal = {this.showModal}
        coinsObj = {this.state.coinsObj}
        updateModal = {this.updateModal}
        />
      }
        <Row xs={1} md={3} >
          {this.state.favCoins.length > 0 &&
            this.state.favCoins.map((coin, idx) => {
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
                    <Button style={{ marginRight: '10px' }} variant="primary" onClick={() => this.deleteCoin(coin._id)}>Delete</Button>
                    <Button style={{ marginRight: '10px' }} variant="primary" onClick={() => this.showModal(coin)}>Update</Button>
                  </Card.Body>
                </Card>
              )
            })}
        </Row>
      </>
    )
  }
}

export default FavCrypto;
