import people from './users.js'   // import the array of users. Include the extension
let users = people

const UserController = (app) => {     // use express instance app to declare HTTP GET
    app.get('/api/users', findUsers)      // request pattern /api/users to call a function, eg:http://localhost:4000/api/users?type=STUDENT
    app.get('/api/users/:uid', findUserById); //eg:http://localhost:4000/api/users/123
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const findUsers = (req, res) => {   // http://localhost:4000/api/users       function runs when /api/users requested
    const type = req.query.type // retrieve type parameter from query,query string parameters encoded at the end of a URL after a question mark (?)
    if(type) {
        const usersOfType = users
            .filter(u => u.type === type)
        res.json(usersOfType)
        return // return so it doesn't continue
    }
    res.json(users)   // otherwise respond with all users

}

const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users
        .find(u => u._id === userId);
    res.json(user); // respond to client with user found
}

const createUser = (req, res) => {   //http://localhost:4000/api/users
    const newUser = req.body; // extract new user from BODY in request
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser); // respond with new user to client
}

const deleteUser = (req, res) => {  //http://localhost:4000/api/users/234
    const userId = req.params['uid']; // get user ID from path parameter uid
    users = users.filter(usr =>
        usr._id !== userId);
    res.sendStatus(200); // respond with success code
}

const updateUser = (req, res) => { // handle PUT /api/users/:uid    http://localhost:4000/api/users/345
    const userId = req.params['uid']; // get user ID from path
    const updates = req.body; // BODY includes updated fields
    users = users.map((usr) =>
        usr._id === userId ? // if current user's ID matches ID we want to update,  merge old usr with new updates
            {...usr, ...updates} :
            usr // otherwise keep the old user
    );
    res.sendStatus(200);
}




export default UserController