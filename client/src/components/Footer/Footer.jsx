import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2 className="text-2xl font-bold">Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>
          <div className="item">
            <h2 className="text-2xl font-bold">About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2 className="text-2xl font-bold">Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on EtherX</span>
            <span>Buying on EtherX</span>
          </div>
          <div className="item">
            <h2 className="text-2xl font-bold">Community</h2>
            <span>Customer Success Stories</span>
            <span>Community hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>
          <div className="item">
            <h2 className="text-2xl font-bold">More From EtherX</h2>
            <span>EtherX Business</span>
            <span>EtherX Pro</span>
            <span>EtherX Logo Maker</span>
            <span>EtherX Guides</span>
            <span>Get Inspired</span>
            <span>EtherX Select</span>
            <span>ClearVoice</span>
            <span>EtherX Workspace</span>
            <span>Learn</span>
            <span>Working Not Working</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>EtherX</h2>
            <span>© Ether-X International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/images/twitter.png" alt="" />
              <img src="/images/facebook.png" alt="" />
              <img src="/images/linkedin.png" alt="" />
              <img src="/images/pinterest.png" alt="" />
              <img src="/images/instagram.png" alt="" />
            </div>           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;