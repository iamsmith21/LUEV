import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import UseAuth from "../contexts/UseAuth";
import UseCart from "../contexts/UseCart";
function NavbarEle() {
  const { user, logout,authChecked} = UseAuth();
  const {cart}=UseCart()
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await logout();
    alert("Logged Out");
    navigate("/");
  };
    if (!authChecked) {
    return null; 
  }
const quantity=cart.reduce((sum,curr)=>{
  return sum+curr.quantity
},0)


  return (
    <>
      <div className="bg-black text-white new-deals-section">
        <p className="d-flex justify-content-center align-items-center m-0">
          New deals every week.{" "}
          <span className="px-2">
            <Link to="/cars?hot_deal=true" className="hot-deals-link">
              hot deals
            </Link>
          </span>
        </p>
      </div>
      <Navbar bg="white" expand="lg" className="shadow-sm py-2">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold text-dark">
            ＬＵＥＶ
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/cars" className="mx-3">
                Shop Cars
              </Nav.Link>
              <NavDropdown
                title="Financing"
                id="nav-dropdown-finance"
                className="mx-3"
              >
                <NavDropdown.Item as={Link} to="/how-financing-works">
                  How Financing Works
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/car-calculator">
                  Car Loan Calculator
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="More" id="nav-dropdown-more" className="mx-3">
                <NavDropdown.Item as={Link} to="/about">
                  About Us
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/contact">
                  Contact Us
                </NavDropdown.Item>
                      <NavDropdown.Divider />
                              <NavDropdown.Item as={Link} to="/compare">
                  Compare Cars
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {user ? (
              <>
                <Button
                  variant="outline-secondary"
                  className="rounded-pill px-4 py-2 fw-semibold login-btn relative"
                  as={Link}
                  to="/cart"
                >
                  Cart
                  {cart.length>0?(<p className="bg-red-500 text-white rounded-full h-4 w-4 text-xs p-2 font-light flex items-center justify-center absolute right-1 bottom-0">{quantity}</p>):(<></>)}
                </Button>
                <Button
                  variant="outline-secondary"
                  className="rounded-pill px-4 py-2 fw-semibold login-btn"
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-secondary"
                  className="rounded-pill px-4 py-2 fw-semibold login-btn"
                  as={Link}
                  to="/login"
                >
                  Login / Register
                </Button>
                <Button
                  variant="outline-secondary"
                  className="rounded-pill px-4 py-2 fw-semibold login-btn"
                   as={Link}
                  to="/admin"
                >
                  Admin
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarEle;
