"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const ShoppingList_1 = __importDefault(require("./ShoppingList"));
const Category_1 = __importDefault(require("./Category"));
let Product = class Product extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ShoppingList_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Product.prototype, "shoppingList_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ShoppingList_1.default),
    __metadata("design:type", ShoppingList_1.default)
], Product.prototype, "shoppingList", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Category_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Product.prototype, "category_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Category_1.default),
    __metadata("design:type", Category_1.default)
], Product.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "amount", void 0);
Product = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Products', timestamps: false })
], Product);
;
exports.default = Product;
