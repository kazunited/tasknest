import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { useContext } from "react"

import { AuthenticationForm } from "../components/AuthenticationForm"
import { AlternateAuth } from "../components/AlternateAuth"
import { Theme } from "../theme/Theme"
import { AuthContext } from "../contexts/AuthContext"
import { createUserWithEmailAndPassword } from "@firebase/auth"
import { router } from "expo-router"

export default function Register(props) {
    const auth = useContext(AuthContext)

    const createAccount = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user)
                router.push('/home')
            })
            .catch((error) => {
                console.log(error.code, error.message)
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
            <AuthenticationForm title="Register for an account" action="Sign up" handler={createAccount} />
            <AlternateAuth
                text="Already have an account?"
                route="/login"
                linkText="Login"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
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