import React from 'react';
import { Card, CardContent, Link } from '@material-ui/core';
import { Row } from 'react-bootstrap';

const Error404 = () => {
    return (
        <div>
            <Card raised={true}>
                <CardContent>
                    <Row>
                        <center>
                            Error 404: Not Found 🙄<br />
                            Go back to <Link to="/">home</Link>
                        </center>
                    </Row>
                </CardContent>
            </Card>
        </div>
    )
}

export default Error404;