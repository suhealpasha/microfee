import React, {Component} from 'react';

import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  }

  render() {
    const items = [
      {
        name: require('../../assets/Images/coffeeFarms/img1.png'),
        key: '1',
        origin: 'EL SALVADOR',
        variety: 'Pacamara',
        farm: 'Las Delicias',
        altitude: '1500 Ft',
        notes: 'Peach,Chocolate,Honey',
        ratings: 5,
        process:'Natural'
      },
    ];

    const styles = StyleSheet.create({     
      productDescriptionContainer: {
        width: this.state.width,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 10,
        height: 200,
        backgroundColor: 'white',
      },
      productDetailsContainer: {
        backgroundColor: 'rgb(0,70,99)',
        flexDirection: 'row',
        width: '100%',
      },
      productDetailHeader: {
        flexDirection: 'column',
        padding: 5,
        width: 100,
      },
      productDetailHeaderText: {
        fontWeight: 'bold',
        color: 'white',
        padding: 2,
        fontSize: 15,
      },
      productDetail: {
        flexDirection: 'column',
        padding: 5,
      },
      productDetailText: {
        fontSize: 15,
        color: 'white',
        padding: 2,
      },
    });

    return (   
      
        <View style={styles.productDescriptionContainer}>
          <View style={{flex: 1.0}}>
            <FlatList
              data={items}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              numColumns={2}
              // keyExtractor = {(items)=>{items.key}}

              renderItem={({item}) => {
                return (
                  <View style={styles.productDetailsContainer}>
                    <View style={styles.productDetailHeader}>
                      <Text style={styles.productDetailHeaderText}>Origin</Text>
                      <Text style={styles.productDetailHeaderText}>
                        Variety
                      </Text>
                      <Text style={styles.productDetailHeaderText}>Farm</Text>
                      <Text style={styles.productDetailHeaderText}>
                        Altitude
                      </Text>
                      <Text style={styles.productDetailHeaderText}>Notes</Text>
                      <Text style={styles.productDetailHeaderText}>
                        Ratings
                      </Text>
                      <Text style={styles.productDetailHeaderText}>
                        Process
                      </Text>
                    </View>
                    <View style={styles.productDetail}>
                      <Text style={styles.productDetailText}>
                        {item.origin}
                      </Text>
                      <Text style={styles.productDetailText}>
                        {item.variety}
                      </Text>
                      <Text style={styles.productDetailText}>{item.farm}</Text>
                      <Text style={styles.productDetailText}>
                        {item.altitude}
                      </Text>
                      <Text style={styles.productDetailText}>{item.notes}</Text>
                      <View style={{flexDirection:'row'}}>
                      <Icon name='star' size={15} style={{color:'gold'}}/>
                      <Icon name='star' size={15} style={{color:'gold'}}/>
                      <Icon name='star' size={15} style={{color:'gold'}}/>
                      <Icon name='star' size={15} style={{color:'gold'}}/>
                      <Icon name='star' size={15} style={{color:'gold'}}/>
                      </View>
                      <Text style={styles.productDetailText}>
                        {item.process}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
     
    );
  }
}
export default ProductDescription;