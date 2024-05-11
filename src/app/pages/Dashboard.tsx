import { CartContext } from "../providers/cartProvider";
import { Product } from "../components/Product";

export function Dashboard() {
  return (
    <div>
      <CartContext.Provider value={1}>
        <Product />
      </CartContext.Provider>
    </div>
  )
}