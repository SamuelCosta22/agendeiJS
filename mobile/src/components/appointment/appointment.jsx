import { Image, Text, View } from "react-native";
import { styles } from './appointment.style'

import Button from '../../components/button/button'

import icon from '../../constants/icon'

function Appointment({service, doctor, specialty, id_appointment, onPress, bookingDate, bookingHour}){
    const dt = new Date(bookingDate + "T" + bookingHour);

    return(
        <View style={styles.appointment}>
            <Text style={styles.name}>{service} - {doctor}</Text>
            <Text style={styles.specialty}>{specialty}</Text>

            <View style={styles.container}>
                <View style={styles.containerBooking}>
                    <View style={styles.booking}>
                        <Image source={icon.calendar} style={styles.icon} />
                        <Text style={styles.bookingDate}>{dt.toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.booking}>
                        <Image source={icon.clock} style={styles.icon} />
                        <Text style={styles.bookingHour}>{bookingHour}h</Text>
                    </View>
                </View>

                <View style={styles.containerButton}>
                    <Button text="Cancelar Reserva" theme="danger" onPress={() => onPress(id_appointment)} />
                </View>
            </View>
        </View>
    )
}

export default Appointment;