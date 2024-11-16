import useFetch from "../hooks/useFetch";

function ProductListing() {
    const { products, loading, error } = useFetch("/api/products");
    if (loading) return <p>loading</p>;
    if (error) return <p>error</p>;
    console.log(products);

    return (
        <>
            <h1>Product Lisitng</h1>
            <p>These are my products</p>
            {products.map((product) => (
                <div key={product.product_id}>{product.name}</div>
            ))}
        </>
    );
}
export default ProductListing;
