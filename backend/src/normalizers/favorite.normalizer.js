const BaseNormalizer = require("./base.normalizer");

class FavoriteNormalizer extends BaseNormalizer {
    static normalize(favorite) {
        return {
            id: favorite.product.id,
            name: favorite.product.name,
            url: favorite.product.url,
            image: favorite.product.image,
            price: favorite.product.price,
            in_hand: favorite.product.in_hand
        };
    }
}

module.exports = FavoriteNormalizer;