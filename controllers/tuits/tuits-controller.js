import posts from "./tuits.js";
let tuits = posts;

const createTuit = (req, res) => { // http://localhost:4000/api/tuits
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime() + '';
    newTuit.likes = 0;
    newTuit.liked = false;
    tuits.push(newTuit);
    res.json(newTuit);
}
const findTuits  = (req, res) => { //http://localhost:4000/api/tuits
    // const type = req.query.type;
    // if (type) {
    //     const tuitsOfType = tuits.filter(t => t.type === type)
    //     res.json(tuitsOfType)
    //     return
    // }
    res.json(tuits)
}
const updateTuit = (req, res) => {  // http://localhost:4000/api/tuits/234
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const tuitIndex = tuits.findIndex((t) => t._id === tuitdIdToUpdate) // find index of tuit to update
    tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
    // tuits = tuits.map((tuit) => tuit._id === tuitdIdToUpdate ? {...tuit, ...updates} : tuit);
    res.sendStatus(200);
}


const deleteTuit = (req, res) => {  // http://localhost:4000/api/tuits/123
    const tuitdIdToDelete = req.params['tid'];
    tuits = tuits.filter(tuit => tuit._id !== tuitdIdToDelete);
    res.sendStatus(200);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
