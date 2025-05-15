import React, { useEffect, useState } from "react";
import Basket, { BasketProps } from "../components/basket/Basket"; // get both component and type


export default function BasketPage() {
    const [basket, setBasket] = useState<BasketProps["basketItems"] | null>(null);

    
    useEffect(() => {
        fetch("http://localhost:3000/customers/1/basket")
        .then((res) => res.json())
        .then((data) => setBasket(data))
        .catch((err) => console.error(err));
    }, []);


    return  <div>
                {basket ? (
                    <Basket basketItems={basket}/>
                ) : (
                    <p>bla bla</p>
                )}
            </div>
}