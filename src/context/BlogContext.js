import createDataContext from './createDataContext'
import { call } from 'react-native-reanimated';

// by convention is state, but we could also call it blogPosts in our case
const blogReducer = (state, action) => {
    switch (action.type) {
        case 'add_blogpost':
            // heree we can add properties in the context
            return [...state, 
                {
                    id: Math.floor(Math.random() * 99999),
                    title: action.payload.title,
                    content: action.payload.content
                }];
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload );
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id 
                ? action.payload 
                : blogPost
            } )
        default:
            return state;
    }
};

//The naming of import is completely independent in default export and we can use 
//any name we like.

// we need to have access to dispatch function inside createDataContext
const addBlogPost = dispatch => {
    // we are accepting title and content coming from component CreateScreen
    // we need to add callback function added in Create Screen to bavigate to Index
    return (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: { title, content } });
        if (callback) {
        callback();
        }
    }   
}

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id})
    }
}

// this function will be calles inside the component 
// we need also to provide the id 
const editBlogPost = dispatch => {
    return (id, title, content, callback) => { 
        dispatch ({ 
            type: 'edit_blogpost', 
            payload: { id, title, content 
            } })
            if (callback) {
            callback()
            }

    }
}

export const { Context, Provider } = createDataContext(
                                                        blogReducer, 
                                                        { addBlogPost, deleteBlogPost, editBlogPost }, 
                                                        [{title:'testTitle',content:'bla bla bla',id:1245}]
                                                        );
