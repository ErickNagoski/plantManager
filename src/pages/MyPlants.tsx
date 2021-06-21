import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image
} from "react-native";

import { Header } from "../components/Header";
import waterdrop from "../assets/waterdrop.png";
import colors from "../styles/colors";
import { FlatList } from "react-native-gesture-handler";
import { PlantProps, loadPlant } from "../libs/storage";

export function MyPlants() {
    const [] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>(); 

     useEffect(()=>{
        async function loadStorageData(){
            const plantStoraged = await loadPlant();

            const nextTime = formatDistance //minuto 1:34
        }
    })
    
    
    
    return (
        
        <View style={styles.container}>
            <Header />
        
            <View style={StyleSheet.spotlight}>
                <Image 
                source={waterdrop}
                style={styles.spotlightImage}
            />
            <Text style={styles.spotlightText}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quam itaque cum laboriosam corrupti numquam assumenda voluptas reprehenderit ut ipsam maxime, similique pariatur excepturi tenetur ad impedit incidunt facere consequuntur!
            </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantTitle}>
                    Próximas regadas
                </Text>

                <FlatList
                    data
                
                />
            </View>

    </View>
)}



const styles = StyleSheet.create({
        container : {
        flex:1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    }
})