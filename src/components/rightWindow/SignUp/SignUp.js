import React, {Component} from 'react'
import { Form, Icon, Input, Button, Select } from 'antd';
import './style.css'

const { Option } = Select;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  


class SignUpForm extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };

      loginClick = (e) => {
        this.props.windowStateChange(e, 'login')
      };


      
      render() {
        const { getFieldDecorator } = this.props.form


        return (
            <div className = "loginForm">
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="signup-form">
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            ],
                        })(<Input placeholder = "E-mail"/>)}
                    </Form.Item>
                    <div className = "form-item">
                        <Form.Item label = "Username">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please enter username!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                            placeholder="Username"
                            style = {{display:'inline'}}
                            />
                        )}
                        </Form.Item>
                    </div>
                    
                    <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please enter Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        
                        />,
                    )}
                    </Form.Item>

                    <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please enter Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        
                        />,
                    )}
                    </Form.Item>

                    <Form.Item label="Phone Number">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(<Input 
                        addonBefore='+7' 
                        placeholder="ex. (701)295 9705"
                        style={{ width: '100%' }} />)}
                    </Form.Item>

                    <Form.Item>
                    
                    <br/>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                        <div>
                            Or <a className = "login" onClick = {this.loginClick}>login</a>
                        </div>
                    </Form.Item>
                    
                    <br/>
                    
                    </Form.Item>
                </Form>
            </div>
          
        );
      }
}

const SignUp = Form.create({ name: 'normal_signup' })(SignUpForm);

export default SignUp