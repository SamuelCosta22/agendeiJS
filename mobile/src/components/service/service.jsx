import { Text, View } from "react-native"
import Button from "../button/button"
import { styles } from "../service/service.style"

export default function Service({id_service, description, price, onPress}){
    return(
        <View style={styles.service}>
            <View style={styles.containerText}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>
                    {
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency", currency: "BRL"
                        }).format(price)
                    }
                </Text>
            </View>

            <View style={styles.containerButton}>
                <Button text="Agendar" onPress={() => onPress(id_service)} /> 
            </View>
        </View>
    )
}