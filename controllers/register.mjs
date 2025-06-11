const handleRegister = (req, res, DB, bcrypt) => {
    const { name, email, password } = req.body;
    const saltRounds = 10;

    if(!name || !email || !password) {
        return res.status(401).json('Incorrect form submission');
    }

    let passHash = '';

    bcrypt.hash(password, saltRounds)
    .then(function(hash) {
        passHash = hash;

        DB.transaction(trx => {
            trx.insert({
                hash: passHash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
            })
            .then(user => {
                res.json(user[0]);
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
    })
}

export {
    handleRegister
}