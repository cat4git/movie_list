
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
export class GoogleLoginServise{


    consig= async()=>{
      try {
        const a= await GoogleSignin.configure({webClientId:"686383247009-sq49koe2n4db3efnlj7nhpbodrd0il5g.apps.googleusercontent.com"});
        console.log (a)
      }
      catch(error){
        console.log(error)
      }
    }
    signIn = async () => {
      
        try {
        
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log(userInfo)
          return userInfo
        } catch (error) {
          console.log(error)
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
          return {
            user: {
              photo: "https://randomuser.me/api/portraits/men/73.jpg", // url
              name: "Burt Nikolia"
            }
          }
        }
      };

    isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return (isSignedIn)
    };
}