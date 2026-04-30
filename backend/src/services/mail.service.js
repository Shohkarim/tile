const { orderEmailTemplate } = require('../templates/order-email.template');
const { transporter } = require('../config/mail.config');
const config = require('../config/config');

const sendOrderEmail = async (order) => {
    const html = orderEmailTemplate(order, config);

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: order.email,
        subject: 'Ваш заказ оформлен',
        html,
    });
};

module.exports = { sendOrderEmail };