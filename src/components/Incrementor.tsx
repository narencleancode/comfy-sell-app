import { Button } from "antd"
import React, { useState } from "react"
import styled from "styled-components"

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

  const buttonStyle = { flex: 1, fontWeight: 'bold' }
  const IncrementorContainer = styled.div`
    display: flex;
    max-width: 70%;
  `
  const NumberInput = styled.input`
    text-align: center;
    max-width: 50px;
  `


  return (<IncrementorContainer>
    <Button type="primary" style={buttonStyle} size={'middle'} onClick={decrementQuantity}>-</Button>  
    <NumberInput type="number" value={inputValue} onChange={handleChange} />
    <Button type="primary" style={buttonStyle} size={'middle'} onClick={incrementQuantity}>+</Button>
  </IncrementorContainer>)
} 
export default Incrementor