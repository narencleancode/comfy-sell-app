import { Button } from "antd"
import React, { useState } from "react"

const Incrementor = () => {
  const [inputValue, setinputValue] = useState(1)
  
  const incrementQuantity = () => {
    setinputValue(inputValue + 1)
  }

  const decrementQuantity = () => {
    if(inputValue > 0) {
      setinputValue(inputValue - 1)
    }
  }

  const handleChange = () => {
    setinputValue(inputValue);
  }

  return (<div style={{ display: "flex", width: "100px", float: "right"}}>
    <Button type="primary" style={{ width: "50px" }} size={'middle'} onClick={incrementQuantity}>+</Button>
    <input type="number" style={{ width: "24px", textAlign: "center" }} value={inputValue} onChange={handleChange} />
    <Button type="primary" style={{ width: "50px" }} size={'middle'} onClick={decrementQuantity}>-</Button>  
  </div>)
} 
export default Incrementor