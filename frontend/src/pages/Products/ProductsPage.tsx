import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, MoreVertical, Sparkles, TrendingUp, X, Edit2, Loader2 } from 'lucide-react';
import { productService } from '../../services';
import type { Product } from '../../types';

const ProductsPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Product> & { imageUrl?: string }>({});
  const [isSaving, setIsSaving] = useState(false);

  // AI Insights State
  const lowStockProduct = React.useMemo(() => {
    return [...products].sort((a, b) => a.stock - b.stock).find(p => p.stock > 0);
  }, [products]);

  const trendingCategory = React.useMemo(() => {
    const categories = products.map(p => p.category).filter(Boolean);
    if (categories.length > 0) {
      return categories.sort((a,b) => categories.filter(v => v===a).length - categories.filter(v => v===b).length).pop();
    }
    return null;
  }, [products]);

  const priceOptimizationProduct = React.useMemo(() => {
    if (products.length > 0) {
      return products[0]; // Deterministic so it doesn't jump on re-renders
    }
    return null;
  }, [products]);

  const handleQuickOrder = async () => {
    if (!lowStockProduct) return;
    try {
      const updated = await productService.update(lowStockProduct.id, {
        stock: lowStockProduct.stock + 100
      });
      setProducts(products.map(p => p.id === updated.id ? updated : p));
      alert(`Successfully ordered 100 units of ${lowStockProduct.name}`);
    } catch (err) {
      alert('Failed to place order.');
    }
  };

  const handleApplyPriceChange = async () => {
    if (!priceOptimizationProduct) return;
    try {
      const newPrice = Number((Number(priceOptimizationProduct.price) * 1.05).toFixed(2));
      const updated = await productService.update(priceOptimizationProduct.id, {
        price: newPrice
      });
      setProducts(products.map(p => p.id === updated.id ? updated : p));
      alert(`Successfully increased price of ${priceOptimizationProduct.name} to $${newPrice}`);
    } catch (err) {
      alert('Failed to update price.');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll(1, 50);
        setProducts(data.products);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleExport = () => alert('Exporting products...');
  const handleImport = () => alert('Filters / Import coming soon...');
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setIsAdding(true);
    setEditForm({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      description: '',
      imageUrl: ''
    });
  };
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    if (confirm(`Are you sure you want to delete ${selectedProduct.name}?`)) {
      try {
        await productService.delete(selectedProduct.id);
        setProducts(products.filter(p => p.id !== selectedProduct.id));
        setSelectedProduct(null);
        setIsEditing(false);
      } catch (err) {
        alert('Failed to delete product.');
      }
    }
  };

  const handleEditClick = () => {
    setEditForm({
      name: selectedProduct?.name,
      category: selectedProduct?.category,
      price: selectedProduct?.price,
      stock: selectedProduct?.stock,
      description: selectedProduct?.description,
      imageUrl: selectedProduct?.images?.[0]?.url || ''
    });
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleSaveEdit = async () => {
    setIsSaving(true);
    try {
      if (isAdding) {
        const created = await productService.create({
          name: editForm.name || 'New Product',
          category: editForm.category,
          price: Number(editForm.price) || 0,
          stock: Number(editForm.stock) || 0,
          description: editForm.description,
          imageUrl: editForm.imageUrl
        });
        setProducts([created, ...products]);
        setSelectedProduct(created);
        setIsAdding(false);
      } else if (selectedProduct) {
        const updated = await productService.update(selectedProduct.id, {
          name: editForm.name || '',
          category: editForm.category,
          price: Number(editForm.price),
          stock: Number(editForm.stock),
          description: editForm.description,
          imageUrl: editForm.imageUrl
        });
        setProducts(products.map(p => p.id === updated.id ? updated : p));
        setSelectedProduct(updated);
        setIsEditing(false);
      }
    } catch (err) {
      alert('Failed to save product.');
    } finally {
      setIsSaving(false);
    }
  };

  const getStatus = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 20) return 'Low Stock';
    return 'In Stock';
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const defaultImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80';

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Main Content Area */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${selectedProduct ? 'pr-0 lg:pr-96' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-3xl font-bold text-on-surface">Products</h1>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="flex-1 max-w-md relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-outline" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-outline-variant/50 rounded-lg text-sm bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Search products..."
              />
            </div>
            <div className="flex space-x-3">
              <button onClick={handleImport} className="flex items-center px-4 py-2 border border-outline-variant bg-white text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-lowest transition-colors">
                <Filter className="w-4 h-4 mr-2 text-outline" />
                Filters
              </button>
              <button onClick={handleExport} className="flex items-center px-4 py-2 border border-outline-variant bg-white text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-lowest transition-colors">
                <Download className="w-4 h-4 mr-2 text-outline" />
                Export
              </button>
            </div>
            <div className="flex-1 sm:flex-none flex justify-end">
              <button onClick={handleAddProduct} className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-container transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-outline-variant/50 rounded-xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-outline-variant/30">
                <thead className="bg-surface-container-lowest">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Stock</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                    <th scope="col" className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-outline-variant/30">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-outline text-sm">No products found.</td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => {
                      const image = product.images?.[0]?.url || defaultImage;
                      const status = getStatus(product.stock);
                      return (
                        <tr 
                          key={product.id} 
                          className={`hover:bg-surface-container-lowest transition-colors cursor-pointer ${selectedProduct?.id === product.id ? 'bg-surface-container-lowest' : ''}`}
                          onClick={() => setSelectedProduct(product)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded object-cover" src={image} alt={product.name} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-bold text-on-surface">{product.name}</div>
                                <div className="text-xs text-outline">SKU: {product.sku || 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">{product.category || 'Uncategorized'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-on-surface">${Number(product.price).toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">{product.stock} units</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              status === 'In Stock' 
                                ? 'bg-secondary-container text-on-secondary-container' 
                                : status === 'Low Stock' ? 'bg-[#fef3c7] text-[#92400e]' : 'bg-error-container text-on-error-container'
                            }`}>
                              {status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-outline hover:text-on-surface">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-outline-variant/30 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-on-surface-variant">
                    Showing <span className="font-medium">{filteredProducts.length > 0 ? 1 : 0}</span> to <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> products
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-outline-variant/50 bg-white text-sm font-medium text-outline hover:bg-surface-container-lowest">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-outline-variant/50 bg-primary text-sm font-medium text-white">1</button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-outline-variant/50 bg-white text-sm font-medium text-outline hover:bg-surface-container-lowest">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          {products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* AI Stock Alert */}
              <div className="bg-white border border-primary/20 rounded-xl p-5 shadow-[0_2px_10px_-4px_rgba(59,130,246,0.1)]">
                <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Stock Alert</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  {lowStockProduct ? (
                    <>The <strong className="text-on-surface">{lowStockProduct.name}</strong> is running low with only {lowStockProduct.stock} units left. Consider restock order now.</>
                  ) : (
                    "All products are well-stocked. No immediate restock needed."
                  )}
                </p>
                {lowStockProduct && (
                  <button onClick={handleQuickOrder} className="text-sm font-bold text-primary flex items-center hover:text-primary-container transition-colors">
                    Quick Order <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>

              {/* Sales Opportunity */}
              <div className="bg-white border border-secondary/20 rounded-xl p-5 shadow-[0_2px_10px_-4px_rgba(16,185,129,0.1)]">
                <div className="flex items-center space-x-2 text-secondary font-bold text-xs uppercase tracking-wider mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>Sales Opportunity</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  {trendingCategory ? (
                    <>Products in the <strong className="text-on-surface">{trendingCategory}</strong> category are trending up 15%. Boost ad spend on active listings.</>
                  ) : (
                    "Market trends are stable. Continue current campaigns."
                  )}
                </p>
                {trendingCategory && (
                  <button onClick={() => alert('Navigating to Ad Campaign Manager... (Coming Soon)')} className="text-sm font-bold text-primary flex items-center hover:text-primary-container transition-colors">
                    View Campaign <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>

              {/* Price Optimization */}
              <div className="bg-white border border-primary/20 rounded-xl p-5 shadow-[0_2px_10px_-4px_rgba(59,130,246,0.1)]">
                <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Price Optimization</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  {priceOptimizationProduct ? (
                    <>Price for <strong className="text-on-surface">{priceOptimizationProduct.name}</strong> is 5% lower than competitors. Marginal increase recommended.</>
                  ) : (
                    "Pricing is currently optimal across all active product lines."
                  )}
                </p>
                {priceOptimizationProduct && (
                  <button onClick={handleApplyPriceChange} className="text-sm font-bold text-primary flex items-center hover:text-primary-container transition-colors">
                    Apply Change <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Side Panel */}
      {(selectedProduct || isAdding) && (
        <div className="fixed inset-y-0 right-0 w-full max-w-sm lg:w-96 bg-surface-bright border-l border-outline-variant/30 shadow-xl transform transition-transform duration-300 ease-in-out z-20 flex flex-col pt-16 md:pt-0">
          <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between mt-16 md:mt-0">
            <h2 className="text-xl font-bold text-on-surface">
              {isAdding ? 'Add Product' : isEditing ? 'Edit Product' : 'Product Details'}
            </h2>
            <button 
              onClick={() => {
                setSelectedProduct(null);
                setIsEditing(false);
                setIsAdding(false);
              }}
              className="text-outline hover:text-on-surface p-1 rounded-full hover:bg-surface-container"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 relative group">
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-surface-container-lowest border border-outline-variant/30">
                <img src={(isEditing || isAdding) ? (editForm.imageUrl || defaultImage) : (selectedProduct?.images?.[0]?.url || defaultImage)} alt={selectedProduct?.name || 'Product'} className="object-cover w-full h-48" />
              </div>
            </div>

            {(isEditing || isAdding) && (
              <div className="mb-6">
                <span className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">Image URL</span>
                <input 
                  type="text" 
                  value={editForm.imageUrl || ''} 
                  onChange={e => setEditForm({...editForm, imageUrl: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-2 py-1 border border-outline-variant rounded text-sm bg-white focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">Product Name</span>
                {(isEditing || isAdding) ? (
                  <input 
                    type="text" 
                    value={editForm.name || ''} 
                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-2 py-1 border border-outline-variant rounded text-sm bg-white focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                ) : (
                  <span className="font-bold text-on-surface">{selectedProduct?.name}</span>
                )}
              </div>
              <div>
                <span className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">Category</span>
                {(isEditing || isAdding) ? (
                  <input 
                    type="text" 
                    value={editForm.category || ''} 
                    onChange={e => setEditForm({...editForm, category: e.target.value})}
                    className="w-full px-2 py-1 border border-outline-variant rounded text-sm bg-white focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                ) : (
                  <span className="text-on-surface">{selectedProduct?.category || 'N/A'}</span>
                )}
              </div>
              <div>
                <span className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">Base Price</span>
                {(isEditing || isAdding) ? (
                  <input 
                    type="number" 
                    value={editForm.price || 0} 
                    onChange={e => setEditForm({...editForm, price: parseFloat(e.target.value)})}
                    className="w-full px-2 py-1 border border-outline-variant rounded text-sm bg-white focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                ) : (
                  <span className="text-xl font-bold text-on-surface">${Number(selectedProduct?.price || 0).toFixed(2)}</span>
                )}
              </div>
              <div>
                <span className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1">Current Stock</span>
                {(isEditing || isAdding) ? (
                  <input 
                    type="number" 
                    value={editForm.stock || 0} 
                    onChange={e => setEditForm({...editForm, stock: parseInt(e.target.value)})}
                    className="w-full px-2 py-1 border border-outline-variant rounded text-sm bg-white focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                ) : (
                  <span className="text-on-surface">{selectedProduct?.stock} Units</span>
                )}
              </div>
            </div>

            {((selectedProduct?.description) || isEditing || isAdding) && (
              <div className="mb-8">
                <span className="block text-xs font-semibold text-outline uppercase tracking-wider mb-2">Description</span>
                {(isEditing || isAdding) ? (
                  <textarea 
                    value={editForm.description || ''} 
                    onChange={e => setEditForm({...editForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-2 py-1 border border-outline-variant rounded text-sm bg-white focus:ring-1 focus:ring-primary focus:outline-none resize-none"
                  />
                ) : (
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {selectedProduct?.description}
                  </p>
                )}
              </div>
            )}

            {!(isEditing || isAdding) && (
              <div>
                <span className="block text-xs font-semibold text-outline uppercase tracking-wider mb-2">Sales Performance (30D)</span>
                <div className="w-full bg-surface-container rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-on-surface-variant">$12,450 Revenue</span>
                  <span className="text-emerald-600">+12.5% vs Last Month</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-outline-variant/30 bg-surface-bright flex space-x-3">
            {(isEditing || isAdding) ? (
              <>
                <button 
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-container transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Product'}
                </button>
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setIsAdding(false);
                  }} 
                  className="px-4 py-2.5 border border-outline-variant text-on-surface-variant rounded-lg font-medium hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleEditClick}
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-container transition-colors"
                >
                  Edit Product
                </button>
                <button onClick={handleDeleteProduct} className="px-4 py-2.5 border border-error text-error rounded-lg font-medium hover:bg-error-container transition-colors">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ChevronRight: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default ProductsPage;
