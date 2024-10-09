import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderContext";

const SummaryPage = ({ setStep }) => {
  const [orderDetails] = useContext(OrderContext);
  const [checked, setChecked] = useState(false);

  const productArray = Array.from(orderDetails.products);
  const productList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions = orderDetails.options.size > 0;
  let optionDisplay = null;
  if (hasOptions) {
    const optionsArray = Array.from(orderDetails.options.keys());
    const optionsList = optionsArray.map((key) => <li key={key}>{key}</li>);
    optionDisplay = (
      <>
        <h2>옵션: {orderDetails.totals.options}원</h2>
        <ul>{optionsList}</ul>
      </>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDetails.totals.products}원</h2>
      <ul>{productList}</ul>
      <div>{optionDisplay}</div>
      <h1>총 가격: {orderDetails.totals.total}원</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          id="confirm-checkbox"
        />{" "}
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type="submit">
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
