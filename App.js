import React,{useEffect, useState}from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default function App() {

  const[Data, setData] = useState([]);
  const[Isloading, setLoading] = useState(true);

  const getPosts = async() =>{
   
  try{
    const url ="https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(url);     //consumir los datos
    const json = await response.json(); //convertir a json
    setData(json);
    } catch(error){
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    getPosts();
  });

  return (
    <View style={styles.container}>
    {Isloading ? <ActivityIndicator/> : ( 
      
      <FlatList 
        data={Data}
        keyExtractor = { ({ id }, index) => id }
        renderItem = { 
          ({item}) => ( 
            <Text>{item.title}</Text>
          )
        }
      />
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
