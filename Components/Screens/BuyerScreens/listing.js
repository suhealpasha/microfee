import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  BackHandler
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import ProductAction from '../../utils/productAction';
import RBSheet from 'react-native-raw-bottom-sheet';
import Filter from '../../utils/filter';
import Sort from '../../utils/sort';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import * as api from '../../../assets/api/api';
import Spinner from 'react-native-loading-spinner-overlay';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner:false,
      clickedIcon: null,      
     newItems:[],
     allProductsData:[],
     filtering:false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {   
    this.fetchProducts();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  fetchProducts = async () => {
    this.setState({spinner:true})
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
      .get(api.buyerAllProductAPI, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {     
        if (res.status) {
          this.setState({
            spinner:false,
            allProductsData: res.data.data,
          });
        }
      })
      .catch(err => {
        this.setState({spinner:false})
        console.log(err);
      });
  };

  componentWillUnmount() {    
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {    
     this.props.navigation.goBack(null);
    return true;
  }

  UNSAFE_componentWillReceiveProps() {   
    this.RBSheet.open();
  }

  sorting = args => {
    const newArray = this.state.allProductsData;
    switch (args) {
      case 'first':
        console.log('popular');
        return;
      case 'second':
        newArray.sort((a, b) => {          
          return  Date.parse(a.rating) <  Date.parse(b.rating);
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
      case 'third':
        newArray.sort((a, b) => {
          return  parseFloat(a.rating) <  parseFloat(b.rating);
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
      case 'forth':
        newArray.sort((a, b) => {
          return  parseFloat(a.rating) >  parseFloat(b.rating);
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
      case 'fifth':
        newArray.sort((a, b) => {
          return a.verityname > b.verityname;
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
    }
  };
  
  
  filtering =(args)=>{
    const newArray = [...this.state.items];
    this.setState({filtering:true})
    if(this.props.varitiesData !== null){

    }
   
    let filteredData = newArray.filter(item =>{
      if(args.featuredChecked || args.microLotsChecked || args.nanoLotsChecked){
        if( args.featuredChecked && item.featured === 'Yes' || args.microLotsChecked && item.lot === 'Micro' || args.nanoLotsChecked && item.lot === 'Nano'){
          return item
        }
      }
      
    }) 
    this.setState({newItems:filteredData})
    this.RBSheet.close();
  }

  fetchProductDetails = (args, args1) => {
    this.props.onDisplayVarietyName(args1);
    this.props.navigation.navigate('Product Description', {productId: args});
  };

  render() {    
    let optionsComponet;
    if (this.props.clickedIcon === 'Sort') {
      optionsComponet = (
        <Sort {...this.props} onSorting={args => this.sorting(args)} />
      );
    } else {
      optionsComponet = (
        <Filter
          {...this.props}
          resetClickedIcon={() => {
            this.RBSheet.close();
          }}
          onFiltering = {args => this.filtering(args)}
        />
      );
    }

    return (
      <View style={styles.container}>
         <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
        <FlatList
          style={{paddingLeft: 10, paddingRight: 10}}
          data={!this.state.filtering ? this.state.allProductsData : this.state.newItems}          
          numColumns={1}
          keyExtractor = {(items)=>{items.product_Id}}

          renderItem={({item}) => {
            let ratingIcon = (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.ratingStyle}>
                  {'  '}
                  {item.avg_rating}{' '}
                  <Icon
                    name="star"
                    size={12}
                    style={{
                      justifyContent: 'center',
                      textAlignVertical: 'center',
                    }}
                  />
                  {'  '}
                </Text>
                <Text
                  style={{
                    fontFamily: 'GothamLight',
                    fontSize: 10,
                    textAlignVertical: 'center',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}>
                  {item.rating}: ratings
                </Text>
              </View>
            );
            return (
              <TouchableNativeFeedback
              onPress={() => this.fetchProductDetails(item.product_Id, item.verityname)}>
                <View style={styles.itemContainer}>
                  <View style={styles.thumbnailImageContainer}>
                    <Image
                      source={{
                        uri: item.thumbnail_image,
                      }}
                      style={{
                        width: 130,
                        height: 100,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      }}
                    />
                  </View>
                  <View style={styles.itemDetailContainer}>
                    <Text style={styles.itemTextVariety}>{item.verityname}</Text>
                    <Text style={styles.itemTextOrigin}>{item.originsname}</Text>
                    <Text style={styles.itemTextFarm}>{item.farm}</Text>
                    {ratingIcon}
                  </View>
                </View>
              </TouchableNativeFeedback>
            );
          }}
        />

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={280}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          {optionsComponet}
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    paddingBottom: 10,
    paddingTop: 10,
  },
  itemContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
   
  },
  itemDetailContainer: {
    paddingBottom:10,
    paddingTop:10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemTextVariety:{
    fontFamily: 'Gotham Black Regular',
    fontSize: 14,
    paddingTop: 5,
  },
  itemTextOrigin: {
    fontSize: 12,
    justifyContent: 'space-around',
    fontFamily: 'GothamMedium',
    color: '#95A5A6',
  
  },
  itemTextFarm: {
    fontSize: 12,
    justifyContent: 'space-around',
    fontFamily: 'GothamMedium',
    color: '#95A5A6',
    paddingBottom: 10,
  },
  ratingStyle: {
    backgroundColor: '#00ac00',
    color: 'white',
    lineHeight: 20,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    width: 45,
  },
  spinnerTextStyle: {
    color: '#00aa00',
  },
});


const mapStateToProps = state => {
  return {
    varitiesData: state.reducer.varitiesData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDisplayVarietyName: value =>
      dispatch({type: actionTypes.DISPLAY_VARIETY_NAME, payload: value}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listing)