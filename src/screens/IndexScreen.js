import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons'
//to make use of the context we have to import another hook function from react library
// hooks are functions that add additional functionalities to our components --> useContext

// we receive the props object from navigato to navigate through screens
// we can destructure it and take just the one we need that is navigation
const indexScreen = ({ navigation }) => {
    //console.log(props);
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        getBlogPosts();
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts()
        //we have to clean up the listener when we do not show the component
        // if we rewturn a function, the function will be invoked when 
        // the component will not ne shown in the screen
        return  () => {}
            listener.remove()
        })
    }, [])

    return (
                <View>    
                    <FlatList 
                    data={state}
                    keyExtractor={blogPost => blogPost.title}
                    renderItem={ ({item}) => {
                        return(
                            <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                                <View style={styles.row}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                        <Feather name="trash" style={styles.icon} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    } }
                    />
                </View>
            )
};

indexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                                <Feather name="plus" size={30} />
                            </TouchableOpacity>,
        title: "Blog List"
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
});

export default indexScreen;

