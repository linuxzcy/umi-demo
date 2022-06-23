import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
const { Header, Sider, Content } = Layout;
const App: React.FC = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);

  const [value, setValue] = useState('');
  const [state, setState] = useState([
    {
      label: '菜单项一',
      key: 'item-1',
      children: [
        { label: '子菜1-1', key: 'submenu1' },
        { label: '子菜1-2', key: 'submenu2' },
      ],
    },
    {
      label: '菜单项二',
      key: 'item-2',
      children: [
        { label: '子菜2-1', key: 'sub1' },
        { label: '子菜2-2', key: 'sub2' },
      ],
    },
    {
      label: '菜单项3',
      key: 'item-3',
    },
  ]);
  const [key, setKey] = useState('');
  const handleClick = (e: any) => {
    // 说明是一级菜单
    if (e.keyPath.length === 1 && e.key === e.keyPath[0]) {
      setKey(e.key);
      let obj = state.find((item) => item.key === e.keyPath[0]);
      if (obj) {
        setValue(obj.label);
      }
      history.push('/' + e.key);
    }
    // 非一级
    if (e.keyPath.length > 1) {
      setKey(e.keyPath);
      let obj = state.find((item) => item.key === e.keyPath[1]);
      if (obj && obj.children) {
        let haha = obj.children.find((i) => i.key === e.key);
        haha ? setValue(haha.label) : setValue('');
      }
      history.push('/' + e.keyPath[0]);
    }
  };
  // 表单input
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  const save = (e: any) => {
    // 如果是一级
    if (typeof key === 'string') {
      state.find((item) => {
        if (item.key === key) {
          setState([
            ...state.filter((i) => i.key !== key),
            { ...item, label: value },
          ]);
        }
      });
    } else {
      const newArr = state.map((item) => {
        if (item.key !== key[1]) {
          return item;
        } else {
          return {
            ...item,
            children: item.children?.map((i) => {
              if (i.key === key[0]) {
                return {
                  ...i,
                  label: value,
                };
              } else {
                return i;
              }
            }),
          };
        }
      });
      setState(newArr);
    }
  };
  return (
    <Layout
      style={{
        height: '100vh',
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={state}
          onClick={handleClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: '#fff' }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            },
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <input type="text" value={value} onChange={handleChange} />{' '}
          <button onClick={save}>保存</button>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
