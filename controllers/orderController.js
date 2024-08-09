const { shopifyAdmin } = require('../config/shopifyConfig');

exports.createOrder = async (req, res) => {
  const { line_items } = req.body;

  try {
    const order = {
      line_items: line_items.map(item => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
        properties: item.productType.includes('pre-order') ? [{ name: 'Pre-order', value: 'true' }] : []
      })),
      note: 'This is a pre-order'
    };

    const response = await shopifyAdmin.post('/admin/api/2021-07/orders.json', { order });

    res.status(200).json({ success: true, order: response.data.order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
