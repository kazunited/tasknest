import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'


export default TodoList = ({list}) => {
    // read todo data from tempData list 
    const completedCount = list.todos.filter(todo => todo.completed).length; 
    const remainingCount = list.todos.length - completedCount;
    
    return(
            //display todo list 
            <View style={[styles.listContainer, {backgroundColor: list.color}]}>
                <Text style = {styles.listTitle} numberOfLines={1}>
                    {list.name}
                </Text>
                
                <View>
                    <View style={{alignItems: "center"}}>
                        
                        <Text style={styles.count}>{completedCount}</Text> 
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.subtitle}>completed</Text>
                    </View>
                </View>
            </View>
        
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200,
        height: 300
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white

    }
})