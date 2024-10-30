import { FlatList, Image, Text, View } from "react-native";

import { doctors_services } from "../../constants/data";
import icon from '../../constants/icon';

import { styles } from "./services.style";
import Service from "../../components/service/service";

function Services(props){
    const id_doctor = props.route.params.id_doctor;
    const name = props.route.params.icon;
    const specialty = props.route.params.specialty;
    const iconDoctor = props.route.params.name;

    function clickService(id_service){
        props.navigation.navigate("shedule", {
            id_doctor, id_service
        });
    } 

    return(
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image source={iconDoctor == "M" ? icon.male : icon.female} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.specialty}>{specialty}</Text>
            </View>

            <FlatList data={doctors_services} keyExtractor={(serv) => serv.id_doctor} showsVerticalScrollIndicator={false} renderItem={({item}) => {
                return(
                    <Service
                        key={item.id_service}
                        id_service={item.id_service}
                        description={item.description}
                        price={item.price}
                        onPress={clickService}
                    />
                )
            }} />
        </View>
    )
}

export default Services;