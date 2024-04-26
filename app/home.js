import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from "react-native"
import { Stack } from "expo-router"
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import tempData from './tempData'
import TodoList from '../components/TodoList'
import { StatusBar } from 'expo-status-bar'
import AddListModal from "../components/AddListModal"
import { Theme } from "../theme/Theme"


export default class Home extends React.Component {

  state = {
    addTodoVisible: false,
    lists: tempData
  };

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  };
  renderList = list => {
    return <TodoList list={list} updateList={this.updateList}/>
  };
  addList = list => {
    this.setState({ lists: [...this.state.lists, {...list, id: this.state.lists.length + 1, todos: []} ] })
  };
  updateList = list => {
    this.setState({
      lists: this.state.lists.map(item => {

        return item.id === list.id ? list : item;
      })
    });
 
   
  };



  render() {
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
            keyExtractor={item => item.name}
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