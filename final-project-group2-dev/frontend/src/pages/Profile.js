//Import stuff here
import MyFavoriteList2 from "../../src/components/favoriteslist/FavoritesList2"
// import AccountInfo from "../components/accountinfo/AccountInfo";
import { Container, Row, Col } from "react-bootstrap";
import DefaultProfPic from "../images/default-prof-pic.PNG";

function Profile() {

    return (
        <>
            {/* <AccountInfo /> */}
            <h4 className="text-center">Account Information</h4>
            <div className="container border border-gray my-2 py-2">
                <div className="text-center">
                    <img src={DefaultProfPic} alt="..." className="h-25 w-25" />
                </div>
                <Container className="d-flex justify-content-center align-items-center h-100">
                    <Row>
                        <Col className="bg-white p-8 rounded-md">
                            <ul>
                                <li className="mb-2">
                                    <span className="font-semibold">First Name: </span>
                                    Guy
                                </li>
                                <li className="mb-2">
                                    <span className="font-semibold">Last Name: </span>
                                    Dudeman
                                </li>
                                <li className="mb-2">
                                    <span className="font-semibold">Zip code: </span>
                                    33421
                                </li>
                                <li className="mb-2">
                                    <span className="font-semibold">State: </span>
                                    Florida
                                </li>
                                <li className="mb-2">
                                    <span className="font-semibold">Email: </span>
                                    dudeman420@gmail.com
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
            <MyFavoriteList2 />
        </>
    )
}

export default Profile;