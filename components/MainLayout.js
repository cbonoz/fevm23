// import Navbar from './navbar'
// import Footer from './footer'

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { APP_NAME, DISCLAIMER, HACK_DESC } from '../util/constants';
import Image from 'next/image';
const { Header, Content, Footer, Sider } = Layout;

import logo from '../img/logo_trans.png'
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function MainLayout({ children }) {
  const router = useRouter()


  const menuItems = [
    {
      key: '/',
      label: <Link href="/">
        <Image src={logo} className='header-logo' alt={APP_NAME} />
      </Link>
    },
    {
      key: '/search',
      label: <Link href="/search">Search</Link>
    },
    {
      key: '/about',
      label: <Link href="/about">About</Link>
    },
  ]

  const pathname = router.pathname

  return (
    <Layout className="layout">
      <Header>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          items={menuItems}
        />
      </Header>

      {/* <Sider collapsible>left sidebar</Sider> */}
      <Content>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center', borderTop: '1px solid lightgrey' }}><p>{DISCLAIMER}</p><br/><b>{APP_NAME}</b> ©2023. {HACK_DESC}</Footer>
    </Layout>)
}