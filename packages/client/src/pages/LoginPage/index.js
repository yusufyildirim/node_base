import React, { PureComponent } from 'react';
import { Layout, Form, Input, Icon, Row, Col, Alert } from 'antd';
import  { LoginForm } from 'components';
import  { images } from 'resources';
import styles from './styles.css';
const { Header, Footer, Sider, Content } = Layout;

export default class LoginPage extends PureComponent {
  render() {
    return (
      <Row type="flex" justify="space-around" align="middle" styleName="container" className="flex_1 center">
        <Col>
          <LoginForm />
        </Col>
      </Row>
    );
  }
}
