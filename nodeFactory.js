"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTreeNode = void 0;
function createTreeNode(content, left, right) {
    return {
        content,
        left,
        right,
    };
}
exports.createTreeNode = createTreeNode;
