const handleSignin = (req, res, DB, bcrypt) => {

    const { email, password } = req.body;
    //console.log(req.body);

    if(!email || !password) {
        return res.status(403).json('Incorrect form submission');
    } else {
        DB.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            //console.log('comparing: ', bcrypt.compareSync('apples', data[0].hash));
            if(isValid) {
                return DB.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => {
                        console.error('Error fetching user:', err);
                        return res.status(400).json('Unable to get user')
                    });
            } else  {
                return res.status(401).json('Wrong Credentials');
            }
        })
        .catch(err => {
            console.error('Wrong form submission:', err);
            return res.status(401).json('Wrong form...')
        });
    }

    
    
}

//export default handleSignin();
export {
  handleSignin
};