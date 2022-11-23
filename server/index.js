import express from 'express'

const app = express()

app.get('/', (req,res) => {
    res.send('Viskaas veikia jeiii')
})

app.listen('3000', () => {
    console.log('ole saika');
    
})