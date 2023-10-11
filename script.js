document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
});

function addOrder() {
    const tableNo = document.getElementById('tableNo').value;
    const dish = document.getElementById('dish').value;
    const price = document.getElementById('price').value;

    if (tableNo && dish && price) {
        const order = {
            tableNo,
            dish,
            price
        };

        // Use Axios to send the order to the backend
        axios.post('https://crudcrud.com/api/4155a8522b1b4fb6a700244e0b5282de/orders', order)
            .then(response => {
                // Data has been successfully added to the backend
                console.log('Order added:', response.data);

                // Clear the form
                document.getElementById('orderForm').reset();

                // Reload the order list
                loadOrders();
            })
            .catch(error => {
                console.error('Error adding order:', error);
            });
    } else {
        alert('Please fill in all fields.');
    }
}

function loadOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';

    // Use Axios to fetch orders from the backend
    axios.get('https://crudcrud.com/api/4155a8522b1b4fb6a700244e0b5282de/orders')
        .then(response => {
            const orders = response.data;

            // Display each order
            orders.forEach(order => {
                const orderItem = document.createElement('div');
                orderItem.classList.add('order-item');
                orderItem.innerHTML = `
                    <strong>Table No:</strong> ${order.tableNo} |
                    <strong>Dish:</strong> ${order.dish} |
                    <strong>Price:</strong> ${order.price} |
                    <button onclick="editOrder('${order._id}')">Edit</button>
                    <button onclick="deleteOrder('${order._id}')">Delete</button>
                `;
                orderList.appendChild(orderItem);
            });
        })
        .catch(error => {
            console.error('Error loading orders:', error);
        });
}


function editOrder(orderId) {
    // Use Axios to fetch the selected order from the backend
    axios.get(`https://crudcrud.com/api/4155a8522b1b4fb6a700244e0b5282de/orders/${orderId}`)
        .then(response => {
            const selectedOrder = response.data;

            // Set form values to selected order
            document.getElementById('tableNo').value = selectedOrder.tableNo;
            document.getElementById('dish').value = selectedOrder.dish;
            document.getElementById('price').value = selectedOrder.price;

            // Use Axios to delete the selected order from the backend
            axios.delete(`https://crudcrud.com/api/4155a8522b1b4fb6a700244e0b5282de/orders/${orderId}`)
                .then(() => {
                    console.log('Order deleted:', selectedOrder);

                    // Reload the order list
                    loadOrders();
                })
                .catch(error => {
                    console.error('Error deleting order:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching order for edit:', error);
        });
}

function deleteOrder(orderId) {
    // Use Axios to delete the selected order from the backend
    axios.delete(`https://crudcrud.com/api/4155a8522b1b4fb6a700244e0b5282de/orders/${orderId}`)
        .then(() => {
            console.log('Order deleted:', orderId);

            // Reload the order list
            loadOrders();
        })
        .catch(error => {
            console.error('Error deleting order:', error);
        });
}
