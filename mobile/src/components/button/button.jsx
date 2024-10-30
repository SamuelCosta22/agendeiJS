import { Alert, Text, TouchableOpacity } from "react-native";
import { styles } from "./button.style.js";

function Button({text, theme}) {

    function TesteClick() {
        Alert.alert("Clicou no nosso botão");
    }

    return <TouchableOpacity onPress={TesteClick} style={[styles.btn, theme == "danger" ? styles.danger : styles.primary]}>
        <Text style={styles.text}>
            {text}
        </Text>
    </TouchableOpacity>

}

export default Button;