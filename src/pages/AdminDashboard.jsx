import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Tag } from 'lucide-react';

function InventoryTable({ inventory, onDelete, onEdit }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  if (!inventory || inventory.length === 0) {
    return <p className="text-gray-500 mt-4">No inventory available. Add your first item!</p>;
  }

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="overflow-visible bg-white rounded shadow w-full">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Image</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Price</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
          <tbody className="divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img 
                    src={item.images?.[0] || item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{item.title}</td>
                <td className="px-4 py-2 text-sm text-gray-600 capitalize">{item.category}</td>
                <td className="px-4 py-2 text-sm text-gray-800">${item.price.toLocaleString()}</td>
                <td className="px-4 py-2 text-sm">
                  <div className="relative">
                    <button
                      id={`menu-${item.id}`}
                      onClick={() => toggleMenu(item.id)}
                      className="text-gray-600 hover:text-gray-900 p-2"
                    >
                      . . .
                    </button>
                  </div>

                  {openMenuId === item.id && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setOpenMenuId(null)}
                      />

                      {/* Menu - using fixed positioning */}
                      <div 
                        className="fixed bg-white rounded-lg shadow-xl border z-50 w-48"
                        style={{
                          top: `${document.getElementById(`menu-${item.id}`)?.getBoundingClientRect().bottom}px`,
                          right: '20px'
                        }}
                      >
                        <button
                          onClick={() => {
                            onEdit(item);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-gray-700 rounded-t-lg"
                        >
                          Edit Listing
                        </button>
                        
                        <a
                          href={`/vehicle/${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-gray-700"
                          onClick={() => setOpenMenuId(null)}
                        >
                          View Details
                        </a>
                        <button
                          onClick={() => {
                            onDelete(item.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-red-600 rounded-b-lg"
                        >
                          Delete Listing
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddInventoryDialog({ isOpen, onClose, onAdd, editingItem, onUpdate }) {
  const [formData, setFormData] = useState({
    title: editingItem?.title || '',
    category: editingItem?.category || 'boats',
    price: editingItem?.price || '',
    description: editingItem?.description || '',
    images: editingItem?.images || []
  });
  
  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title,
        category: editingItem.category,
        price: editingItem.price,
        description: editingItem.description || '',
        images: editingItem.images || []
      });
    } else {
      setFormData({
        title: '',
        category: 'boats',
        price: '',
        description: '',
        images: []
      });
    }
  }, [editingItem, isOpen]);
  
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);

      // Upload all files
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
          .from('vehicle-images')
          .upload(filePath, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(filePath);

        return publicUrl;
      });

      // Wait for all uploads to complete
      const uploadedUrls = await Promise.all(uploadPromises);

      console.log('All uploads successful:', uploadedUrls);

      // Add all URLs to images array
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));

    } catch (error) {
      console.error('Upload error:', error);
      alert('Some images failed to upload. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleMoveImage = (index, direction) => {
    const newImages = [...formData.images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newImages.length) {
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      setFormData(prev => ({ ...prev, images: newImages }));
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.price) {
      alert('Please fill in title and price');
      return;
    }

    if (editingItem) {
      const updatedItem = {
        ...editingItem,
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        images: formData.images.length > 0 ? formData.images : [editingItem.image],
        image: formData.images.length > 0 ? formData.images[0] : editingItem.image
      };
      onUpdate(updatedItem);
    } else {
      const newItem = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400'],
        image: formData.images.length > 0 ? formData.images[0] : 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400'
      };
      onAdd(newItem);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl mx-4 flex gap-6 max-h-[90vh] overflow-y-auto">
        <div className="w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {editingItem ? 'Edit' : 'Add'} Inventory
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2023 Sea Ray Boat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Boats">Boats</option>
                <option value="RVs">RVs</option>
                <option value="Trailers">Trailers</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price * ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="28500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter vehicle details, features, condition, etc..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images ({formData.images.length})
              </label>
              
              <div className="mb-3">
                <label className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors font-medium text-gray-700 cursor-pointer block text-center">
                  {uploading ? 'Uploading...' : '📷 Add Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                    multiple={true}
                  />
                </label>
              </div>

              {formData.images.length > 0 && (
                <div className="space-y-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded bg-gray-50">
                      <img src={img} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1 text-sm text-gray-600 truncate">
                        Image {index + 1}
                        {index === 0 && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Main</span>}
                      </div>
                      <div className="flex gap-1">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => handleMoveImage(index, 'up')}
                            className="px-2 py-1 text-sm border rounded hover:bg-gray-200"
                          >
                            ↑
                          </button>
                        )}
                        {index < formData.images.length - 1 && (
                          <button
                            type="button"
                            onClick={() => handleMoveImage(index, 'down')}
                            className="px-2 py-1 text-sm border rounded hover:bg-gray-200"
                          >
                            ↓
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="px-2 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
            >
              {editingItem ? 'Update' : 'Add to'} Inventory
            </button>
          </div>
        </div>

        <div className="w-1/2 border-l pl-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Live Preview</h3>
          <div className="bg-white shadow rounded overflow-hidden">
            <div className="h-44 bg-slate-100 flex items-center justify-center">
              {formData.images.length > 0 ? (
                <img src={formData.images[0]} alt="Preview" className="object-cover h-full w-full" />
              ) : (
                <div className="text-slate-400">No image</div>
              )}
            </div>
            <div className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-semibold text-gray-900">
                    ${formData.price ? parseFloat(formData.price).toLocaleString() : '0'}
                  </div>
                  <div className="font-semibold text-gray-900">
                    {formData.title || 'Vehicle Title'}
                  </div>
                </div>
                <div className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700">
                  {formData.category}
                </div>
              </div>
              {formData.description && (
                <div className="text-xs text-slate-600 mt-2 line-clamp-3">
                  {formData.description}
                </div>
              )}
            </div>
          </div>
          
          {formData.images.length > 1 && (
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">All Images ({formData.images.length})</div>
              <div className="grid grid-cols-3 gap-2">
                {formData.images.map((img, index) => (
                  <img key={index} src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-20 object-cover rounded border" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const handleLogout = async () => {
    console.log('LOGOUT CALLED');
    await supabase.auth.signOut();
    navigate('/login');
  };

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch inventory from Supabase on component mount
  useEffect(() => {
    fetchInventory();
  }, []);
  
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setInventory(data || []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      alert('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddInventory = async (newItem) => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .insert([{
          title: newItem.title,
          category: newItem.category,
          price: newItem.price,
          description: newItem.description,
          image: newItem.image,
          images: newItem.images
        }])
        .select();
      
      if (error) throw error;
      
      fetchInventory();
    } catch (error) {
      console.error('Error adding inventory:', error);
      alert('Failed to add inventory');
    }
  };
  
  const handleEditInventory = (item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleUpdateInventory = async (updatedItem) => {
    try {
      const { error } = await supabase
        .from('inventory')
        .update({
          title: updatedItem.title,
          category: updatedItem.category,
          price: updatedItem.price,
          description: updatedItem.description,
          image: updatedItem.image,
          images: updatedItem.images
        })
        .eq('id', updatedItem.id);
      
      if (error) throw error;
      
      fetchInventory();
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating inventory:', error);
      alert('Failed to update inventory');
    }
  };

  const handleDeleteInventory = async (itemId) => {
    setDeleteConfirm(itemId);
  };

  const confirmDelete = async () => {
    if (deleteConfirm !== null) {
      try {
        const { error } = await supabase
          .from('inventory')
          .delete()
          .eq('id', deleteConfirm);

        if (error) throw error;

        // Refresh the inventory list
        fetchInventory();
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Error deleting inventory:', error);
        alert('Failed to delete inventory');
      }
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

   return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              <span>← Back to Store</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Dealer Dashboard</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 font-medium text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-8 py-8 w-full">
        <div className="w-full">
          {/* Inventory Management Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Inventory Management</h2>
                <p className="text-gray-600 mt-1">Manage your boats, RVs, trailers, and other listings.</p>
              </div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium flex items-center gap-2"
              >
                <Tag size={16} /> Create New Listing
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{inventory.length}</div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {inventory.filter(i => i.category === 'Boats').length}
                </div>
                <div className="text-sm text-gray-600">Boats</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {inventory.filter(i => i.category === 'RVs').length}
                </div>
                <div className="text-sm text-gray-600">RVs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {inventory.filter(i => i.category === 'Trailers').length}
                </div>
                <div className="text-sm text-gray-600">Trailers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {inventory.filter(i => i.category === 'Other').length}
                </div>
                <div className="text-sm text-gray-600">Other</div>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading inventory...</p>
            </div>
          ) : (
            <InventoryTable inventory={inventory} onDelete={handleDeleteInventory} onEdit={handleEditInventory} />
          )}
        </div>
      </div>

      {/* Dialogs */}
      <AddInventoryDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingItem(null);
        }}
        onAdd={handleAddInventory}
        editingItem={editingItem}
        onUpdate={handleUpdateInventory}
      />

      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this item?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
