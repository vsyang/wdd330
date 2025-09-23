import { getLocalStorage, setLocalStorage, updateCartBadge } from "./utils.mjs";
export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
        this.selectedColorIdx = 0;
    }

    // Initialize product details
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.selectedColorIdx = 0;
        this.renderProductDetails();
        document.getElementById("addToCart").addEventListener("click", () => this.addProductToCart());
    }

    // Render product details to the page
    async renderProductDetails() {
        productDetailsTemplate(this.product, this.selectedColorIdx, (idx) => {
            this.selectedColorIdx = idx;
            this.renderProductDetails();
        });
    }

    // Add product to cart in localStorage
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        const existingItem = cartItems.find(item => item.Id === this.product.Id && item.SelectedColorIdx === this.selectedColorIdx);
        if (existingItem) {
            existingItem.Quantity = (existingItem.Quantity || 1) + 1;
        } else {
            const cartProduct = {
                ...this.product,
                Quantity: 1,
                SelectedColorIdx: this.selectedColorIdx,
                SelectedColor: this.product.Colors[this.selectedColorIdx]
            };
            cartItems.push(cartProduct);
        }
        setLocalStorage("so-cart", cartItems);
        updateCartBadge();
    }
}

// Template function to render product details
function productDetailsTemplate(product, selectedColorIdx = 0, onColorSelect) {
    document.getElementById("productBrand").textContent = product.Brand.Name;
    document.getElementById("productName").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;

    const price = document.getElementById('productPrice');
    const originalPrice = product.SuggestedRetailPrice;
    const finalPrice = product.FinalPrice;

    let priceHtml = "";

    if (finalPrice < originalPrice) {
        const discountPercent = Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
        priceHtml = `
        <div class="price-block">
            <p>Original Price: <span class="original-price">$${originalPrice.toFixed(2)}</span></p>
            <p class="discount">Save ${discountPercent}%</p>
            <p><span class="final-price">Sale Price $${finalPrice.toFixed(2)}</span></p>
            </div>
        `;
    } else {
        priceHtml = `<span class="final-price">$${finalPrice.toFixed(2)}</span>`;
    }

    price.innerHTML = priceHtml;

    // Render swatches
    const swatchContainer = document.getElementById('productSwatches');
    if (swatchContainer) {
        swatchContainer.innerHTML = '';
        if (product.Colors && product.Colors.length > 1) {
            product.Colors.forEach((color, idx) => {
                const swatch = document.createElement('div');
                swatch.className = 'swatch' + (idx === selectedColorIdx ? ' selected' : '');
                swatch.title = color.ColorName;
                if (color.ColorChipImageSrc) {
                    swatch.innerHTML = `<img src="${color.ColorChipImageSrc}" alt="${color.ColorName}">`;
                } else {
                    swatch.style.background = color.ColorHex || '#eee';
                }
                swatch.addEventListener('click', () => {
                    if (onColorSelect) {
                        onColorSelect(idx);
                        productImage.src = product.Colors[idx]?.ColorPreviewImageSrc;
                    }
                });
                swatchContainer.appendChild(swatch);
            });
            swatchContainer.style.display = 'flex';
        } else {
            swatchContainer.style.display = 'none';
        }
    }

    // Update color name and description
    document.getElementById('productColor').textContent = product.Colors[selectedColorIdx]?.ColorName || '';
    document.getElementById('productDescription').innerHTML = product.DescriptionHtmlSimple;
}
