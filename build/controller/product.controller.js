"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = __importDefault(require("../middlewares/ErrorHandler"));
const product_services_1 = __importDefault(require("../services/product.services"));
const MAX_LIMIT = 100;
const productControllers = {
    getProductById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const productId = req.params.id;
        if (!productId) {
            throw new ErrorHandler_1.default({
                message: 'Product Id is not provided',
                status: 400,
            });
        }
        const product = yield product_services_1.default.getProductById(productId);
        if (!product) {
            return res.send({
                product: null,
                message: 'Product not found',
            });
        }
        return res.send({ product });
    }),
    getProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { limit = '10', pageNumber = '1' } = req.query;
        limit = parseInt(limit) > MAX_LIMIT ? MAX_LIMIT : parseInt(limit);
        pageNumber = parseInt(pageNumber);
        return res.send({
            limit,
            pageNumber,
        });
    }),
    addProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const productData = req.body;
        const product = yield product_services_1.default.createProduct(productData, req.body.userId);
        return res.send(product);
    }),
    updateProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.send({ message: 'WIP' });
    }),
    deleteProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const productId = req.params.id;
        const product = yield product_services_1.default.deleteProduct(productId);
        if (product.deletedCount === 1) {
            return res.send({ message: 'Product deleted successfully' });
        }
        return res.send({ message: 'Product not found' });
    }),
};
exports.default = productControllers;
//# sourceMappingURL=product.controller.js.map