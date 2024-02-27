import React from 'react';
import './footer.scss';
const Footer = () => {
  return (
    <div className='fBox'>
      <div className='footer'>
        <div className='fLists'>
          <ul className='fList'>
            <li className='fListItem'>Countries</li>
            <li className='fListItem'>Regions</li>
            <li className='fListItem'>Cities</li>
            <li className='fListItem'>Districts</li>
            <li className='fListItem'>Airports</li>
          </ul>
          <ul className='fList'>
            <li className='fListItem'>Homes </li>
            <li className='fListItem'>Apartments </li>
            <li className='fListItem'>Resorts </li>
            <li className='fListItem'>Villas</li>
            <li className='fListItem'>Hostels</li>
          </ul>
          <ul className='fList'>
            <li className='fListItem'>Car rental </li>
            <li className='fListItem'>Flight Finder</li>
            <li className='fListItem'>Restaurant reservations </li>
            <li className='fListItem'>Travel Agents </li>
          </ul>
          <ul className='fList'>
            <li className='fListItem'>Curtomer Service</li>
            <li className='fListItem'>Partner Help</li>
            <li className='fListItem'>Careers</li>
            <li className='fListItem'>Sustainability</li>
            <li className='fListItem'>Press center</li>
          </ul>
        </div>
        <div className='fText'>Copyright © 2022 Khai Nguyen</div>
      </div>
    </div>
  );
};

export default Footer;
