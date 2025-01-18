import React from 'react'
import { HeartOutlined } from '@ant-design/icons';
import Card from 'antd/es/card/Card';
import { Button, Row } from 'antd';


function Cards({ showIncomeModal, showExpenseModal, balance, income, expense }) {    
  return (
    <div>
      <Row className='m-4 flex justify-around items-center flex-wrap text-center p-4'>

        <Card title="Current Balance" className='hover:scale-105 shadow-2xl h-56 text-lg w-96 m-4'>
          Current Balance is : ₹ {balance}
          <div className="flex justify-center mt-4">
            <h2><i className='fa-regular fa-face-smile'></i> Your Balance is : ₹  {balance}</h2>
          </div>
        </Card>

        <Card title="Current Income" className='hover:scale-105 shadow-2xl w-96 h-56 text-lg m-4'>
          Total Income is : ₹ {income}
          <div className="flex justify-center mt-4">
            <Button className='block mt-4' onClick={showIncomeModal}>Add Income</Button>
          </div>
        </Card>

        <Card title="Current Expense" className='hover:scale-105 shadow-2xl h-56 w-96 m-4'>
          Total Expense is : ₹ {expense}
          <div className="flex justify-center mt-4">
            <Button className='block mt-4' onClick={showExpenseModal}>Add Expense</Button>
          </div>
        </Card>

      </Row>
    </div>
  )
}

export default Cards
