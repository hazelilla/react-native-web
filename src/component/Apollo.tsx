import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import {useQuery, useMutation} from '@apollo/client';
import {CREATE_POST, GET_USER, DELETE_POST} from '../utils/gql_apis';

const Apollo = () => {
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
  });
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postId, setPostId] = useState(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const {data, loading, refetch} = useQuery(GET_USER, {
    variables: {id: 1},
  });

  const [createPost, {loading: mutationLoading, data: mutationData}] =
    useMutation(CREATE_POST);

  const [deletePost, {loading: deleteLoading, data: deleteData}] =
    useMutation(DELETE_POST);

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
    if (mutationData) {
      setPostId(mutationData.createPost.id);
      refetch();
    }
    if(deleteData) {
      setPostTitle('');
      setPostBody('');
    }
  }, [data, mutationData, refetch, deleteData]);

  const handleCreatePost = () => {
    createPost({
      variables: {
        input: {
          title: postTitle,
          body: postBody,
        },
      },
    });
  };

  const handleDeletePost = () => {
    if (postId) {
      setPostTitle('');
      setPostBody('');
      deletePost({
        variables: {id: postId},
      }).then(() => {
        setShowDeleteMessage(true);
        setTimeout(() => setShowDeleteMessage(false), 2000); 
        refetch();
      });
    }
  };

  if (loading || mutationLoading || deleteLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username: {user.username}</Text>
      <Text style={styles.label}>Email: {user.email}</Text>
      <TextInput
        placeholder="Post Title"
        value={postTitle}
        onChangeText={setPostTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Post Body"
        value={postBody}
        onChangeText={setPostBody}
        style={styles.input}
      />
      <Button title="Create Post" onPress={handleCreatePost} color="#0066cc" />
      {mutationData && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Post Created!</Text>
          <Text style={styles.successText}>
            Title: {mutationData.createPost.title}
          </Text>
          <Text style={styles.successText}>
            Body: {mutationData.createPost.body}
          </Text>
        </View>
      )}
      {showDeleteMessage && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Post Deleted!</Text>
        </View>
      )}
      <Button title="Delete Post" onPress={handleDeletePost} color="#cc0000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userData: {
    fontWeight: 'normal',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: 250,
    backgroundColor: '#fff',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  successContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#28a745',
    marginBottom: 5,
  },
});

export default Apollo;