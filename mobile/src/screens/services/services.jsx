import { useEffect, useState } from "react";

import { Alert, FlatList, Image, Text, View } from "react-native";
import icon from '../../constants/icon';

import { styles } from "./services.style";
import Service from "../../components/service/service";
import api from "../../constants/api";

function Services(props){
    const id_doctor = props.route.params.id_doctor;
    const name = props.route.params.icon;
    const specialty = props.route.params.specialty;
    const iconDoctor = props.route.params.name;

    const [doctorsServices, setDoctorsServices] = useState([]);

    function clickService(id_service){
        props.navigation.navigate("shedule", {
            id_doctor, id_service
        });
    }

    async function loadServices(){
        try{
            const response = await api.get("/doctors/" + id_doctor + "/services");

            if(response.data)
                setDoctorsServices(response.data);
        } catch (error) {
            if(error.response?.data.error)
                Alert.alert(error.response.data.error)
            else
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde!")
        }
    }

    useEffect(() => {
        loadServices();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image source={iconDoctor == "M" ? icon.male : icon.female} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.specialty}>{specialty}</Text>
            </View>

            <FlatList data={doctorsServices} keyExtractor={(serv) => serv.id_doctor} showsVerticalScrollIndicator={false} renderItem={({item}) => {
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