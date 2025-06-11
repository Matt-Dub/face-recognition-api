const handleProfile = (req, res, DB) => {
    const { id } = req.params;
    let found = false;

    DB.select('*').from('users').where({id})
    .then(user => {
        if(user.length) {
            res.json(user[0]);
        } else {
            res.status(404).json('error getting user');
        }
        
    })
    .catch(err => res.status(400).res.json(err));

    found=true;

    if(!found) {
        res.status(404).json('user not found');
    }
}

export default handleProfile;
// module.exports = {
//     handleProfile: handleProfile
// }