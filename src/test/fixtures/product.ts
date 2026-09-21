import type { Product } from '../../types/product';

export const createProduct = (overrides: Partial<Product> = {}): Product => {
	return {
		id: 1,
		title: 'Test Product',
		description: 'Test product description',
		category: 'test-category',
		price: 99.99,
		discountPercentage: 10,
		rating: 4.5,
		stock: 25,
		tags: ['test'],
		brand: 'Test Brand',
		sku: 'TEST-001',
		weight: 100,
		dimensions: {
			width: 10,
			height: 20,
			depth: 5,
		},
		warrantyInformation: '1 year warranty',
		shippingInformation: 'Ships in 3 days',
		availabilityStatus: 'In Stock',
		reviews: [],
		returnPolicy: '30 days return policy',
		minimumOrderQuantity: 1,
		meta: {
			createdAt: '2026-01-01T00:00:00.000Z',
			updatedAt: '2026-01-01T00:00:00.000Z',
			barcode: '123456789',
			qrCode: 'test-qr-code',
		},
		images: ['https://example.com/product.jpg'],
		thumbnail: 'https://example.com/product-thumbnail.jpg',
		...overrides,
	};
};
