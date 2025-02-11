import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

let coffeeData = []
let nextId = 1

//building a very simple CRUD application

//CREATE new coffee
app.post('/coffee', (req, res) => {
    const {name, price} = req.body; //destructuring on the go
    const newCoffee = {id: nextId++, name, price}
    coffeeData.push(newCoffee)
    res.status(201).send(newCoffee)
})

//RETRIEVE all coffee
app.get('/coffee', (req, res) => {
    res.status(200).send(coffeeData);
})

//RETRIEVE coffee with id 
app.get('/coffee/:id', (req, res) => {
    const coffee = coffeeData.find(c => c.id === parseInt(req.params.id)) //params gets information from the request url
    if (!coffee) {
        return res.status(404).send("coffee not found")
    } else {
        res.status(200).send(coffee);
    }
})

//UPDATE coffee
app.put('/coffee/:id', (req, res) => {
    const coffee = coffeeData.find(c => c.id === parseInt(req.params.id))
    if (!coffee) {
        return res.status(404).send("coffee not found")
    } else {
        const {name, price} = req.body
        coffee.name = name;
        coffee.price = price;
        res.status(200).send(coffee)
    }
})

//DELETE coffee
app.delete('/coffee/:id', (req, res) => {
    const index = coffeeData.findIndex(c => c.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("coffee not found")
    } else {
        coffeeData.splice(index, 1)
        return res.status(200).send("deleted")
    }
})

app.listen(port, () => {
    console.log(`server is running at port: ${port}..`)
})