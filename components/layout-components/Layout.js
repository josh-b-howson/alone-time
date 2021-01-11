import { ToastContainer } from 'react-toastify';
import Link from 'next/link';

const Layout = (props) => {
  return (
    <div className="layout">
      <header>
        <Link href="/"><a>back to home</a></Link>
      </header>
      <ToastContainer />
      {props.children}
      <style jsx>{`
        
      `}</style>
    </div>
  )
}

export default Layout;