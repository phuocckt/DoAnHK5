import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axiosClient from "../api/axiosClient";
import { useUser } from "../components/UserContext";
import { theme } from "antd";

export default function Invoice() {
  const [invoices, setInvoice] = useState([]);
  const [invoiceDetails, setInvoiceDetail] = useState([]);
  const [totals, setTotal] = useState(0);
  let index = 0;
  const { updateUser } = useUser();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user } = useUser();
  useEffect(() => {
    const storedId = localStorage.getItem('id');
    const storedUsername = localStorage.getItem('fullname');
    updateUser({ fullname: storedUsername, id: storedId, token: localStorage.getItem('accessToken') });
    axiosClient.get("/Invoices")
      .then(res => setInvoice(res.data));
    axiosClient.get("/InvoiceDetails")
      .then(res => {
        setInvoiceDetail(res.data);
        const cartTotal = res.data.reduce((acc, item) => {
          return acc + item.unitPrice * item.quantity;
        }, 0);
        setTotal(cartTotal);
      });
  }, [user.id]);
  return (
    <>
      {invoices.map(item => {
        if (user.id === item.userId) {
          return (
            <MDBContainer className="py-5">
              <MDBCard className="p-4 w-100 h-100">
                <MDBCardBody>
                  <MDBContainer className="mb-2 mt-3">
                    <MDBRow className="d-flex align-items-baseline">
                      <MDBCol xl="9">
                        <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                          Hóa đơn &gt; &gt; <strong>Mã: {item.id}</strong>
                        </p>
                      </MDBCol>
                      <MDBCol xl="3" className="float-end">
                        <MDBBtn
                          color="light"
                          ripple="dark"
                          className="text-capitalize border-0"
                        >
                          <MDBIcon fas icon="print" color="primary" className="me-1" />
                          In
                        </MDBBtn>
                        <MDBBtn
                          color="light"
                          ripple="dark"
                          className="text-capitalize border-0 ms-2"
                        >
                          <MDBIcon
                            far
                            icon="file-pdf"
                            color="danger"
                            className="me-1"
                          />
                          Xuất
                        </MDBBtn>
                        <hr />
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                  <MDBContainer>
                    <MDBCol md="12" className="text-center">
                      <img className="mb-3" style={{ width: '100px' }} src="./image/logo/logo_shop.png" />
                    </MDBCol>
                  </MDBContainer>
                  <MDBRow>
                    <MDBCol xl="8">
                      <MDBTypography listUnStyled>
                        <li className="text-muted">
                          Đến: <span style={{ color: "#5d9fc5" }}>{user.fullname}</span>
                        </li>
                        <li className="text-muted">{item.addressShip}</li>
                        <li className="text-muted">
                          <MDBIcon fas icon="phone-alt" /> {item.phone}
                        </li>
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol xl="4">
                      <p className="text-muted">HÓA ĐƠN</p>
                      <MDBTypography listUnStyled>
                        <li className="text-muted">
                          <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                          <span className="fw-bold ms-1">Mã:</span>#{item.id}
                        </li>
                        <li className="text-muted">
                          <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                          <span className="fw-bold ms-1">Ngày tạo hóa đơn: </span>{item.invoiceDate}
                        </li>
                        <li className="text-muted">
                          <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                          <span className="fw-bold ms-1">Trạng thái:</span>
                          <span className="badge bg-warning text-black fw-bold ms-1">
                            {item.status ? "Đã thanh toán" : "Chưa thanh toán"}
                          </span>
                        </li>
                      </MDBTypography>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="my-2 mx-1 justify-content-center">
                    <MDBTable striped borderless>
                      <MDBTableHead
                        className="text-white"
                        style={{ backgroundColor: "#84B0CA" }}
                      >
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tên sản phẩm</th>
                          <th scope="col">Số lượng</th>
                          <th scope="col">Giá</th>
                          <th scope="col">Tổng giá</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {invoiceDetails.map((item2) => {
                          if (item.id === item2.invoiceId) {
                            index++;
                            return (
                              <tr>
                                <th scope="row">{index}</th>
                                <td>{item2.product.clothes.name}</td>
                                <td>{item2.quantity}</td>
                                <td>{item2.unitPrice} VNĐ</td>
                                <td>{item2.quantity * item2.unitPrice} VNĐ</td>
                              </tr>
                            )
                          }
                        })}
                      </MDBTableBody>
                    </MDBTable>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol xl="8">
                      <p className="ms-3">
                        Xem lại thông tin trước khi thanh toán
                      </p>
                    </MDBCol>
                    <MDBCol xl="3">
                      <p className="text-black float-start">
                        <span className="text-black me-3"> Tổng tiền:</span>
                        <span style={{ fontSize: "25px" }}>{totals} VNĐ</span>
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol xl="10">
                      <p>Cảm ơn bạn đã mua hàng của bạn</p>
                    </MDBCol>
                    <MDBCol xl="2">
                      <MDBBtn
                        className="text-capitalize"
                        style={{ backgroundColor: "#60bdf3" }}
                      >
                        Thanh toán ngay
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          )
        }
      })}
    </>
  );
}