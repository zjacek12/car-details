import React, {Component} from 'react';
import {Container, Header, Content, Item, Input, Icon, H2, Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';

export default class Home extends Component {
  state = {
    vin: '',
    year: ''
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <H2>
            Get your vehicles info
          </H2>
        </Header>
        <Content style={styles.content}>
          <Item style={styles.item}>
            <H2 style={styles.h2}>Enter Vehicle VIN Number and Model Year</H2>
          </Item>
          <Item style={styles.item}>
            <Icon active name='car'/>
            <Input placeholder='VIN Number' value={this.state.vin} onChangeText={(vin) => this.setState({vin})}/>
          </Item>
          <Item style={styles.item}>
            <Icon active name='calendar'/>
            <Input placeholder='Year' value={this.state.year} onChangeText={(year) => this.setState({year})}/>
          </Item>
          <Item style={styles.item}>
            <Button style={styles.button} title={'Search'} active primary full onPress={() => {
              this.props.navigation.navigate('CarDetails', {vin: this.state.vin, year: this.state.year})
            }}>
              <Text>
                Search
              </Text>
            </Button>
          </Item>
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
    paddingTop: 50,
  },
  button: {
    width: '95%',
    marginTop: 10,
  },
  item: {
    alignSelf: 'center'
  },
  h2: {
    textAlign: 'center'
  }
});
