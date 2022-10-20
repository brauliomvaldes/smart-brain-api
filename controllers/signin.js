const handleSignin = (req, res, db, bcrypt)=>{
    //res.send('signin !!!');
    //res.json('signing !!')
    const { email, hash } = req.body;
    if(!email || !hash ){
        return res.status(400).json('No es posible ingresar')
    }  
    db.select('email','hash')
        .from('login')
        .where('email',"=",email)
        .then(data=>{
            const isValid = bcrypt.compareSync(hash, data[0].hash);
            if(isValid){
                return db.select('*')
                    .from('users')
                    .where('email','=',email)
                    .then(user=>{
                        console.log('autorizado');
                        res.json(user[0])
                    })
                    .catch(err=>res.status(400).json('Error al acceser al usuario'))
            }
            console.log('no esta autorizado');
            res.status(400).json('credenciales erroneas');
        })
        .catch(err=>res.json('credenciales erroneas'))
}

module.exports = {
    handleSignin
};
