const URL = 'http://mathtech.co.in/microffee_api/API/'

//////////////////////// Common API's //////////////////////////


export const signInAPI = URL+'userLogin';
export const otpAPI = URL+'otp';
export const changePasswordAPI = URL+'changepassword';
export const resetPasswordAPI = URL+'resetPassword';
export const mobileCheckAPI = URL+'checkmobile';
export const emailCheckAPI = URL+'checkEmail';
export const regionsAPI = URL+'getregions';
export const varitiesAPI = URL+'getVariety';
export const originsByIdAPI = URL+'getOriginsById';
export const lotsAPI = URL+'getLots';
export const unitsAPI = URL+'getUnits';
export const productsAPI = URL+'getproducts';
export const countriesAPI = URL+'getCountries';
export const statesAPI = URL+'getStates';



//////////////////////// Buyer API's //////////////////////////

export const buyerSignupAPI = URL+'buyerSignUp';
export const buyerProfilePicUploadAPI = URL+'buyerProfilePicUpload';
export const buyerUpdateProfileAPI = URL+'buyerUpdateProfile';
export const buyerDetailsAPI = URL+'getBuyerdetails';
export const buyerAddAddressAPI = URL+'addBuyerAddress';
export const buyerAddressAPI = URL+'getBuyerAddress';
export const buyerAddressDeleteAPI = URL+'deleteBuyerAddress';
export const buyerAddressByIdAPI = URL+'getBuyerAddressById';
export const buyerAddressUpdateAPI = URL+'updateBuyerAddressById';
export const buyerHomeAPI = URL+'getBuyerHomeData';
export const buyerAllProductAPI = URL+'getBuyerProducts';
export const buyerProductByIdAPI = URL+'getBuyerProductsById';
export const buyerWishlistAPI = URL+'getBuyerWishlist';
export const buyerWishlistAddOrRemoveAPI = URL+'buyerProductWishList';
export const buyerWishlistRemoveAll = URL+'clearBuyerWishlist';
export const buyerAddProductToCart = URL+'buyerAddProductToCart';
export const buyerProductsCartData = URL+'buyerProductCartData';
export const buyerDeleteProductFromCart = URL+'buyerDeleteProductFromCart';

//////////////////////// Seller API's //////////////////////////

export const sellerSignupAPI = URL+'sellerSignup'
export const sellerProfilePicUploadAPI = URL+'sellerProfilePicUpload';
export const sellerUpdateProfileAPI = URL+'sellerUpdateProfile';
export const sellerDetailsAPI = URL+'getSellerdetails';
export const sellerAddAddressAPI =URL+'addSellerAddress';
export const sellerAddressAPI = URL+'getSellerAddress';
export const sellerAddressDeleteAPI = URL+'deleteSellerAddress';
export const sellerAddressByIdAPI = URL+'getSellerAddressById';
export const sellerAddressUpdateAPI = URL+'updateSellerAddressById';
export const sellerInventoryAPI = URL+'getSellerInventory';
