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

    // Images carousel
    const carouselContainer = document.getElementById('productCarousel');
    if (carouselContainer) {
        // Put together main image and extras
        const images = [product.Colors[selectedColorIdx]?.ColorPreviewImageSrc || product.Images.PrimaryLarge, 
        ...(product.Images.ExtraImages.map(img => img.Src) || [])];
        let currentIdx = 0;
        // If it already exists, get the current index
        if (carouselContainer.dataset.currentIdx) {
            currentIdx = parseInt(carouselContainer.dataset.currentIdx) || 0;
        }
        // Clear the container
        carouselContainer.innerHTML = '';
        // Main image
        const mainImg = document.createElement('img');
        mainImg.className = 'carousel-main-image';
        mainImg.src = images[currentIdx];
        mainImg.alt = product.NameWithoutBrand;
        carouselContainer.appendChild(mainImg);

        // Arrows
        if (images.length > 1) {
            const left = document.createElement('button');
            left.type = 'button';
            left.className = 'carousel-arrow left';
            left.innerHTML = '&#129152;';
            left.onclick = () => {
                let idx = currentIdx - 1;
                if (idx < 0) idx = images.length - 1;
                carouselContainer.dataset.currentIdx = idx;
                productDetailsTemplate(product, selectedColorIdx, onColorSelect);
            };
            carouselContainer.appendChild(left);

            const right = document.createElement('button');
            right.type = 'button';
            right.className = 'carousel-arrow right';
            right.innerHTML = '&#129154;';
            right.onclick = () => {
                let idx = currentIdx + 1;
                if (idx >= images.length) idx = 0;
                carouselContainer.dataset.currentIdx = idx;
                productDetailsTemplate(product, selectedColorIdx, onColorSelect);
            };
            carouselContainer.appendChild(right);
        }

        // Thumbnails
        if (images.length > 1) {
            const thumbs = document.createElement('div');
            thumbs.className = 'carousel-thumbs';
            images.forEach((img, idx) => {
                const thumb = document.createElement('img');
                thumb.className = 'carousel-thumb' + (idx === currentIdx ? ' selected' : '');
                thumb.src = img;
                thumb.alt = `thumb ${idx+1}`;
                thumb.onclick = () => {
                    carouselContainer.dataset.currentIdx = idx;
                    productDetailsTemplate(product, selectedColorIdx, onColorSelect);
                };
                thumbs.appendChild(thumb);
            });
            carouselContainer.appendChild(thumbs);
        }
        // Save the current index
        carouselContainer.dataset.currentIdx = currentIdx;
    }

    // Price
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
                    if (onColorSelect) onColorSelect(idx);
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
