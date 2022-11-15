import './global.css';
import Navbar from './Navbar';
import Footer from './Footer';
import ErrorMsg from './ErrorMsg';

import DB from "../classes/db";

const db = new DB();

async function getNavbarData() {
    return db.query('SELECT * FROM categories')
    .catch((err) => err);
}

export default async function RootLayout({ children }) {
  const navData = await getNavbarData();


  return (
    <html>
      <head></head>
      <body>
        <Navbar data={navData}/>
        <ErrorMsg />
        <main className='container'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
