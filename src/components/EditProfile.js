import { Form, Input } from 'antd';

function EditProfile(){
  return(
    <div className="edit-profile-container">
      <Form>
        <Form.Item
          label="이름"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="아이디"
          name="id"
          rules={[
            {
              required: true,
              message: 'Please input your allergy!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="비밀번호 확인"
          name="passwordconfirm"
          rules={[
            {
              required: true,
              message: 'Please input your password confirm!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditProfile;