import { useContext, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import { styles } from "./profile_section.style";
import api from "../../constants/api";
import Button from "../../components/button/button";

import { AuthContext } from '../../contexts/auth'

function Profile_Section(){
    const {setUser} = useContext(AuthContext);
    const [name, setName] = useState("Samuel");
    const [email, setEmail] = useState("teste@gmail.com");

    async function loadProfile(){
        try{
            const response = await api.get("/users/profile");

            if(response.data[0]?.name){
                setName(response.data[0].name);
                setEmail(response.data[0].email);
            }
        } catch (error) {
            if(error.response?.data.error)
                Alert.alert(error.response.data.error)
            else
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde!")
        }
    }

    function Logout(){
        api.defaults.headers.common['Authorization'] = "";
        setUser({});
    }

    useEffect(() => {
        loadProfile();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.title}>Nome</Text>
                <Text style={styles.text}>{name}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.text}>{email}</Text>
            </View>
            <View style={styles.item}>
                <Button text="Desconectar" theme="danger" onPress={Logout} />
            </View>
        </View>
    )
}

export default Profile_Section;