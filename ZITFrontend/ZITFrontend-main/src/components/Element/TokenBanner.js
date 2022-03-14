import React from "react";
import { Card, CardGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function TokenBanner() {
  return (
    <div className="page-content">
      <div className="token-steps">
        <div className="container">
          <h2>
            Chcesz, aby twoje ogłoszenie wyświetlało się na stronie głównej?
          </h2>
          <hr />
          <div className="steps">
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>Krok 1</Card.Title>
                  <Card.Text>
                    Zakup tokeny, dzięki którym będziesz mógł wystawiać
                    promowane zlecenia
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Krok 2</Card.Title>
                  <Card.Text>
                    Podczas wystawiania zlecenia, zaznacz opcję promowania
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Krok 3</Card.Title>
                  <Card.Text>
                    Ciesz się szybkim znalezieniem wykonawcy dla twojego
                    zlecenia
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
            <Row className="g-4">
              <Link to={"/zakup-tokenow"} className="btn btn-primary">
                Przejdź do zakupu <i class="bi bi-arrow-right"></i>
              </Link>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TokenBanner;
