import './Footer.css'

function Footer() {

  return (
    <>
        <div className='footer'>
            <div className='footer-logo'>
                <img src="./image/logo/logo_shop.png" />
                <p>CLOTHES SHOP</p>
            </div>
            
            <ul className='footer-links'>
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className='footer-social'>
                <div className='footer-icon'>
                    <i class="fa-brands fa-facebook text-primary"></i>
                    <i class="fa-brands fa-youtube text-danger"></i>
                    <i class="fa-brands fa-tiktok text-dark"></i>
                </div>
            </div>
            <div className='footer-copyright'>
                Copyright @ 2023 - abcxyz
            </div>
        </div>
    </>
  );
}

export default Footer;
