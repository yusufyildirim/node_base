import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import { auth } from 'services';
import styles from './styles.css';

const FormItem = Form.Item;

class LoginForm extends PureComponent {
  state = { loading: false, message: null };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.onLogin(values)
    });
  }

  async onLogin(values) {
    this.setState({ loading: true });

    const { data: { token } } = await auth.login(values)
      .catch(({ response }) => {
        if (response) this.setState({ message: response.data.error.message, loading: false });
        else this.setState({ message: 'Something went wrong, please try again later', loading: false });
      });

    this.setState({ loading: false });
    flows.login(token);
    
  }

  renderMessage() {
    if(!this.state.message) return null;

    return <Alert style={{ marginBottom: 24 }} message={this.state.message} type="error" showIcon />;
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div styleName="login_form">
        {this.renderMessage()}
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please input a valid email adress!' }],
            })(
              <Input size="large" placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input size="large" type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem style={{ textAlign: 'center' }}>
            {/*<Checkbox>Remember me</Checkbox>
            <a styleName="login_form_forgot" href="">Forgot password</a>*/}
            Forgot your password? <a href="/forgot_password">Reset it here!</a>
            <Button size="large" type="primary" htmlType="submit" styleName="login_form_button" loading={this.state.loading}>
              Log in
            </Button>
            Don't you have an account? <a href="/register">Register here!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;