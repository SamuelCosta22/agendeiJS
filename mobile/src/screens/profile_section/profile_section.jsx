import { Text, View } from "react-native";

import { styles } from "./profile_section.style";

function Profile_Section(){
    return(
        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.title}>Nome</Text>
                <Text style={styles.text}>Heber Stein Mazutti</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.text}>heber@teste.com.br</Text>
            </View>
        </View>
    )
}

export default Profile_Section;