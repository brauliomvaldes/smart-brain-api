const handleProfile = (req, res, db)=>{
    // los datos vienen como parametro en el link
    const { id } = req.params;
    // siempre devuelve un objero pero hay que chequear que no este vacio
    db.select('*').from('users').where({id: id})
    .then(entries=>{
        if(entries.length){
            res.json(entries[0])
        }else{
            res.json('No encontrado')
        }
    })
    .catch(err=>res.status(400).json('Error al buscar'))
}

module.exports = {
    handleProfile
}