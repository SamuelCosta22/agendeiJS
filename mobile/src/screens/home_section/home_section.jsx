import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

import Doctor from "../../components/doctor/doctor";

import { styles } from "./home_section.style";

import api from "../../constants/api";

function Home_Section(props){
    const [doctors, setDoctors] = useState([]);

    function clickDoctor(id_doctor, icon, name, specialty){
        props.navigation.navigate("services", {
            id_doctor,
            icon,
            name,
            specialty,
        });
    }

    async function loadDoctors(){
        try{
            const response = await api.get("/doctors");

            if(response.data)
                setDoctors(response.data);
        } catch (error) {
            if(error.response?.data.error)
                Alert.alert(error.response.data.error)
            else
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde!")
        }
    }

    useEffect(() => {
        loadDoctors();
    }, []);

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Agende os seus serviços médicos</Text>
            <FlatList data={doctors} keyExtractor={(doc) => doc.id_doctor} showsVerticalScrollIndicator={false} renderItem={({item}) => {
                return(
                    <Doctor
                        key={item.id_doctor}
                        id_doctor={item.id_doctor}
                        name={item.name}
                        specialty={item.specialty}
                        icon={item.icon} //item.icon == "M" ? icon.male : icon.female
                        onPress={clickDoctor}
                    />
                )
            }} />
        </View>
    )
}

export default Home_Section;