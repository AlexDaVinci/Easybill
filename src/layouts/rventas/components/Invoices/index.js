// @mui material components
import Card from "@mui/material/Card";
import PropTypes from "prop-types"; // Añade esta línea

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Invoice from "layouts/rventas/components/Invoice";

function Invoices({ carrito, eliminarDelCarrito }) {
  Invoices.propTypes = {
    carrito: PropTypes.array.isRequired,
    eliminarDelCarrito: PropTypes.func.isRequired, // Añade esta línea
  };
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Carrito
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          Hacer venta
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {carrito.map((producto, index) => (
            <Invoice
              key={index}
              date="Producto"
              id={producto.nombre_producto}
              price={`$${producto.precio}`}
              eliminarDelCarrito={() => eliminarDelCarrito(producto.cartId)} // Añade esta línea
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
