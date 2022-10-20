import React, { useState} from 'react'
import Light from './Light'



const Test = () => {  

  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",    
  })

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      label: 'Username',
      pattern: 'john',
      errorMessage:
        '3~16자 사이로 작성해야 합니다.',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'text',
      placeholder: 'Email',
      label: 'email',
      errorMessage:
        '유효한 이메일 주소를 입력해주세요.',
      required: true,
    },
    {
      id: 3,
      name: 'password',
      type: 'text',
      placeholder: 'Password',
      label: 'password',
      errorMessage:
        '8~20자 작성해야 하며 특수문자를 포함해야 합니다.',
      required: true,
    },
    {
      id: 4,
      name: 'birthday',
      type: 'date',
      placeholder: 'Birthday',
      label: 'birthday',
      errorMessage: '',
    },
  ];
  
  
  const handleSubmit = (e) => {    
    e.preventDefault()    
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  console.log(values);
  
 
  return (
    <div className="form_app">
      <form onSubmit={handleSubmit} >
        {inputs.map((input) => (
          <Light key={input.id} {...input} value={values[input.name]} onChange = {onChange} />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Test