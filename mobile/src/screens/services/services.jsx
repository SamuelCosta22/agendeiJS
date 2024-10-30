import { FlatList, Image, Text, View } from "react-native";

import Doctor from "../../components/doctor/doctor";
import { doctors } from "../../constants/data";
import { doctors_services } from "../../constants/data";
import icon from '../../constants/icon';

import { styles } from "./services.style";
import Service from "../../components/service/service";

function Services(){
    return(
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image source={icon.female} />
                <Text style={styles.name}>Hebera</Text>
                <Text style={styles.specialty}>Cardiologista</Text>
            </View>

            <FlatList data={doctors_services} keyExtractor={(serv) => serv.id_doctor} showsVerticalScrollIndicator={false} renderItem={({item}) => {
                return(
                    <Service description={item.description} price={item.price} />
                )
            }} />
        </View>
    )
}

export default Services;