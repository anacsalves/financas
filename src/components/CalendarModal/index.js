import React, {useState} from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Container, ButtonFilter, ButtonFilterText, ModalContent } from './styles';
import {Calendar, LocaleConfig} from 'react-native-calendars'
import {ptBR} from './localeCalendar';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';


export default function CalendarModal({setVisible, handleFilter }){

    const [dateNow, setDateNow] = useState(new Date());
    const [markedDates, setMarkedDates] = useState({});

    function handleOnDayPress(date){
        setDateNow(new Date(date.dateString));

        let markedDate = {};

        markedDate[date.dateString] = {
            selected: true,
            selectedColor: '#3d3bdf',
            textColor: '#fff'
        }

        setMarkedDates(markedDate)
    }

    function handleFilterDate(){
        handleFilter(dateNow);
        setVisible();
    }

    return(
        <Container>
           <TouchableWithoutFeedback onPress={setVisible}>
            <View style={ {flex:1} } >  </View>
           </TouchableWithoutFeedback>

           <ModalContent>

            <Calendar
            onDayPress={handleOnDayPress}
            markedDates={markedDates}
            enableSwipeMonths={true}
            theme={{
                todayTextColor: '#ff0000',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#fff'
            }}
            />

            <ButtonFilter onPress={handleFilterDate} >
                 <ButtonFilterText>Filtrar</ButtonFilterText>
            </ButtonFilter>

           </ModalContent>
        </Container>
    )
}