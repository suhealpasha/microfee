import React, {Component} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  TochableOpacity,
  Alert,
  Dimensions,
  AsyncStorage
} from 'react-native';
import {Input} from 'react-native-elements';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NextButton from '../Components/utils/nextButton';
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import * as api from '../assets/api/api';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalDropdown from 'react-native-modal-dropdown';

class SellerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width:Dimensions.get('window').height,
      spinner: false,
      company: null,
      ein: null,
      alternatePhone: null,      
      companyError: false,
      companyValidationError: false,
      einError: false,
      einValidationError: false,
      alternatePhoneError: false,
      alternatePhoneValidationError: false,      
      defaultContryColor: '#969291',
      defaultStateColor: '#969291',
      countriesData: [],
      statesData:[],   
      countryId:null,
      countryError:false,        
      street: null,
      streeError: false,  
      city: null,
      cityError: false, 
      stateId:null,
      stateError: false,
      zipCode: null,
      zipCodeError: false,
      zipCodeValidationError: false, 
    };
  }

  componentDidMount(){
    this.setState({ countriesData: this.props.countriesData })
  }

  einValidate = () => {
    if (this.state.ein === '') {
      this.setState({ein: null});
      return;
    } else {
      if (String(this.state.ein).length !== 10) {
        this.setState({einValidationError: true});
        return;
      }
    }
  };

  alternatePhoneValidate = () => {
    if (this.state.alternatePhone === '') {
      this.setState({alternatePhone: null});
      return;
    } else {
      if (String(this.state.alternatePhone).length !== 12) {
        this.setState({alternatePhoneValidationError: true});
        return;
      }
    }
  };

  zipCodeValidate = () => {
    if (this.state.zipCode === '') {
      this.setState({ zipCode: null });
      return;
    } else {
      if (String(this.state.zipCode).length !== 5) {
        this.setState({ zipCodeValidationError: true });
        return;
      }
    }
  }

  onContrySelect = async (args, args1) => {
    let country;
    this.state.countriesData.filter(i => {
      if (i.country_name === args1) {
        country = i.country_Id;
      }
    });
    this.setState({
      defaultContryColor: 'black',
      countryId: country,
      countryError: false,
      statesData: [],
    });
    const data = JSON.stringify({
      country_Id: country,
    });
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
      .post(api.statesAPI, data, {
        headers: {
          access_token: access_token,
          accept: 'application/json',
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        console.log(res.data.data);
        if (res.status) {
          this.setState({statesData: res.data.data});
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onStateSelect = async (args, args1) => {
    let state;
    this.state.statesData.filter(i => {
      if (i.state_name === args1) {
        state = i.state_Id;
      }
    });
    this.setState({
      defaultStateColor: 'black',
      stateError: false,
      stateId: state,
    });
  };

  handleRegister = async () => {
    if (
      this.state.company !== null &&
      this.state.ein !== null &&
      this.state.alternatePhone !== null &&
      this.state.street !== null &&
      this.state.countryId !== null &&
      this.state.stateId !== null &&
      this.state.city !== null &&
      this.state.zipCode !== null &&
      this.state.companyValidationError === false &&
      this.state.einValidationError === false &&
      this.state.alternatePhoneValidationError === false &&
      this.state.zipCodeValidationError === false
      
    ) {
      this.setState({spinner: true});
      let data = JSON.stringify({
        email_id: this.props.email,
      });

      await axios
        .post(api.otpAPI, data, {
          headers: {
            accept: 'application/json',
            'accept-language': 'en_US',
            'content-type': 'application/x-www-form-urlencoded',
          },
        })
        .then(res => {
          if (res.status) {
            this.setState({spinner: false});
            this.props.onRegisterSellerAdditionalDetails(
              this.state.company,
              this.state.ein,
              this.state.alternatePhone,
              this.state.street,
              this.state.city,
              this.state.stateId,
              this.state.zipCode,
              String(res.data.data.otp),
            );
            this.props.navigation.navigate('Set Password');
          }
        })
        .catch(err => {
          this.setState({spinner: false});
          console.log(err);
        });
    } else {
      if (this.state.company === null) {
        this.setState({companyError: true});
      } else {
        this.setState({companyError: false});
      }
      if (this.state.ein === null) {
        this.setState({einError: true});
      } else {
        this.setState({einError: false});
      }
      if (this.state.alternatePhone === null) {
        this.setState({alternatePhoneError: true});
      } else {
        this.setState({alternatePhoneError: false});
      }
      if (this.state.street === null) {
        this.setState({ streetError: true });
      } else {
        this.setState({ streetError: false });
      }
      if (this.state.countryId === null) {
        this.setState({ countryError: true });
      } else {
        this.setState({ countryError: false });
      }
      if (this.state.stateId === null) {
        this.setState({ stateError: true });
      } else {
        this.setState({ stateError: false });
      }
      if (this.state.city === null) {
        this.setState({ cityError: true });
      } else {
        this.setState({ cityError: false });
      }
      if (this.state.zipCode === null) {
        this.setState({ zipCodeError: true });
      } else {
        this.setState({ zipCodeError: false });
      }
    }
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
      },
      registerFormContainer: {
        width: '100%',
      },
      spinnerTextStyle: {
        color: '#00aa00',
      },
    });

    let countriesList = [],stateList=[];    
    countriesList = this.state.countriesData.map(i => { return (i.country_name) })
    stateList = this.state.statesData.map(i => { return (i.state_name) })
 

    return (
     
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      style={{ backgroundColor: '#efebea' }}
      scrollEnabled={true}>
           <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        <BackButton {...this.props} />
        <View style={styles.container}>
          <Logo />
          <View style={styles.registerFormContainer}>
            <Text
              style={{
                fontFamily: 'Gotham Black Regular',
                color: '#004561',
                fontSize: 24,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              Contact Details
            </Text>
            <Input
              placeholder="Company"
              spellCheck={false}
              autoCorrect={false}
              style={styles.inputStyle}
              onChangeText={company => {
                if (/[^0-9a-zA-Z\s]/.test(company)) {
                  this.setState({companyValidationError: true});
                } else {
                  this.setState({
                    company,
                    companyError: false,
                    companyValidationError: false,
                  });
                }
              }}
              onBlur={
                this.state.company === ''
                  ? this.setState({company: null})
                  : null
              }
              errorMessage={
                this.state.companyError === true
                  ? 'Enter the Company'
                  : this.state.companyValidationError
                  ? 'Invalid Company name'
                  : null
              }
            />
            <Input
              placeholder="EIN"
              style={styles.inputStyle}
              keyboardType="numeric"
              value={this.state.ein}
              maxLength={11}
              onChangeText={ein => {
                const input = ein.replace(/\D/g, '').substring(0, 9);
                const first = input.substring(0, 2);
                const last = input.substring(2, 9);

                if (input.length > 3) {
                  this.setState({
                    ein: `${first}-${last}`,
                    einError: false,
                    einValidationError: false,
                  });
                } else if (input.length >= 0) {
                  this.setState({
                    ein: input,
                    einError: false,
                    einValidationError: false,
                  });
                }
              }}
              onBlur={this.einValidate}
              errorMessage={
                this.state.einError === true
                  ? 'Enter the EIN'
                  : this.state.einValidationError
                  ? 'Invalid Ein'
                  : null
              }
            />
            <Input
              placeholder="Alternate Phone"
              keyboardType="numeric"
              value={this.state.alternatePhone}
              maxLength={12}
              style={styles.inputStyle}
              onChangeText={alternatePhone => {
                const input = alternatePhone
                  .replace(/\D/g, '')
                  .substring(0, 10);
                const first = input.substring(0, 3);
                const middle = input.substring(3, 6);
                const last = input.substring(6, 10);

                if (input.length > 6) {
                  this.setState({
                    alternatePhone: `${first}-${middle}-${last}`,
                    alternatePhoneError: false,
                    alternatePhoneValidationError: false,
                  });
                } else if (input.length > 3) {
                  this.setState({
                    alternatePhone: `${first}-${middle}`,
                    alternatePhoneError: false,
                    alternatePhoneValidationError: false,
                  });
                } else if (input.length >= 0) {
                  this.setState({
                    alternatePhone: input,
                    alternatePhoneError: false,
                    alternatePhoneValidationError: false,
                  });
                }
              }}
              onBlur={this.alternatePhoneValidate}
              errorMessage={
                this.state.alternatePhoneError === true
                  ? 'Enter the Alternate Phone number'
                  : this.state.alternatePhoneValidationError
                  ? 'Invalid Phone number'
                  : null
              }
            />
            <Input
              placeholder="Street"
              spellCheck={false}
              autoCorrect={false}
              style={styles.inputStyle}
              onChangeText={street =>
                this.setState({ street, streetError: false })
              }
              onBlur={
                this.state.street === '' ? this.setState({ street: null }) : null
              }
              errorMessage={
                this.state.streetError === true ? 'Enter the Street' : false
              }
            />
            <Input
              placeholder="City"
              spellCheck={false}
              autoCorrect={false}
              style={styles.inputStyle}
              onChangeText={city => this.setState({ city, cityError: false })}
              onBlur={
                this.state.city === '' ? this.setState({ city: null }) : null
              }
              errorMessage={
                this.state.cityError === true ? 'Enter the City' : false
              }
            />

            <ModalDropdown
              options={countriesList}
              defaultValue="Country"
              textStyle={{ color: this.state.defaultContryColor, fontSize: 18, fontWeight: '100', paddingLeft: 5, }}
              style={{ borderBottomColor: '#8c939a', borderBottomWidth: 1, marginLeft: 10, marginRight: 10, paddingBottom: 10, paddingTop: 10 }}
              dropdownStyle={{ width: this.state.width - 40}}
              dropdownTextStyle={{fontSize:18}}
              onSelect={(i, j) => {
                this.onContrySelect(i, j);
              }}         
            />
            {this.state.countryError ?<Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}>
                Please Select the Country!
              </Text> :null}

            <ModalDropdown
              options={stateList}
              defaultValue="State"
              disabled={stateList.length >=1 ? false:true}
              textStyle={{ color: this.state.defaultStateColor, fontSize: 18, fontWeight: '100', paddingLeft: 5, }}
              style={{ borderBottomColor: '#8c939a', borderBottomWidth: 1, marginLeft: 10, marginRight: 10, paddingBottom: 10, paddingTop: 10 }}
              dropdownStyle={{ width: this.state.width - 40 }}
              dropdownTextStyle={{fontSize:18}}
              onSelect={(i, j) => {
                this.onStateSelect(i, j);
              }}
            />
             {this.state.stateError ?<Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}>
                Please Select the State!
              </Text> :null}
           
            <Input
              placeholder="Zip Code"
              maxLength={5}
              style={styles.inputStyle}
              keyboardType="numeric"
              onChangeText={zipCode =>
                this.setState({ zipCode, zipCodeError: false,zipCodeValidationError:false })
              }
              onBlur={
                this.zipCodeValidate
              }
              errorMessage={
                this.state.zipCodeError === true
                ? 'Enter the Zip code'
                : this.state.zipCodeValidationError
                  ? 'Invalid Zip Code'
                  : null
              }
            />
          </View>
          <NextButton click={() => this.handleRegister()} />
        </View>
        </KeyboardAwareScrollView>
        
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.reducer.email,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegisterSellerAdditionalDetails: (
      value,
      value2,
      value3,
      value4,
      value5,
      value6,
      value7,
      value8
    ) =>
      dispatch({
        type: actionTypes.REGISTER_SELLER_ADDITIONAL_DETAILS,
        payload: value,
        payload2: value2,
        payload3: value3,
        payload4: value4,
        payload5: value5,
        payload6: value6,
        payload7: value7,
        payload8: value8,
        
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SellerDetails);
