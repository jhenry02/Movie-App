import React from "react"
import logo_ours from '../../images/reelgood_logo_with_name_nbg.png';
import logo_yelp from '../../images/Yelp_logo.png';
import logo_tmdb from '../../images/TheMovieDB_logo.png';
import { Image } from 'react-bootstrap'
import "./Footer.css"

export default function MyFooter() {
    return (
        <>
            <div className="main-footer"> {/* This div holds a class towards the div's for footer. */}
                <div className="text-center col-sm">
                    <a href="/" target="_self" rel="noopener noreferrer">
                        <Image src={logo_ours} alt="Logo_ours" width={175} height={85} />
                    </a>
                    <a href="https://www.yelp.com/" target="_blank" rel="noopener noreferrer">
                        <Image className="block" src={logo_yelp} alt="Logo_yelp" width={125} height={85} />
                    </a>
                    <a href="https://www.themoviedb.org/?language=en-US" target="_blank" rel="noopener noreferrer">
                        <Image className="block" src={logo_tmdb} alt="Logo_tmdb" width={100} height={85} />
                    </a>
                </div>
                <div className="footer-copyright text-center py-1 text-light">Copyright © 2023 by Fried-Bankman Development Group (F.B.D.G)
                </div>
            </div>
        </>
    )
}


