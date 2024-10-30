import { FlatList, Text, View } from "react-native";

import Doctor from "../../components/doctor/doctor";
import { doctors } from "../../constants/data";

import { styles } from "./home_section.style";

function Home_Section(props){
    function clickDoctor(id_doctor, icon, name, specialty){
        props.navigation.navigate("services", {
            id_doctor,
            icon,
            name,
            specialty,
        });
    }

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