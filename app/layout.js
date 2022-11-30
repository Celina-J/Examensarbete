import './global.css';
import Navbar from './Navbar';
import Footer from './Footer';
import ErrorMsg from './ErrorMsg';
import Providers from './Providers';
import NodeCache from "node-cache";
import DB from "../classes/db";

const db = new DB();

async function getNavbarData() {
  let categoryData = await db.query('SELECT * FROM categories')
    .catch((err) => err);
    return categoryData;
}

export default async function RootLayout({ children }) {
  const navData = await getNavbarData();
  const myCache = new NodeCache();
  myCache.set('test', 'cached stuff');
  console.log('DATA FROM CACHE', myCache.get('test'));


  return (
    <html>
      <head></head>
      <body>
        <Providers>
          <Navbar data={navData} />
          <ErrorMsg />
          <main className='container'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
