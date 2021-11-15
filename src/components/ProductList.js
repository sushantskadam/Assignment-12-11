import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Card,Button,Row,Container} from 'react-bootstrap'

const client = axios.create({
    baseURL:"http://localhost:3001/product"
})

function ProductList() {
    const [prodData, setProdData] = useState([])
    
    
    useEffect(() => {
        client.get()
        .then(res=>{
            setProdData(res.data)
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
        
    }, [])
    return (
        <div>
            <Container fluid={true}>
             <Row xs ={6} md={4} className="justify-content-center">
                 {prodData.length>0?
                    prodData.map((prod,i)=>
                   
                <Card key={i} style={{width:'18rem', margin:'10px'}} className="bg-light bg-gradient">
                <Card.Img variant="top" src={prod.image} className="mt-1 bg-gradient"/>
                <Card.Body>
                    <Card.Title>Name: {prod.pname}</Card.Title>
                    <Card.Text>Quantity: {prod.quantity}</Card.Text>
                    <Card.Text>Price: {prod.price}</Card.Text>
                    <Button variant="primary">Add to Cart</Button>
                </Card.Body>
                </Card>
                
                    ):<p>not found</p>}
                    </Row>
                    </Container>
                    

        </div>
    )
}

export default ProductList
