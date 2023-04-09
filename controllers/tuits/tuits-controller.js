// import posts from "./tuits.js";
import * as tuitsDao from './tuits-dao.js'
// let tuits = posts;

const createTuit = async (req, res) => { // http://localhost:4000/api/tuits
    const newTuit = req.body;
    newTuit.likes = 0;
    newTuit.liked = false;
    const insertedTuit = await tuitsDao
        .createTuit(newTuit);
    res.json(insertedTuit);
}
const findTuits  = async (req, res) => { //http://localhost:4000/api/tuits
    const tuits = await tuitsDao.findTuits();
    res.json(tuits)
}
const updateTuit = async (req, res) => {  // http://localhost:4000/api/tuits/234
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao
        .updateTuit(tuitdIdToUpdate, updates);  // status reports success or failure to update document in database
    res.json(status); // respond with status object
}


const deleteTuit = async (req, res) => {  // http://localhost:4000/api/tuits/123
    const tuitdIdToDelete = req.params['tid'];
    const status = await tuitsDao
        .deleteTuit(tuitdIdToDelete);
    res.json(status);   // respond with status object
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
