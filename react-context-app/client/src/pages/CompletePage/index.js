import React, { useContext, useEffect, useState } from "react";
import ErrorBanner from "../../components/ErrorBanner";
import axios from "axios";
import { OrderContext } from "../../context/OrderContext";

const CompletePage = ({ setStep }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const orderData = useContext(OrderContext);

  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData]);

  const orderCompleted = async (orderData) => {
    try {
      let response = await axios.post(`http://localhost:4000/order`, orderData[0]);
      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  const orderTable = orderHistory.map((item, key) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}원</td>
    </tr>
  ));

  if (error) return <ErrorBanner message="에러가 발생했습니다." />;

  if (loading) return <div>Loading...</div>;
  else {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>주문이 성공했습니다.</h2>
        <h3>지금까지 모든 주문</h3>
        <br />
        <table style={{ margin: "auto" }}>
          <tbody>
            <tr>
              <th>주문번호</th>
              <th>가격</th>
            </tr>
            {orderTable}
          </tbody>
        </table>
        <br />
        <button onClick={() => setStep(0)}>처음으로</button>
      </div>
    );
  }
};

export default CompletePage;
