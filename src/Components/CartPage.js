// src/components/CartPage.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
} from "../features/cart/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  console.log(items)

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateCartItem({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div>
      <h2>سلة التسوق</h2>
      {items.map((item) => (
        <div key={item.product.id}>
          <h3>{item.product.name}</h3>
          <p>
            الكمية:
            <button
              onClick={() =>
                handleUpdateQuantity(item.product.id, item.quantity - 1)
              }
            >
              -
            </button>
            {item.quantity}
            <button
              onClick={() =>
                handleUpdateQuantity(item.product.id, item.quantity + 1)
              }
            >
              +
            </button>
          </p>
          <button onClick={() => handleRemoveItem(item.product.id)}>حذف</button>
        </div>
      ))}
      <h3>المجموع: {total} جنيه</h3>
    </div>
  );
}
