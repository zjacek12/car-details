import React, {Component} from 'react';
import {Container, Header, Content, Item, H2, H3, Text, Card, CardItem, Body} from 'native-base';
import {LayoutAnimation, StyleSheet} from 'react-native';
import axios from 'axios';

export default class CarDetails extends Component {
  state = {
    isLoading: true,
    response: null,
    error: false,
  };

  componentDidMount() {
    const {params} = this.props.navigation.state;
    const vin = params ? params.vin : null;
    const year = params ? params.year : null;
    this.getCarDetails(vin, year);
  }

  getCarDetails = (vin, year) => {
    axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json&modelyear=${year}`)
      .then((res) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
          isLoading: false,
          response: res.data,
        });
      });
  };

  renderCarDetails() {
    let {response, error} = this.state;
    if (response !== null) {
      return response.Results
        .filter((entry) => (entry.Variable !== 'Suggested VIN' && entry.Variable !== 'Error Code' && entry.Variable !== 'Possible Values' && entry.Variable !== 'Additional Error Text' && entry.Value !== null))
        .map((entry) => {
          return <Card style={styles.card} key={entry.Variable}>
            <CardItem key={`${entry.Variable}-ci`}>
              <Body key={`${entry.Variable}-body`}>
              <H3 key={`${entry.Variable}-h3`}>{entry.Variable} :</H3><Text key={`${entry.Variable}-text`}>{entry.Value}</Text>
              </Body>
            </CardItem>
          </Card>;
        });
    } else if (error) {
      return <Item style={styles.item}>
        <H2>Error Retrieving Info, Try Again!</H2>
      </Item>;
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <H2>
            Vehicle Info
          </H2>
        </Header>
        <Content style={styles.content}>
          {this.renderCarDetails()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: 25,
    marginBottom: 25,
  },
  card: {
    // alignSelf: 'flex-start',
    paddingBottom: 5,
    paddingTop: 5,
    minWidth: '98%'
  },
});