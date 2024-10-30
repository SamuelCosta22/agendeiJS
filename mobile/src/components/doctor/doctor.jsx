import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./doctor.style";
import iconImg from "../../constants/icon.js";

function Doctor({id_doctor, icon, name, specialty, onPress}){
    return(
        <TouchableOpacity style={styles.doctor} onPress={() => onPress(id_doctor, name, icon, specialty)}>
            <Image source={icon == "M" ? iconImg.male : iconImg.female} style={styles.icon} />
            <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.specialty}>{specialty}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Doctor;