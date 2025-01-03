import React, {useContext} from "react";
import {Container, Message, Nome , NewLink, NewText, LogOutButton, LogOutText} from'./styles';
import Header from '../../components/Header'
import {AuthContext} from '../../contexts/auth'
import { useNavigation } from "@react-navigation/native";

export default function Profile(){

    const{user, signOut} = useContext(AuthContext);
    const navigation = useNavigation();

    return(
        <Container>
            <Header title="Meu perfil" />

            <Message> Bem vindo de volta,</Message>
            <Nome numberOfLines={1} >
                {user && user.name}!
            </Nome>

            <NewLink onPress={()=>navigation.navigate('Registrar')} >
                <NewText>Fazer registro</NewText>
            </NewLink>

            <LogOutButton onPress={()=> signOut()} >
                <LogOutText>Sair</LogOutText>
            </LogOutButton>

        </Container>
    )
}