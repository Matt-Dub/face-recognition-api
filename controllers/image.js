export const handleImage = (req, res, DB) => {
    const { id } = req.body;
    //let found = false;
    console.log('image : request received')
    // DB.select('users').where('id', '=', id)

    DB.select('users').from('users').where('id', '=', id)
    .increment('entries', 1)
    .returning(['id', 'name', 'email', 'entries', 'joined'])
    .then(data => {
        return res.json(data);
    })
    .catch(err => res.status(404).json('Unable to get entries'))
}

export const handleApiCall = (req, res) => {
  const PAT = process.env.CLAIRIFAI_API;
  console.log(PAT);
    res.json(PAT)
}

