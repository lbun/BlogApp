import createDataContext from './createDataContext';
import { call } from 'react-native-reanimated';
import jsonServer from '../api/jsonServer'

// by convention is state, but we could also call it blogPosts in our case
const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload
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

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts')
        // response.date === [{}, {}, {}, ... ]
        dispatch({type: 'get_blogposts', payload: response.data});
    };
};

// we need to have access to dispatch function inside createDataContext
const addBlogPost = dispatch => {
    // we are accepting title and content coming from component CreateScreen
    // we need to add callback function added in Create Screen to bavigate to Index
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', {title, content});
        dispatch({ type: 'add_blogpost', payload: { title, content } });
        if (callback) {
        callback();
        }
    }   
}

const deleteBlogPost = dispatch => {
    return async id => {
            await jsonServer.delete(`/blogposts/${id}`);
            dispatch({ type: 'delete_blogpost', payload: id})
    }
}

// this function will be calles inside the component 
// we need also to provide the id 
const editBlogPost = dispatch => {
    return async (id, title, content, callback) => { 
        await jsonServer.put(`/blogposts/${id}`, {title, content})
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
                                                        { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts }, 
                                                        []
                                                        );
