import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Modal, SectionList, StyleSheet, Image } from 'react-native';

import { Avatar, Button, Card, Title, Paragraph, Searchbar, } from 'react-native-paper';
import HTML from 'react-native-render-html';

// import styles from '../Styles/style';

class Dashboard extends Component {

    constructor(props) {

        super(props)

        this.state = {
            filterArray: [],
            MoviesList: [],

            referanceArray: [],


            ImageURl: "",
            isModalVisible: false,
            seacrchingArray: [],
            searchingValue: "",

            movieDetails: [],



        };
    };

    componentDidMount() {
        this.getMoviesList();

    }

    async getMoviesList() {
        await fetch('http://api.tvmaze.com/shows')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    MoviesList: responseJson,
                    referanceArray: responseJson
                });

                console.log(this.state.MoviesList);

            })
            .catch((error) => {

                console.error(error);

            });


    }

    async getMovieDetails(id) {
        await fetch(`http://api.tvmaze.com/shows/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    movieDetails: responseJson
                });
                // this.state.movieDetails.push(responseJson);
                console.log(this.state.movieDetails);
                this.setState({ isModalVisible: true });
            })
            .catch((error) => {

                console.error(error);

            });

    }
    render() {

        return (
            <>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8', }}>

                    <View style={{ flexDirection: 'row' }}>

                        <Text style={{ marginLeft: 10, fontWeight: '500', color: 'red', fontSize: 24, marginRight: 5 }}>Movies</Text>


                        <Searchbar
                            style={{
                                width: '70%',
                                height: 40,
                                alignSelf: 'center',
                                marginRight: 1,
                                marginTop: 5,
                                marginLeft: 1,
                                marginBottom: 10
                            }}

                            placeholder="Search"

                            onChangeText={(text) => {

                                console.log(text);

                                this.setState({ searchingValue: text });


                                var isSerached = false;

                                var value = this.state.MoviesList.filter((it) => {

                                    let originalItem = it.name;

                                    let searchedItem = text;

                                    if (it.name.toUpperCase() == text.toUpperCase()) {


                                        console.log("item  MAtched", it.name, '==', text);

                                        isSerached = true;

                                        return it;


                                    }

                                })
                                if (this.state.searchingValue = !"" && isSerached == true) {

                                    let dataArray = [...value];

                                    console.log("Array trnsfer to movieliet", dataArray);

                                    this.setState({ MoviesList: [...value] });

                                    console.log(this.state.MoviesList.length, "length");


                                } else {
                                    this.setState({ MoviesList: this.state.referanceArray })
                                }


                            }}


                            value={this.state.searchingValue}

                        />
                    </View>



                    {this.state.MoviesList == "" ?

                        <View style={{ flex: 1, justifyContent: 'center', }}><Text style={{ alignSelf: 'center', fontSize: 24, fontWeight: '400' }}>Loading...</Text></View> :

                        <FlatList
                            data={this.state.MoviesList}

                            style={{ marginTop: 10, alignSelf: "center" }}

                            numColumns={2}

                            keyExtractor={(item) => item.id}

                            renderItem={(item, index) => {

                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                isModalVisible: true
                                            });
                                            this.getMovieDetails(item.item.id);
                                            console.log(item.item.id, "<<<<<<<<<=ID")
                                        }}
                                        style={{
                                            alignSelf: 'center',
                                            paddingHorizontal: 1, width: '48%',
                                            alignSelf: 'center', marginLeft: 3,
                                            marginBottom: 5, borderWidth: 0.1,
                                            shadowColor: "#000",
                                            shadowOpacity: 0.25,
                                            shadowRadius: 2.84,
                                            elevation: 0.5,
                                        }}
                                    >

                                        <Text style={{ marginLeft: 10, fontWeight: 'bold', }}>{item.item.name}</Text>


                                        <Text style={{ marginLeft: 10, fontWeight: '300', color: 'grey' }} >{item.item.language}</Text>


                                        <Image style={{ width: '98%', height: 200, alignSelf: 'center' }} source={{ uri: item.item.image.medium }} />


                                        <Text style={{ marginLeft: 10, fontWeight: '600', color: 'grey' }}>Rating: {item.item.rating.average}</Text>


                                    </TouchableOpacity>
                                )
                            }}
                        />
                    }

                </SafeAreaView>


                <Modal
                    visible={this.state.isModalVisible}
                    // visible={true}

                    transparent={true}
                >
                    <>

                        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black', opacity: 0.95, }}>
                            <ScrollView>
                                <View style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10, width: '98%', alignSelf: 'center', borderRadius: 5 }}>

                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ flexDirection: 'column', width: '32%', }}>


                                            <Text style={styles.textLeft}>Name :</Text>

                                            <Text style={styles.textLeft}>Language :</Text>

                                            <Text style={styles.textLeft}>Rating :</Text>

                                            <Text style={styles.textLeft}>Premiered :</Text>

                                            <Text style={styles.textLeft}>Runtime :</Text>

                                            <Text style={styles.textLeft}>Genres :</Text>

                                            <Text style={styles.textLeft}>summary :</Text>


                                        </View>

                                        <View style={{ flexDirection: 'column', width: '68%', }}>


                                            <Text style={styles.textRight}>{this.state.movieDetails.name == undefined ? "" : this.state.movieDetails.name}</Text>

                                            <Text style={styles.textRight}>{this.state.movieDetails.language == undefined ? "" : this.state.movieDetails.language}</Text>

                                            {this.state.movieDetails.rating == undefined ? null :
                                                <Text style={styles.textRight}>{this.state.movieDetails.rating.average == undefined ? "" : this.state.movieDetails.rating.average}</Text>}

                                            <Text style={styles.textRight}>{this.state.movieDetails.premiered == undefined ? "" : this.state.movieDetails.premiered}</Text>

                                            <Text style={styles.textRight}>{this.state.movieDetails.runtime == undefined ? "" : this.state.movieDetails.runtime}</Text>

                                            {this.state.movieDetails.genres == undefined ? null :
                                                <Text style={styles.textRight}>{this.state.movieDetails.genres == undefined ? "" : this.state.movieDetails.genres[0], this.state.movieDetails.genres[1], this.state.movieDetails.genres[2]} </Text>
                                            }

                                            <Text style={styles.textRight}>{this.state.movieDetails.summary == undefined ? "" : this.state.movieDetails.summary.replace(/(<([^>]+)>)/ig, '')}</Text>
                                        </View>

                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ isModalVisible: false })

                                        }}
                                        style={{ backgroundColor: 'cyan', justifyContent: 'center', padding: 4, width: '50%', alignSelf: 'center' }}
                                    >
                                        <Text style={{ alignSelf: 'center' }}>OK</Text>
                                    </TouchableOpacity>

                                </View>

                            </ScrollView>

                        </SafeAreaView>

                    </>

                </Modal>


            </>


        );
    }

}


const styles = StyleSheet.create({

    textLeft: {
        marginLeft: 20,
        marginVertical: 10,
        alignSelf: 'flex-start',
        fontSize: 16,
    },

    textRight: {
        fontSize: 16,
        marginLeft: 20,
        marginVertical: 10,
    }

})


export default Dashboard;


