import React, {useContext, useState, useEffect} from 'react';
import {View, Text, Modal, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';
import {AuthContext} from '../../contexts/auth';
import Header from '../../components/Header';
import Cards from '../../components/Cards';
import CalendarModal from '../../components/CalendarModal';
import api from '../../services/api';
import {format} from 'date-fns';
import {useIsFocused} from '@react-navigation/native'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import HistoricoList from '../../components/HistoricoList';

export default function Home(){
  const isFocused = useIsFocused();

  const [listBalance, setListBalance] = useState([]);

  const [movements, setMovements] = useState([]);

  const [dateMovements, setDateMovements] = useState(new Date());

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    let isActive = true;

    async function getMovements() {
      //let dateFormated = format(dateMovements, 'dd/MM/yyyy');
      let date = new Date(dateMovements)
      let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
      let dateFormated = format(onlyDate, 'dd/MM/yyyy');

      const receives = await api.get('/receives',{
        params:{
          date: dateFormated
        }
      })

      const balance = await api.get('/balance',{
        params:{
          date: dateFormated
        }
      })

      if(isActive){
        setMovements(receives.data);
        setListBalance(balance.data);
      }
    }
    getMovements();
    return() => isActive=false;
  },[isFocused, dateMovements])


  async function handleDelete(id) {
    try{
      await api.delete('/receives/delete',{
        params:{
          item_id: id
        }
      })

      setDateMovements(new Date())

    } catch(err){
      console.log(err);
    }  
  }

  function filterDateMovements(dateSelected){
    setDateMovements(dateSelected)
  }

  return(
   <SafeAreaView style={styles.container}>
      <Header title="Minhas movimentações"/>

      <FlatList style={styles.listBalance}
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.tag}
        renderItem={ ({item})=> (<Cards data={item}/> )}
      />

      <View style={styles.area}>
        <TouchableOpacity onPress={ () => setModalVisible(true) } >
          <Icon name='event' color="#121212" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Movimentações de {format(dateMovements, 'dd/MM/yyyy')}  </Text>
      </View>

      <FlatList style={styles.list}
        data={movements}
        keyExtractor={item => item.id}
        renderItem={ ({item}) => <HistoricoList data={item} deleteItem={handleDelete}/> }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:20}}
      />

      <Modal visible={modalVisible} animationType="fade" transparent={true} >
        <CalendarModal
          setVisible={ ()=> setModalVisible(false) }
          handleFilter = {filterDateMovements}
        />
      </Modal>

   </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#f0f4ff'
  },
  listBalance:{
    maxHeight: 190
  },
  area:{
    marginTop:24,
    paddingTop:14,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    paddingLeft:14,
    paddingRight:14,
    alignItems: 'baseline'
  },
  title:{
    marginLeft: 4,
    color: '#121212',
    marginBottom: 14,
    fontWeight: 'bold',
    fontSize:18
  },
  list:{
    flex:1,
    backgroundColor: '#fff'
  }
})