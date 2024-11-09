// Helper function to trigger the custom 'cartUpdated' event
const triggerCartUpdateEvent = () => {
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
};

// Cart item type definition
export type CartItemType = {
    name: string;
    cost: number;
    id: string;
    stripe_priceid: string;
    quantity?: number;
};

// Type guard to validate if an unknown value is a CartItemType
const isCartItem = (item: unknown): item is CartItemType => {
    return (
        typeof item === 'object' &&
        item !== null &&
        'name' in item &&
        'cost' in item &&
        'id' in item &&
        'stripe_priceid' in item &&
        typeof (item as CartItemType).name === 'string' &&
        typeof (item as CartItemType).cost === 'number' &&
        typeof (item as CartItemType).id === 'string' &&
        typeof (item as CartItemType).stripe_priceid === 'string'
    );
};

// Function to get the current cart from localStorage
export const getCart = (): CartItemType[] => {
    const cartString = localStorage.getItem('cart') ?? '[]';
    try {
        const parsedData: unknown = JSON.parse(cartString);
        if (!Array.isArray(parsedData)) {
            return [];
        }
        return parsedData.filter(isCartItem);
    } catch {
        return [];
    }
};
    
// Function to add an item to the cart, ensuring no duplicates by id
export const addToCart = (newItem: CartItemType): void => {
    const cartData = getCart();

    // Check if the item already exists in the cart by id
    const itemExists = cartData.some(item => item.id === newItem.id);

    if (!itemExists) {
        cartData.push({
            ...newItem,
            quantity: 1,
        }); // Add new item with a quantity property
        localStorage.setItem('cart', JSON.stringify(cartData)); // Update localStorage
        triggerCartUpdateEvent(); // Trigger update event
    }
};

// Function to remove an item from the cart by index
export const removeFromCart = (itemIndex: number): void => {
    const cartData = getCart();
    cartData.splice(itemIndex, 1); // Remove item at index
    localStorage.setItem('cart', JSON.stringify(cartData)); // Update localStorage
    triggerCartUpdateEvent(); // Trigger update event
};

// Function to clear the cart
export const clearCart = (): void => {
    localStorage.removeItem('cart'); // Clear localStorage
    triggerCartUpdateEvent(); // Trigger update event
};