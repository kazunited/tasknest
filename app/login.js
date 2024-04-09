import { SafeAreaView, StyleSheet, View, Text} from "react-native"
import { useContext } from "react"
import { AuthenticationForm } from "../components/AuthenticationForm"
import { AlternateAuth } from "../components/AlternateAuth"
import { Theme } from "../theme/Theme"
import { AuthContext } from "../contexts/AuthContext"
import { signInWithEmailAndPassword } from "@firebase/auth"
import { router } from "expo-router"

export default function Login () {
    const auth = useContext( AuthContext )
    const SignIn = ( email, password ) => {
       signInWithEmailAndPassword(auth,email,password)
            .then( (userCredential) => {
                console.log( userCredential.user )
                router.replace('/home')
            })
            .catch( (error) => {
                console.log( error.code, error.message )
            })
    }

    return (
        <View style={styles.container}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.divider} />
                <Text style={styles.title}>
                    Task<Text style={{ fontWeight: "300", color: Theme.blue }}>Nest</Text>

                </Text>
                <View style={styles.divider} />
            </View>
            <AuthenticationForm title="Sign in to your account" action="Sign in" handler={SignIn}/>
            <AlternateAuth 
            text="Don't have an account?" 
            route="/"
            linkText="Sign up here"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.white,
        justifyContent: "center",
    },
    divider: {
        backgroundColor: Theme.lightBlue,
        height: 1,
        flex: 1,
        alignSelf: "center"
      },
    title: {
        fontSize: 38,
        paddingHorizontal: 64,
        fontWeight: "600"
    },

})