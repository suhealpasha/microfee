import React, {Component} from 'react';
import axios from 'axios';
import {
  AsyncStorage,
  BackHandler,
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
} from 'react-native';
import {Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NextButton from '../../utils/nextButton';
import BackButton from '../../utils/backButton';
import Logo from '../../utils/logo';
import * as actionTypes from '../../../Store/action';
import PhotoUpload from 'react-native-photo-upload';
import {RadioButton} from 'react-native-paper';
import * as api from '../../../assets/api/api';
import {connect} from 'react-redux';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';

class EditSellerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      name: '',
      email: '',
      mobile: '',
      profilePic:'',
      company: '',
      nameError: false,
      nameValidationError: false,
      emailError: false,
      emailValidationError: false,
      companyError: false,
      companyValidationError:false,
      mobileError:false,
      mobileExist:false,
      mobileValidationError:false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  async componentWillMount() {
     const name = this.props.userData.first_name;
    const mobile = this.props.userData.mobile;
    const email = this.props.userData.email;
    const profilePic = this.props.userData.profilepic;
    const company = this.props.userData.company;
    this.setState({
      name: name,
      mobile: mobile,
      email: email,
      profilePic: profilePic,
      company: company,
    });

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.userData.profilepic !== this.props.userData.profilepic) {
      this.setState({profilePic: this.props.userData.profilepic});
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    this.props.onBottomTabClicked('profile');
    this.props.navigation.goBack();
    return true;
  }

  checkMobileExist = async () => {
    if (this.state.mobile === '') {
      this.setState({mobile: null});
      return;
    } else {
      if (String(this.state.mobile).length !== 12) {
        this.setState({mobileValidationError: true});
        return;
      } 
      // else {
      //   if (this.state.mobileNumber !== null) {
      //     let data = JSON.stringify({
      //       mobile_no: this.state.mobileNumber,
      //     });
      //     await axios
      //       .post(api.mobileCheckAPI, data, {
      //         headers: {
      //           accept: 'application/json',
      //           'content-type': 'application/x-www-form-urlencoded',
      //         },
      //       })
      //       .then(res => {
      //         if (res.data.message === 'Mobile exist') {
      //           this.setState({
      //             mobileExist: true,
      //           });
      //         } else {
      //           this.setState({
      //             mobileExist: false,
      //           });
      //         }
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       });
      //   }
      // }
    }
  };

  emailValidate = () => {
    if (this.state.email === '') {
      this.setState({email: null});
    } else {
      const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailReg.test(this.state.email) === false) {
        this.setState({emailValidationError: true});
      } else {
        this.setState({emailError: false, emailValidationError: false});
      }
    }
  };

  async UNSAFE_componentWillReceiveProps() {
    if (
    this.state.name !== null &&
    this.state.mobile !== null &&
    this.state.company !== null &&
    this.state.nameValidationError === false &&
    this.state.mobileValidationError === false &&
    this.state.companyValidationError === false
  ) {
    let data = JSON.stringify({
      name: this.state.name,
      mobile_no: this.state.mobile,
      company: this.state.company,
    });  
    this.setState({spinner: true});
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
      .post(api.sellerUpdateProfileAPI, data, {
        headers: {
          access_token: access_token,
          accept: 'application/json',
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        if (res.status) {
          this.setState({
            spinner: false,
            name: this.state.name,
            mobile: this.state.mobile,
            company: this.state.company,
          });
          Toast.show('Profile updated Sucessfully.');
          this.props.onFetchDetails();
          this.props.navigation.navigate('Seller Profile');
        }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  } else {
    if (this.state.name === null) {
      this.setState({nameError: true});
    } else {
      this.setState({nameError: false});
    }
    if (this.state.mobile === null) {
      this.setState({mobileError: true});
    } else {
      this.setState({mobileError: false});
    }
  }
}


  render() {
    const {checked} = this.state;
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
      },
      photoUploadContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 10,
        paddingTop: 10,
      },
      EditProfileFormContainer: {
        width: '100%',
      },
      users: {},
      spinnerTextStyle: {
        color: '#7ea100',
      },
      suggestionContainer: {
        paddingTop: 10,
        width: '100%',
      },
      checkBoxText: {
        fontFamily: 'GothamLight',
        fontWeight: 'normal',
        textAlignVertical: 'center',
        fontSize: 16,
      },
    });

    return (
      <KeyboardAwareScrollView resetScrollToCoords={{x: 10, y: 0}}
      scrollEnabled={false}
      style={{backgroundColor: '#efebea'}}> 
        <View style={styles.container}>
        <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={{borderBottomWidth: 1, borderBottomColor: '#95A5A6'}}>
            <View style={styles.photoUploadContainer}>
              <PhotoUpload
               onPhotoSelect={async avatar => {
                if (avatar) {
                  let data = JSON.stringify({profile_pic: avatar});
                  const access_token = await AsyncStorage.getItem(
                    'isLoggedIn',
                  );
                  axios
                    .post(api.sellerProfilePicUploadAPI, data, {
                      headers: {
                        access_token: access_token,
                        accept: 'application/json',
                        'accept-language': 'en_US',
                        'content-type': 'application/x-www-form-urlencoded',
                      },
                    })
                    .then(res => {
                      this.props.onFetchDetails();
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }
              }}
              >
               <Image
                  style={{
                    width: 120,
                    height: 120,
                    borderWidth: 0.25,
                    borderColor: '#95A5A6',
                    borderRadius: 100,
                  }}
                  resizeMode="cover"
                  source={
                    this.state.profilePic
                      ? {uri: this.state.profilePic}
                      : require('../../../assets/Images/users/userPhotoUpload.png')
                  }
                />
              </PhotoUpload>
            </View>
          </View>
          <View style={styles.EditProfileFormContainer}>
          <Input
              placeholder="Name"
              style={styles.inputStyle}
              value={this.state.name}
              inputStyle={{fontFamily: 'GothamMedium', fontSize: 16}}
              onChangeText={name => {
                if (/[^a-zA-Z\s]/.test(name)) {
                  this.setState({nameValidationError: true});
                } else {
                  this.setState({
                    name,
                    nameError: false,
                    nameValidationError: false,
                  });
                }
              }}
              onBlur={
                this.state.name === '' ? this.setState({name: null}) : null
              }
              errorMessage={
                this.state.nameError === true
                  ? 'Enter the User Name'
                  : this.state.nameValidationError
                  ? 'Invalid User Name'
                  : false
              }
            />         
             <Input
              placeholder="Email"
              style={styles.inputStyle}
              disabled
               readOnly
              autoCapitalize="none"
              value={this.state.email}
              inputStyle={{fontFamily: 'GothamMedium', fontSize: 16}}             
            />
            <Input              
              value={this.state.mobile}
              style={styles.inputStyle}
              inputStyle={{fontFamily: 'GothamMedium', fontSize: 16}}
              keyboardType="numeric"
              maxLength={12}
              onBlur={this.checkMobileExist}
              onChangeText={mobile => {
                const input = mobile.replace(/\D/g, '').substring(0, 10);
                const first = input.substring(0, 3);
                const middle = input.substring(3, 6);
                const last = input.substring(6, 10);

                if (input.length > 6) {
                  this.setState({
                    mobile: `${first}-${middle}-${last}`,
                    mobileError: false,
                    mobileValidationError: false,                    
                  });
                } else if (input.length > 3) {
                  this.setState({
                    mobile: `${first}-${middle}`,
                    mobileError: false,
                    mobileValidationError: false,
                  });
                } else if (input.length >= 0) {
                  this.setState({
                    mobile: input,
                    mobileError: false,
                    mobileValidationError: false,
                    mobileExist:false
                  });
                }
              }}
              errorMessage={
                this.state.mobileError === true
                  ? 'Enter the mobile number'
                  : this.state.mobileValidationError
                  ? 'Invalid mobile number'
                  : this.state.mobileExist
                  ? 'Mobile number already registered'
                  : null
              }
            />
            <Input
              placeholder="Company Name"
              style={styles.inputStyle}
              value={this.state.company}
              inputStyle={{fontFamily: 'GothamMedium', fontSize: 16}}
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
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    userType: state.reducer.userType,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditSellerProfile);
