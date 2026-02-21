import styles from "./ProductCard.module.css"

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

const shortDescription = (description) => {
    if(description.length > 40){
        return(
            <p className={styles.description}>{description.slice(0, 40)}... <span className={styles.descriptionMore}>See more</span></p>
        )
    }else{
        return (
        <p className={styles.description}>{description}</p>
        )
    }
}

export function ProductCard({product}){
    console.log(product)

    return (
        <div className={styles.productCard}>
            <div>
                <img src={product.images[0]} alt={product.title} />
                <h3>{product.title}</h3>
                {shortDescription(product.description)}
            </div>

            <div className={styles.priceContainer}>
                <p className={styles.price}>{formatPrice(product.price)}</p>
                <button className={styles.addToCartBtn}>Add to Cart</button>
            </div>
        </div>
    )
}