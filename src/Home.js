import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { Button, CardContent, Typography } from "@material-ui/core";

const Home = () => {
    return (
        <div>
            <Fade cascade>
                <Card raised="true">
                    <CardContent>
                        <Row>
                            <Col>
                                <Typography variant="h4">
                                    Paddy Leaf Disease Detection System
                </Typography>
                                <Typography variant="h5">
                                    Identify diseases in paddy leaf
                </Typography>
                                <br />
                                <Link to="/newimage">
                                    <Button variant="contained">
                                        Identify disease from a leaf sample
                  </Button>
                                </Link>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Typography variant="subtitle1">
                                    PLDDS helps farmers identify deadly diseases from their paddy
                                    crops quickly with the help of Artificial Intelligence with Deep Learning.
                </Typography>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <Typography variant="h5">
                                    Types of diseases that can be identified
              </Typography>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col style={{ flexGrow: "inherit" }}>
                                <h5>Bacterial Leaf Blight Disease</h5>
                                <img
                                    src="./images/BLB.jpg"
                                    alt="blb"
                                    style={{ imageResolution: "auto", maxWidth: "200px" }}
                                />
                            </Col>
                            <Col sm>
                                <br />
                                <Typography variant="subtitle1" align="justify">
                                    Bacterial Blight disease, a deadly bacterial disease that is
                                    among the most destructive afflictions of cultivated rice. It
                                    causes wilting of seedlings and yellowing and drying of leaves
                                    also called kresek. It becomes evident as water-soaked streaks
                                    that spread from the leaf tips and margins, becoming larger
                                    and eventually releases a milky ooze that dries into yellow
                                    droplets. Characteristic grayish white lesions then appear on
                                    the leaves, signaling the late stages of infection, when
                                    leaves dry out and die. On seedlings, infected leaves turn
                                    grayish green and roll up. As the disease progresses, the
                                    leaves turn yellow to straw-colored and wilt, leading whole
                                    seedlings to dry up and die. Infected seedlings usually are
                                    killed by bacterial blight within two to three weeks of being
                                    infected; adult plants may survive, though rice yield and
                                    quality are diminished.
                </Typography>
                                <br />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col style={{ flexGrow: "inherit" }}>
                                <h5>Brown Spot Disease</h5>
                                <img
                                    src="./images/brownspot.jpg"
                                    alt="bbrownspot"
                                    style={{ imageResolution: "auto", maxWidth: "200px" }}
                                />
                            </Col>
                            <Col sm>
                                <br />
                                <Typography variant="subtitle1" align="justify">
                                    Brown spot is a fungal disease that infects the coleoptile,
                                    leaves, leaf sheath, panicle branches, glumes, and spikelets.
                                    Its most observable damage is the numerous big spots on the
                                    leaves which can kill the whole leaf. When infection occurs in
                                    the seed, unfilled grains or spotted or discolored seeds are
                                    formed. The disease can develop in areas with high relative
                                    humidity and temperature It is common in unflooded and
                                    nutrient-deficient soil, or in soils that accumulate toxic
                                    substances. The fungus can survive in the seed for more than
                                    four years and can spread from plant to plant through air.
                                    Brown spot can occur at all crop stages, but the infection is
                                    most critical during maximum tillering up to the ripening
                                    stages of the crop.
                </Typography>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col style={{ flexGrow: "inherit" }}>
                                <h5>Leaf Blast Disease</h5>
                                <img
                                    src="./images/leafblast.jpg"
                                    alt="leafblast"
                                    style={{ imageResolution: "auto", maxWidth: "200px" }}
                                />
                            </Col>
                            <Col sm>
                                <br />
                                <Typography variant="subtitle1" align="justify">
                                    Leaf blast disease also known as rice blast disease, on which
                                    it causes diamond / spindle shaped white to gray lesion with
                                    dark green to brown borders surrounded by a yellowish halo,
                                    the lesion may enlarge coalesce and kill entire leaves. It can
                                    affect all above ground parts of a rice plant: leaf, collar,
                                    node, neck, parts of panicle, and sometimes leaf sheath. Blast
                                    can occur wherever blast spores are present. It occurs in
                                    areas with low soil moisture, frequent and prolonged periods
                                    of rain shower, and cool temperature in the daytime. In upland
                                    rice, large day-night temperature differences that cause dew
                                    formation on leaves and overall cooler temperatures favor the
                                    development of the disease. Rice can have blast in all growth
                                    stages. However, leaf blast incidence tends to lessen as
                                    plants mature and develop adult plant resistance to the
                                    disease.
                </Typography>
                            </Col>
                        </Row>
                    </CardContent>
                </Card>
            </Fade>
        </div>
    );
};

export default Home;
