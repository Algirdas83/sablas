// import express from 'express'
// import dataBa from '../serverConecct/connect.js'
// import bcrypt from 'bcrypt'
// import {resgiterValidator, loginValidator} from '../middlevear/validate.js'
// import { auth } from '../middlevear/auth.js'



const router = express.Router()

const saltRounds = 10


router.get('/all-posts/:userid', async (req, res) =>{

    try {

        const user = await dataBa.Users.findByPk(req.params.userid, {

            include: dataBa.Post2
        })
        res.json(user)

    } catch (error) {
        res.send('Ivyko serverio klaida')
    }

    res.send('Veikia')

})



router.post ('/register',resgiterValidator, async (req, res) => {
    

    try {

        //Sequelize paieska skirta surasti  ir patikrinti ar pvz tokio emailo jau nera duomenu bazeje 
        //https://sequelize.org/docs/v6/core-concepts/model-querying-finders/  nuoroda i metoda findOne Sequelize

        const userExist = await  dataBa.Users.findOne( {where: {email: req.body.email } } )

        if(userExist){
            res.status(401).send('Toks vartotoajas jau egzistuoja')
            return 
        }

        // npm bcrypt modulis emailo uzkodavimui 
        // nuoroda i bcrypt npm  https://www.npmjs.com/package/bcrypt
        req.body.password =  await bcrypt.hash(req.body.password, saltRounds )

        const user = await dataBa.Users.create(req.body)

        res.json(' Registracija sekminga')
        
    } catch (error) {

        console.log(error);
        res.status(401).send('ivyko serverio klaida')
    }

})

router.post('/login', loginValidator, async (req, res) => {

    try {

     const user = await dataBa.Users.findOne({where:{email: req.body.email}})

        if(!user)
        return res.status(401).send('Toks vartotojas nerastas')

            if(await bcrypt.compare(req.body.password, user.password )) {

            req.session.loggedIn = true

            req.session.user = {
                id: user.id,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }

            res.status(200).json({user: req.session.user, message: 'Sekmingai prisijungete'})
            
            } else{
                res.status(401).send('Nepavyko prisijungti')
            }

    } catch (error) {
        console.log(error);
        res.status(500).send('Ivyko serverio klaida')
    }
    
})

router.get('/logout', (req, res) => {

    req.session.destroy()

    res.send('Jus sekmingai atsijungete')
})


router.get('/check-auth', auth,  async (req, res) => {

    res.json(req.session.user)
})



export default router