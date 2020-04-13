import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm'

 //onSubmit has to pass from BlogPostForm the new updated title and content
const CreateScreen = ({ navigation }) => {
    const { addBlogPost } = useContext(Context);
   
    return <BlogPostForm onSubmit={(title, content) => {
        addBlogPost(title, content, () => navigation.navigate('Index')
        )}} />
  
};

const styles = StyleSheet.create({
    
});

export default CreateScreen;