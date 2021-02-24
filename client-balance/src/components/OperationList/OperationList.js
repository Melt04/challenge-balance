/** @format */

import React from 'react'

import OperationItem from '../OperationItem/OperationItem'
import Container from 'react-bootstrap/Container'

import './OperationList.css'

function OperationList({ operations, typeOperation }) {
  return (
    <Container>
      {operations.map((opItem, index) => (
        <OperationItem
          index={index}
          key={index}
          operationItem={opItem}
          typeOperation={typeOperation}
        ></OperationItem>
      ))}
    </Container>
  )
}

export default OperationList
