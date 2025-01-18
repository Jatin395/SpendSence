import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from './Cards';
import { Form, Modal, Input, DatePicker, Select, Button } from 'antd';
import { toast } from 'react-toastify';
import { addDoc, collection, getDocs, } from 'firebase/firestore';
import { MyDB } from './Firebase';
import TransitionsTable from './TransitionsTable';
import ChartsTransitions from './ChartsTransitions';

function Dashboard({ user }) {
  const userid = user?.uid;
  const navigate = useNavigate();

  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [showtran, setshowtran] = useState([]);
  const [transitions, setTransitions] = useState([]);


  const [balance, setBalance] = useState(0);
  const [income, setincome] = useState(0);
  const [expense, setespense] = useState(0);

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const cancelIncomeModal = () => {
    setIsIncomeModalVisible(false);
  };

  const cancelExpenseModal = () => {
    setIsExpenseModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransition = {
      type: type,
      date_time: values.date ? values.date.toDate() : null,
      amount: parseFloat(values.amount),
      cat: values.category,
      name: values.name
    };
    setshowtran((prevTransitions) => [...prevTransitions, newTransition]);
    calculateBalance(newTransition);
    Addtransition(newTransition);
    form.resetFields();
  };

  // add transition
  const Addtransition = async (Transition) => {
    try {
      console.log(Transition);
      await addDoc(collection(MyDB, `users/${userid}/transitions`), Transition)
        .then(() => {
          toast.success("Transition Added");          
        })
        .catch((e) => {
          toast.error("error", e);
        })

    } catch (error) {
      toast.error(error);
      console.log(error);
    }

  }
  // fetch transitions
  const fetchtransitions = async () => {
    try {
      const transitionsRef = collection(MyDB, "users", userid, "transitions");
      const querySnapshot = await getDocs(transitionsRef);
      const transitionsList = querySnapshot.docs.map(doc => doc.data());      
      setshowtran(transitionsList);
      console.log(showtran);
    } catch (error) {
      console.error("Error fetching transitions:", error);
      toast.error("Failed to load transitions.");
    }
  }

  // for calculate balance
  const calculateBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    showtran.forEach((transition) => {
      if (transition.type === 'income') {
        totalIncome += transition.amount;
      } else {
        totalExpense += transition.amount;
      }
    });

    setincome(totalIncome);
    setespense(totalExpense);
    setBalance(totalIncome - totalExpense);
    console.log('Current balance:', totalIncome - totalExpense);
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }else{
      fetchtransitions();
    }
  }, [userid]);

  useEffect(() => {
    if (showtran.length > 0) {
      calculateBalance();
    }
  }, [showtran]);



  return (
    <>
      <Cards showIncomeModal={showIncomeModal} showExpenseModal={showExpenseModal} balance={balance} income={income} expense={expense} />
      
      {/* Income Modal */}
      <Modal title="Add Income" visible={isIncomeModalVisible} onCancel={cancelIncomeModal}>
        <Form layout="vertical" form={form} onFinish={(values) => onFinish(values, 'income')}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the income name' }]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input the income amount' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date' }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>

      {/* Expense Modal */}
      <Modal title="Add Expense" visible={isExpenseModalVisible} onCancel={cancelExpenseModal}>
        <Form layout="vertical" form={form} onFinish={(values) => onFinish(values, 'expense')}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the income name' }]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input the expense amount' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date' }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
            <Select>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="transport">Transport</Select.Option>
              <Select.Option value="utilities">Utilities</Select.Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
            
      {showtran.length > 0 ? <ChartsTransitions balance={balance} income={income} expense={expense} /> : (
        <>
        <h2>You have no transections</h2>
        </>
      )}
      <TransitionsTable showtran={showtran} />
    </>
  );
}

export default Dashboard;
