import React, { useState } from 'react';

function AddPayment() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [level, setLevel] = useState('');

  const handleAddPayment = (event) => {
    event.preventDefault();

    const paymentData = { name, amount, level };

    fetch('http://127.0.0.1:8000/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          resetForm();
        }
      })
      .catch(error => {
        console.error('Error adding payment:', error);
      });
  };

  const resetForm = () => {
    setName('');
    setAmount('');
    setLevel('');
  };

  return (
    <div className='addStudent'>
      <div className='filter_students'>
        <div className='userProfile'>
          <h2>Add Payment</h2>
          <form onSubmit={handleAddPayment}>
            <div>
              <label>Number:</label>
              <input type='text' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label>Amount:</label>
              <input type='text' value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <div>
              <label>Level:</label>
              <input type='text' value={level} onChange={e => setLevel(e.target.value)} />
            </div>
            <button type='submit'>Add</button>
          </form>
          <p>NB-Pass a number of the student from the Students page as Number to make their payment</p>
          <p>2-For the Level use the syntax "S" followed by level number e.g S5</p>
        </div>
      </div>
    </div>
  );
}

export default AddPayment;
