import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard, Animated } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons"
import { Theme } from "../theme/Theme"
import { Swipeable } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';




export default class TodoModal extends React.Component {
    state = {
        newTodo: ""
    };

    toggleTodoCompleted = index => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    };

    addTodo = () => {
        let list = this.props.list;

       
      
        list.todos.push({title: this.state.newTodo, completed: false});
        this.props.updateList(list);
        
        this.setState({ newTodo: "" });

        Keyboard.dismiss();
    };

    deleteTodo = index => {
        let list = this.props.list;
        list.todos.splice(index, 1);

        this.props.updateList(list);
    }

    renderTodo = (todo, index) => {
        return (
            <GestureHandlerRootView>
                <Swipeable renderRightActions={(_, dragX) => this.rightAction(dragX, index)}>
                    <View style={styles.todoContainer}>
                        <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                            <AntDesign
                                name={todo.completed ? "checksquare" : "checksquareo"}
                                size={24}
                                color={Theme.gray}
                                style={{ width: 32 }} />
                        </TouchableOpacity>

                        <Text
                            style={[
                                styles.todo,
                                {
                                    textDecorationLine: todo.completed ? 'line-through' : 'name',
                                    color: todo.completed ? Theme.gray : Theme.black
                                }
                            ]}

                        >
                            {todo.title}
                        </Text>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };

    rightAction = (dragX, index) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.9],
            extrapolate: "clamp"
        });

        const opacity = dragX.interpolate({
            inputRange: [-100, -20, 0],
            outputRange: [1, 0.9, 0],
            extrapolate: "clamp"
        })
        return (
            <TouchableOpacity onPress={() => this.deleteTodo(index)}>
                <Animated.View style={[styles.DeleteButton, {opacity: opacity}]}> 
                    <Animated.Text style={{color: Theme.white, fontWeight:"800", transform: [{ scale }] }}>
                        Delete
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>

        )
    };



    render() {
        const list = this.props.list

        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed).length;

        return (

            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
                        onPress={this.props.closeModal}

                    >
                        <AntDesign name="close" size={24} Theme={Theme.black} />
                    </TouchableOpacity>

                    <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>
                                {completedCount} of {taskCount} tasks
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.section, { first: 3 }]}>
                        <FlatList
                            data={list.todos}
                            renderItem={({ item, index }) => this.renderTodo(item, index)}
                            keyExtractor={item => item.title}
                            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <View style={[styles.section, styles.footer]} >
                        <TextInput
                            style={[styles.input, { borderColor: list.color }]}
                            onChangeText={text => this.setState({ newTodo: text })}
                            value={this.state.newTodo}
                        />
                        <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={() => this.addTodo()}>
                            <AntDesign name="plus" size={16} color={Theme.white} />
                        </TouchableOpacity>

                    </View>

                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: Theme.black,

    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: Theme.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8

    },

    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center"

    },
    todo: {
        color: Theme.blue,
        fontWeight: "700",
        fontSize: 16
    },
    DeleteButton: {
        flex: 1,
        backgroundColor: Theme.red,
        justifyContent: "center",
        alignItems: "center",
        width: 80
    }


});