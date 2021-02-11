/** @format */

import React from 'react'

import OperationItem from '../OperationItem/OperationItem'
import Container from 'react-bootstrap/Container'
import { useQuery } from '../../hooks'
import './OperationList.css'

function OperationList({ operations, typeOperation }) {
  const modifier = useQuery().get('modifier')
  return (
    <Container>
      {operations.map((opItem, index) => (
        <OperationItem
          index={index}
          operationItem={opItem}
          typeOperation={typeOperation}
        ></OperationItem>
      ))}
    </Container>
  )
}

export default OperationList
