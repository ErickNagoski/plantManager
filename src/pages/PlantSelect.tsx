import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native";

import colors from "../styles/colors";
import { Header } from "../components/Header";
import fonts from "../styles/fonts";
import { EnviromentButton } from "../components/EnviromentButton";
import api from "../services/api";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import {Load} from "../components/Load";

interface EnviromentsProps {
    key: string;
    title: string;
}

interface PlantProps{
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
    times: number;
    repeat_every: string;
    }
};

export function PlantSelect() {
    const [enviroments, setEnviroments] = useState<EnviromentsProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilterdPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    function handleEnviromentSelected(environment: string){
       setEnviromentSelected(environment);

        if(environment === "all")
        return setFilterdPlants(plants);
    
        const filtered = plants.filter(plant=>
            plant.environments.includes(environment));

            setFilterdPlants(filtered);
    }




    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api.get("plants_environments?_sort=title&_order=asc");
            setEnviroments([
                {
                    key: "all",
                    title: "Todos",
                },
                ...data
            ]);
        }

        fetchEnviroment();
    }, [])

    useEffect(()=>{
        async function feachPlants(){
            const {data} = await api.get('plants?_sort=name&order=asc');
            setPlants(data);
            setFilterdPlants(data);
            setLoading(false);
        }
        feachPlants();
    },[])


    if(loading)
        return <Load/>
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>Em qual ambiente</Text>

                <Text style={styles.subTitle}>Você quer colocar sua planta?</Text>
            </View>

            <View>

                <FlatList
                    data={enviroments}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item.title}
                            active={item.key === enviromentSelected}
                           
                            onPress={() => handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    renderItem={({item})=>(
                        <PlantCardPrimary
                        data={item}
                        />
                
                        )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                />
            </View>




        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subTitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },

    enviromentList: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
    },

    plants: {
        flex: 1,
        paddingVertical: 32,
        justifyContent: "center",
    },

    contentContainerStyle:{
    
    }
})
