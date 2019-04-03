import React, { Component } from 'react';
import {  Container, Segment, Table, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { transactionList } from '../../actions';
import _ from 'lodash';

const INITIAL_STATE = {
  list: []
}

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  componentWillMount() {
     this.getList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
       if (nextProps.list.transactions) {
        this.setList(nextProps);
      }
    }
  }

  getList = () => {
    this.props.transactionList();
  }

  setList = props => {
    if (props && props.list.transactions) {
      this.setState(() => ({
        list: props.list.transactions
      }));
    }
  }

  // renderTotal = (transactions) => {
  // 	let result = 0;
  // 	if(transactions) {
  // 	 transactions.forEach((data) => {
  //      result = result + data;
  //    })
  // 	}    
  //   return result;
  // }

  renderData = (transactions) => {
    let output = '('
  	transactions.forEach((data) => {
       output = `${output} ${data}, `
     })
  	output = output.substring(0, output.length - 2);
  	output = `${output} )`
  	return output;
  }

  renderTransactionListTable = () => {
    return (
      <Table celled definition>    
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>January</Table.HeaderCell>
            <Table.HeaderCell>February</Table.HeaderCell>
            <Table.HeaderCell>March</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        { 
         _.map(this.props.list.transactions, ({ name, transactionHistory }, index) => (
          <Table.Row key={index}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{this.renderData(transactionHistory.January)}</Table.Cell>
            <Table.Cell>{this.renderData(transactionHistory.February)}</Table.Cell>
            <Table.Cell>{this.renderData(transactionHistory.March)}</Table.Cell>
          </Table.Row>
         ))
        }  
        </Table.Body>
      </Table>    
    )
  }

  calculateRewardPoints = (transactions) => {
  	let result = 0;
  	if(transactions) {
  	 transactions.forEach((data) => {
  	 	result = (data > 100) ? (result + ((data - 100) * 2)) : result;
  	 	result = (data > 50) ? (result + (data - 50)) : result;
     })
  	}    
    return result;
  }

  calculateTotalRewardPoints = (transactionHistory) => {
  	let janRewardPoints = this.calculateRewardPoints(transactionHistory.January);
  	let febRewardPoints = this.calculateRewardPoints(transactionHistory.February);
  	let marchRewardPoints = this.calculateRewardPoints(transactionHistory.March);
  	return janRewardPoints + febRewardPoints + marchRewardPoints;
  }

  renderRewardPoints = () => {
  	return (
  	  <Table celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>January</Table.HeaderCell>
            <Table.HeaderCell>February</Table.HeaderCell>
            <Table.HeaderCell>March</Table.HeaderCell>
            <Table.HeaderCell>Total Points Earned</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        { 
         _.map(this.props.list.transactions, ({ name, transactionHistory }, index) => (
          <Table.Row key={index}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{this.calculateRewardPoints(transactionHistory.January)}</Table.Cell>
            <Table.Cell>{this.calculateRewardPoints(transactionHistory.February)}</Table.Cell>
            <Table.Cell>{this.calculateRewardPoints(transactionHistory.March)}</Table.Cell>
            <Table.Cell>{this.calculateTotalRewardPoints(transactionHistory)}</Table.Cell>
          </Table.Row>
         ))
        }  
        </Table.Body>
      </Table>
  	)
  }

  render() {
    return (
    	<section id="Login" className="container center"> 
          <Segment>
            <Container>
            <Header as='h2' textAlign='center'>
              Transaction Details
            </Header>
            {this.renderTransactionListTable()}
            <br/>
            <Header as='h2' textAlign='center'>
              Reward Points Earned
            </Header>
            {this.renderRewardPoints()} 
            </Container>
          </Segment>
        </section>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({transactionList}, dispatch)
};

const mapStateToProps = (state) => ({
  list: state.transaction_reducer
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
