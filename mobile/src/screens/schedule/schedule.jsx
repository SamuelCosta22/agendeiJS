import { Text, View } from "react-native"
import { styles } from './schedule.style'
import { Calendar, LocaleConfig } from "react-native-calendars"
import { ptBR } from "../../constants/calendar"
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Button from '../../components/button/button'

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function Schedule(props){
    const id_doctor = props.route.params.id_doctor;
    const id_service = props.route.params.id_service;

    function clickBooking(){
        console.log(id_doctor, id_service, selectedDate, selectedHour)
    }

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0,10));
    const [selectedHour, setSelectedHour] = useState("");

    return(
        <View style={styles.container}>
            <View>
                <Calendar
                    theme={styles.theme} onDayPress={(day) => {
                        setSelectedDate(day.dateString)
                    }}
                    markedDates={{
                        [selectedDate]: {selected: true}
                    }}
                    minDate={new Date().toDateString()}
                />

                <View>
                    <Text style={styles.hour}>Horário</Text>
                </View>
                <View>
                    <Picker selectedValue={selectedHour} onValueChange={(itemValue, itemIndex) => {
                        setSelectedHour(itemValue)
                    }}>
                        <Picker.Item label="09:00" value="09:00" />
                        <Picker.Item label="09:30" value="09:30" />
                        <Picker.Item label="10:00" value="10:00" />
                    </Picker>
                </View>
            </View>
            
            <View>
                <Button text="Confirmar Reserva" onPress={clickBooking} />
            </View>
        </View>
    )
}