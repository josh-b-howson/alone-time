import { ToastContainer } from 'react-toastify';
import Link from 'next/link';

const Layout = (props) => {
  const LanguageSelect = (props) => {
    const handleChange = (e) => {
      console.log(e.target.value);
    }

    return <select onChange={handleChange}>
      <option value="none">Choose a version</option>
      <option value="ASV">ASV</option>
    </select>
  }

  return (
    <div className="layout">
      <header>
        <Link href="/"><a>back to home</a></Link>
        <LanguageSelect />
      </header>
      <ToastContainer />
      {props.children}
      <style jsx>{`
        
      `}</style>
    </div>
  )
}

export default Layout;