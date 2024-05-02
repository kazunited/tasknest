import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal,ActivityIndicator } from "react-native"
import { Stack } from "expo-router"
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import TodoList from '../components/TodoList'
import { StatusBar } from 'expo-status-bar'
import AddListModal from "../components/AddListModal"
import { Theme } from "../theme/Theme"
import Config from "../config/Config"

export default class Home extends React.Component {

  state = {
    addTodoVisible: false,
    lists: tempData,
    user: {},
    loading: true
  };

  componentDidMount(){
    firebase = new Config((error, user) => {
      if(error){
        return alert("Something went worng")
      }

      firebase.getLists(lists => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });

        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount(){
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  };
  renderList = list => {
    return <TodoList list={list} updateList={this.updateList}/>
  };
  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos:[]
    });
  };
  updateList = list => {
    firebase.updateList(list);

  };



  render() {
    if(this.state.loading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Theme.blue} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Modal 
        animationType="slide" 
        visible={this.state.addTodoVisible} 
        onRequestClose={() => this.toggleAddTodoModal()}
         >
          <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList}/>

        </Modal>
   
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Task<Text style={{ fontWeight: "300", color: Theme.blue }}>Nest</Text>

          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name="plus" size={16} color={Theme.blue} />
          </TouchableOpacity>

          <Text style={styles.add}>Add List</Text>

        </View>
        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item) }
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: Theme.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    paddingHorizontal: 64,
    fontWeight: "600"
  },
  addList: {
    borderWidth: 2,
    borderColor: Theme.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"

  },
  add: {
    color: Theme.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8

  }
});