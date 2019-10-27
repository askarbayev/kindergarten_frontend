import React, {Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.css'

class NormalLoginForm extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };

      signUpClick = (e) => {
          this.props.windowStateChange(e, 'signUp')
      }
    
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className = "loginForm">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                        placeholder="Username"
                        
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)
                    }
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <br/>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <br/>
                    <div>
                        Or <a className = "signUp" onClick = {this.signUpClick}>register now!</a>
                    </div>
                    
                    </Form.Item>
                </Form>
            </div>
          
        );
      }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login2' })(NormalLoginForm);

export default WrappedNormalLoginForm