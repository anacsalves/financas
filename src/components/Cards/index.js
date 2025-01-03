import React, {useMemo} from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./styles"

export default function Cards({data}){

    const labelName = useMemo(()=>{
        if (data.tag==='saldo'){
            return{
                label: 'Saldo atual:',
                color: '#3b3dbf'
            }               
        }else if (data.tag==='receita'){
            return{
                label: 'Entradas de hoje:',
                color: '#00b94a'
            }
        } else {
            return{
                label: 'Saídas de hoje',
                color: '#ef463a'
            }
        }    
    },[data])

    return(
        <View style={[styles.container, {backgroundColor: labelName.color}]}>
            <Text style={styles.label}>{labelName.label}</Text>
            <Text style={styles.valor}>R$ {data.saldo}</Text>
        </View>
    )
}

