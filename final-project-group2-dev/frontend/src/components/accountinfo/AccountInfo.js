import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { Container, Row, Col } from "react-bootstrap";
import DefaultProfPic from "../../images/default-prof-pic.PNG";

function AccountInfo(props) {
    // Getting userID
    let { User } = useContext(UserContext);
    let userID = JSON.parse(User).uid;

    // Set states
    let [response, setResponse] = useState(null);
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);

    // Write function to get Account Information for the current user with the passed ID
    async function getAccountInfo(userID) {
        // Clearing old response data and resetting loading state
        setResponse(null);
        setError(null);
        setLoading(true);

        try {
            // Make call to backend server
            const response = await axios.get(`/accountinfo/${userID}`);
            // On success
            setResponse(response.data[0]);
            setLoading(false);
        } catch (error) {
            // On error
            // console.log(error);
            if (error.response) {
                // Get error data and display error message accordingly
                const errorMessage = error.response.data.status_message;
                setError(errorMessage);
                setLoading(false);
            }
        }
    }

    // Call function to get account details whenever this component re-renders or userID changes
    useEffect(() => {
        getAccountInfo(userID);
    }, [userID]);

    // Generate the account information
    return (
        <>
            {/*Show when loading*/}
            {loading && (
                <>
                    <h4 className='text-center'>Account Information</h4>
                    <p className='text-center'>Loading...</p>
                </>
            )}

            {/*If the response object isn't null and has at least one item, generate the movie list */}
            {response && (
                <>
                    <Container className="d-flex justify-content-center align-items-center h-100">
                        <Row>
                            <Col className="bg-white p-8 rounded-md">
                                <h4 className="text-3xl font-bold mb-8">Account Information</h4>
                                <img src={DefaultProfPic} className="h-25 w-25" alt="..." />
                                <ul>
                                    <li className="mb-2">
                                        <span className="font-semibold">First Name: </span>
                                        {response.first_name}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-semibold">Last Name: </span>
                                        {response.last_name}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-semibold">Zip code: </span>
                                        {response.zipcode}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-semibold">State: </span>
                                        {response.state}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-semibold">Email: </span>
                                        {response.email}
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}

            {/*If an error occured, report it to the client*/}
            {error && (
                <>
                    <h4 className='text-center'>Account Information</h4>
                    <div className='error-message text-center' style={{ color: 'red' }}>Account Information Error: {error}</div>
                </>
            )}

        </>
    );
}

export default AccountInfo;
