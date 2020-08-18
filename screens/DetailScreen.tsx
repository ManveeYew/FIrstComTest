import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Button, FlatList, View, ActivityIndicator, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { connect, useDispatch } from 'react-redux'
import { fetchUserList, createUser, deleteUser, updateUser } from '../redux/actions/user.action';
import { Text } from '../components/Themed';

function DetailScreen({ user, isLoading, navigation, createIsLoading }) {
  const dispatch = useDispatch()
  // selectedIndex
  const [selectedIndex, setIndex] = useState(0);
  // firstname
  const [firstName, onChangeFirstName] = useState('');
  // firstname
  const [lastName, onChangeLastName] = useState('');
  // firstname
  const [email, onChangeEmail] = useState('');
  // update modal
  const [modalVisible, setModalVisible] = useState(false);
  // user list
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    dispatch(fetchUserList())
    setUserList(user);
  }, []);

  //navigation create button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            dispatch(createUser({
              "email": `user${user.length + 1}@gmail.com`,
              "first_name": 'user',
              "id": user.length + 1,
              "last_name": `${user.length + 1}`,
            }))
          }}
          title="Create"
        />
      ),
    });
  }, [navigation,user]);

  const showUserAlert = () => {
    Alert.alert(
      "Select one action",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Update", onPress: () => {
            setModalVisible(true)
          }
        },
        { text: "Delete", onPress: () => dispatch(deleteUser(user, selectedIndex)) }
      ],
      { cancelable: false }
    );
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setIndex(index)
        onChangeFirstName(item.first_name)
        onChangeLastName(item.last_name)
        onChangeEmail(item.email)
        showUserAlert()
      }
    }>
      <View style={styles.userContainer}>
        <Text>{`${item.first_name} ${item.last_name}`}</Text>
        <Text>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {isLoading || createIsLoading &&
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={'black'} animating={true}/>
        </View>
      }
      {!isLoading && 
        <FlatList
          data={user}
          extraData={user}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update User</Text>
            <TextInput
              placeholder="First Name"
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
              onChangeText={text => onChangeFirstName(text)}
              value={firstName}
            />
            <TextInput
              placeholder="Last Name"
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
              onChangeText={text => onChangeLastName(text)}
              value={lastName}
            />
            <TextInput
              placeholder="Email"
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
              onChangeText={text => onChangeEmail(text)}
              value={email}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{ ...styles.openButton, borderColor: 'black', borderWidth: 1 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={[styles.textStyle, {color: "black"}]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  dispatch(updateUser(firstName, lastName, email, user, selectedIndex))
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderScreenContainer: {
    flex: 1,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return {
    user: state.userReducer.data,
    isLoading: state.userReducer.isLoading,
    createIsLoading: state.userReducer.createIsLoading,
  }
}

export default connect(mapStateToProps, null)(DetailScreen)