const generateProductsRows = (items) => {
    let subtotal = 0;
    let discountTotal = 0;

    const rows = items.map(item => {
        const baseTotal = item.price * item.quantity;
        const discount = baseTotal * 0.10;
        const finalTotal = baseTotal - discount;

        subtotal += baseTotal;
        discountTotal += discount;

        return `
        <tr>
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>${item.price} ₽</td>
            <td>${finalTotal.toFixed(0)} ₽</td>
        </tr>
        `;
    }).join('');

    return { rows, subtotal, discountTotal };
};

const orderEmailTemplate = (order, config) => {
    const { rows, subtotal, discountTotal } = generateProductsRows(order.items);

    const deliveryCost =
        order.deliveryType === config.deliveryTypes.delivery
            ? config.deliveryCost
            : 0;

    const total = subtotal - discountTotal + deliveryCost;

    return `
        <h2>Спасибо за заказ</h2>
        <p>${order.firstName}</p>

        <table border="1">
            ${rows}
        </table>

        <p>Скидка: ${discountTotal} ₽</p>
        <p>Доставка: ${deliveryCost} ₽</p>
        <h3>Итого: ${total} ₽</h3>
    `;
};

module.exports = { orderEmailTemplate };