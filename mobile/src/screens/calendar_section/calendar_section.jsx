import { FlatList, Text, View } from "react-native";

import Appointment from "../../components/appointment/appointment";

import { appointments } from '../../constants/data'

import { styles } from "./calendar_section.style";

function Calendar_Section(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Agende os seus serviços médicos</Text>
            <FlatList data={appointments} keyExtractor={(appoint) => appoint.id_appointment} showsVerticalScrollIndicator={false} renderItem={({item}) => {
                return(
                    <Appointment key={item.id_appointment} service={item.service} doctor={item.doctor} specialty={item.specialty} />
                )
            }} />
        </View>
    )
}

export default Calendar_Section;