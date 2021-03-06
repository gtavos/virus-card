import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import CardDeck from './CardDeck'

class ListCardDeck extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      descartar1: false,
      descartar2: false,
      descartar3: false
    };
    this.onPressCheck = this.onPressCheck.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onPressCheck(pos){
    if(pos===1){
      this.setState({descartar1: !this.state.descartar1});
    }
    if(pos===2){
      this.setState({descartar2: !this.state.descartar2});
    }
    if(pos===3){
      this.setState({descartar3: !this.state.descartar3});
    }
  }

  onClick(){
    let keyPlayer = this.props.keyPlayer
    let descartar1 = this.state.descartar1
    let descartar2 = this.state.descartar2
    let descartar3 = this.state.descartar3
    this.props.onPressDescartar(keyPlayer, descartar1, descartar2, descartar3)
    this.setState({
      descartar1: false,
      descartar2: false,
      descartar3: false
    });
  }

  render() {
    let room = this.props.room
    let keyPlayer = this.props.keyPlayer
    let list = null
    let player = null
    let number = null
    let turn = null
    let winner = null
    let disabledCheck = null
    let disabled = null
    if(room !== null){
      player = room.players[keyPlayer]
      number = keyPlayer
      turn = room.turn
      winner = room.winner !== undefined
      disabledCheck = number!==turn
      disabled = (number!==turn || (!this.state.descartar1 && !this.state.descartar2 && !this.state.descartar3 ))
      list = player===null? null : player.deck.map((card, i) =>
        <CardDeck key={i} player={keyPlayer} disabled={disabledCheck || winner} card={card} 
        pos={i} checked={this.state['descartar'+(i+1)]} onPressCheck={this.onPressCheck}
        onPressTirar={this.props.onPressTirar} />
      );
    }
    return (
      <React.Fragment>
        Maso
        <Row>
          <Col>
            <Row style={{paddingBottom: '10px'}}>
              {list}
            </Row>
            <Row>
              <Col>
                <Button variant="dark" disabled={disabled || winner} block onClick={this.onClick}>Descartar</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ListCardDeck;
