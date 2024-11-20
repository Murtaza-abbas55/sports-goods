import DrawerAppBar from "../components/Navbar";
import useFetchCartItems from "../hooks/useFetchCartItems";

function Cart() {
    const { cartProducts, setCartProducts } = useFetchCartItems();
    console.log(cartProducts);
    return (
        <>
            <DrawerAppBar />
            <h1>Cart Page</h1>
            <h1>My Cart</h1>
        </>
    );
}
export default Cart;
