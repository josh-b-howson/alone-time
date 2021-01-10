import { ToastContainer } from 'react-toastify'

const Layout = (props) => {
  return (
    <div className="layout">
      <ToastContainer />
      {props.children}
      <style jsx>{`
        
      `}</style>
    </div>
  )
}

export default Layout;