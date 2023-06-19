// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Invoice({ date, id, price, quantity, noGutter, eliminarDelCarrito }) {
  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <MDBox lineHeight={1.125}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {date}
        </MDTypography>
        <MDBox display="flex" alignItems="center">
          <MDTypography variant="caption" fontWeight="regular" color="text">
            {id}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox
        lineHeight={1.125}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <MDTypography display="block" variant="button" fontWeight="medium">
          Cantidad
        </MDTypography>
        <MDBox display="flex" alignItems="center">
          <MDTypography variant="caption" fontWeight="regular" color="text">
            {`${quantity}`}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="button" fontWeight="regular" color="text">
          {price}
        </MDTypography>
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          ml={3}
          sx={{ cursor: "pointer" }}
          onClick={eliminarDelCarrito}
        >
          <Icon fontSize="small">delete</Icon>
          <MDTypography variant="button" fontWeight="bold"></MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Invoice
Invoice.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Invoice
Invoice.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired, // Añade esta línea
  noGutter: PropTypes.bool,
  eliminarDelCarrito: PropTypes.func.isRequired,
};

export default Invoice;
