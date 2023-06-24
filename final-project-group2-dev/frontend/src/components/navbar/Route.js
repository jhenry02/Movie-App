import { Routes, Route } from 'react-router-dom';

// Keep all routing localized here for PAGES
import Home from '../../pages/Home';
import NowPlaying from '../../pages/NowPlaying';
import Popular from '../../pages/Popular';
import Theater from '../../pages/Theater';
import Upcoming from '../../pages/Upcoming';
import Login from '../../pages/Login';
import Register from '../userauth/Register';
import Error from '../Error/Error';
import MovieDetails from '../../pages/MovieDetails';
import MovieSearch from '../../pages/MovieSearch';
import Profile from '../../pages/Profile';

import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function MyRouter() {

    const { User, setUser } = useContext(UserContext);

    if (User) {
        return (
            <>
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route exact path='/Nowplaying' element={<NowPlaying />}></Route>
                    <Route exact path='/Popular' element={<Popular />}></Route>
                    <Route exact path='/Theater' element={<Theater />}></Route>
                    <Route exact path='/Upcoming' element={<Upcoming />}></Route>
                    <Route exact path='/Login' element={<Login />}></Route>
                    <Route exact path='/Register' element={<Register />}></Route>
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="/search/:query" element={<MovieSearch />}></Route>
                    <Route path="/profile" element={<Profile/>}></Route>
                </Routes>
            </>);
    } else if (!User) {
        return (
            <>
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route exact path='/Nowplaying' element={<Error />}></Route>
                    <Route exact path='/Popular' element={<Error />}></Route>
                    <Route exact path='/Theater' element={<Error />}></Route>
                    <Route exact path='/Upcoming' element={<Error />}></Route>
                    <Route exact path='/Login' element={<Login />}></Route>
                    <Route exact path='/Register' element={<Register />}></Route>
                    <Route path="/movies/:id" element={<Error />} />
                    <Route path="/search/:query" element={<Error />}></Route>
                    <Route path="/profile" element={<Error/>}></Route>
                </Routes>
            </>
        );
    }

}