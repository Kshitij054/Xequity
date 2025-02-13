import React , {useState , useEffect} from "react";
import myImage from './assets/Product.gif'; 
import pfp from '../assests/propfp.jpg'; 
import pfp2 from '../assests/propfp2.jpg'; 
import styles from "./Product.module.css";
import Headbar from "./Headbar";
import { Link } from "react-router-dom"
function Product()
{

    const [products, setProducts] = useState([]);
    const [fetchCount, setFetchCount] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();
        if (data.status === "Success") {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    
    fetchProducts();
  }, []);
  
  let a=1;
    return(
        <div className= {styles.Body} > 
                <div >
                <section className={styles.container}>
          {products.map((product,index) => (
            <Link to={'/ProductPage'} className={styles.detailsLink} key={product.email}>
              <div className={styles.content}>
                <div className={styles.logo}>
                  <img src={index % 2 === 0 ? pfp2 : pfp} alt="Product Image" className={styles.aboutImage} />
                </div>
                <div className={styles.specification}>
                  <ul className={styles.aboutItems}>
                    <li className={styles.aboutItem}>
                      <div className={styles.aboutItemText}>
                        <h2>{product.productName}</h2>
                        <p>{product.description}</p>
                        <p>{product.tags.join(', ')}</p> 
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </section>
                </div>
                <div className={styles.profile}>
                                <h3>Trending Products</h3>
                                <ul className={styles.aboutItems}>
                                    <li className={styles.aboutItem1}>
                                        <div className={styles.aboutItemText}>
                                        EpicTopia AI - personal pursuit manager to plan
                                        </div>
                                    </li>
                                    <li className={styles.aboutItem1}>
                                        <div className={styles.aboutItemText}>
                                        Jasper - Create SEO-optimized content in minutes with AI
                                        </div>
                                    </li>
                                    <li className={styles.aboutItem1}>
                                        <div className={styles.aboutItemText}>
                                        mandrake - Send Automated Twitter DMs
                                        </div>
                                    </li>
                                    <li className={styles.aboutItem1}>
                                        <div className={styles.aboutItemText}>
                                            Boardy - Get warm intros to investors, customers, and collaborators
                                        </div>
                                    </li>
                                </ul>
                            </div>
                </div>
    );
}
export default Product