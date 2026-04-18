const BaseNormalizer = require("./base.normalizer");

class ProductNormalizer extends BaseNormalizer {
    static normalize(product) {
        let obj = {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            desc: product.desc,
            code: product.code,
            surface: product.surface,
            size: product.size,
            color: product.color,
            form: product.form,
            property: product.property,
            maker: product.maker,
            country: product.country,
            pic_face: product.pic_face,
            inbox: product.inbox,
            weight: product.weight,
            use: product.use,
            discount: product.discount,
            material:product.material,
            in_hand:product.in_hand,

            url: product.url
        };

        if (product.type) {
            const type = Array.isArray(product.type) ? product.type[0] : product.type;
            obj.type = {
                id: type._id,
                name: type.name,
                url: type.url
            }
        }

        return obj;
    }
}

module.exports = ProductNormalizer;