const myModal = document.querySelectorAll('.modal');
async function signup(e){
    e.preventDefault();
    const email = document.querySelector('#signupEmail');
    const password = document.querySelector('#signupPassword');
    
    try{
        const result = await firebase.auth().createUserWithEmailAndPassword(email.value,password.value);
        await result.user.updateProfile({
            displayName: "Ninja Coder",
          })
          createUserCollection(result.user);
          //await result.user.sendEmailVerification()
 
        M.toast({html:`Welcome ${result.user.email}`, classes:'green'})   
    }catch(error){  
         M.toast({html:error.message, classes:'red'})        
    }
    email.value = "";
    password.value = "";
    M.Modal.getInstance(myModal[0]).close(); 
}

async function login(e){
    e.preventDefault();
    const email = document.querySelector('#loginEmail');
    const password = document.querySelector('#loginPassword');
    
    try{
        const result = await firebase.auth().signInWithEmailAndPassword(email.value,password.value);
        M.toast({html:`Welcome ${result.user.email}`, classes:'green'})   
    }catch(error){  
         M.toast({html:error.message, classes:'red'})        
    }
    email.value = "";
    password.value = "";
    M.Modal.getInstance(myModal[1]).close(); 
}

function logout(e){
    firebase.auth().signOut();
    document.querySelector('#proimg').src = "./assets/noimage.png";
}

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        getUserInfoRealTime(user.uid);
        //getUserInfo(user.uid);
        document.getElementById('loginli').style.display='none';
        document.getElementById('signupli').style.display='none';
        document.getElementById('logoutli').style.display='block';
        if(user.uid  == 'ECjh1qDuKkMCfCbQleO2MLYsRqX2'){
            allUserDetails();
        }
    } else {
        getUserInfoRealTime(null);
        //getUserInfo(null);
        document.getElementById('table').style.display='none';
        document.getElementById('logoutli').style.display='none';
        document.getElementById('loginli').style.display='block';
        document.getElementById('signupli').style.display='block';
        M.toast({html:"signout success", classes:'green'})    
    }
  });
// code cleanup - unsubscribe()

async function loginWithGoogle(){
    try{
        var provider = new firebase.auth.GoogleAuthProvider();
       const result = await firebase.auth()
      .signInWithPopup(provider);
    
      M.Modal.getInstance(myModal[0]).close(); 
      M.Modal.getInstance(myModal[1]).close(); 
    }catch(err){
        M.toast({html:error.message, classes:'red'})
    }
    
}
