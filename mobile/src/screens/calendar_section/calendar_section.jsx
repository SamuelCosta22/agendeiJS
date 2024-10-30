import { Alert, FlatList, Text, View } from "react-native";

import Appointment from "../../components/appointment/appointment";

import { styles } from "./calendar_section.style";
import api from "../../constants/api";
import { useEffect, useState } from "react";

function Calendar_Section(){
    const [appointments, setAppointments] = useState([]);

    async function loadAppointments(){
        try{
            const response = await api.get("/appointments");

            if(response.data){
                setAppointments(response.data);
            }
        } catch (error) {
            if(error.response?.data.error)
                Alert.alert(error.response.data.error)
            else
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde!")
        }
    }

    async function deleteAppointments(id_appointment){
        try{
            const response = await api.delete("/appointments/" + id_appointment);

            if(response.data?.id_appointment)
                loadAppointments();
        } catch (error) {
            if(error.response?.data.error)
                Alert.alert(error.response.data.error)
            else
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde!")
        }
    }

    useEffect(() => {
        loadAppointments();
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Agende os seus serviços médicos</Text>
            <FlatList data={appointments} keyExtractor={(appoint) => appoint.id_appointment} showsVerticalScrollIndicator={false} renderItem={({item}) => {
                return(
                    <Appointment
                        key={item.id_appointment}
                        id_appointment={item.id_appointment}
                        service={item.service}
                        doctor={item.doctor}
                        specialty={item.specialty}
                        bookingDate={item.booking_date}
                        bookingHour={item.booking_hour}
                        onPress={deleteAppointments}
                    />
                )
            }} />
        </View>
    )
}

export default Calendar_Section;