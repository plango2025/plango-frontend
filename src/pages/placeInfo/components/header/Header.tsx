import React from 'react'
import {Wrapper, Title, Rating} from "./Header.styles"
interface Props {
    name: string;
    rating: number;
  }
  
const Header = ({name, rating}:Props) => {
  return (
   <Wrapper>
    <Title>{name}</Title>
    <Rating> ⭐⭐⭐⭐⭐{rating.toFixed(5)}</Rating>
   </Wrapper>
  )
}

export default Header
