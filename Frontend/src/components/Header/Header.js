import React from 'react';
import scandiLogo from '../../images/ScandiwebLogo.png';

function Header() {
    return (
        <nav>
            <img src={scandiLogo} alt='Scandiweb Logo' className='nav--logo'/>
        </nav>
    )
}

export default Header;