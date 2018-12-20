let userModel = require(`${__dirname}/model/user.js`);

let UserController = {
    
    AddOneUserInCollection : function() {
        let data = { email : "sf44@email.com", password : ""}
        userModel.create(data,(err,user) => {
            if (err) {console.log('erreur create')}
            else console.log('user', user)
        }); 
    }    
}

module.exports = UserController;