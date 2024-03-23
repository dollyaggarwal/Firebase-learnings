const userDetails = document.querySelector('.userDetails');

function createUserCollection(user){
    firebase.firestore().collection("users").doc(user.uid).set({
        uid:user.uid,
        name:user.displayName,
        email:user.email,
        phone:"",
        speciality:"",
        portfolioUrl:"",
    })
}

async function getUserInfo(userID){

        if(userID){
            const userInfoSnap = await firebase.firestore().collection("users").doc(userID).get();
            const userInfo =  userInfoSnap.data();
            if(userInfo){
                userDetails.innerHTML = `
                <h3>${userInfo.name}</h3>
                <h3>${userInfo.email}</h3>
                <h3>${userInfo.phone}</h3>  `        
            }
        }else{
            userDetails.innerHTML = `<h3>Please Login</h3>`        
        }
  }