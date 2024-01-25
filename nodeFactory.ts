export interface TreeNode {
  content: number;
  left: null | TreeNode;
  right: null | TreeNode;
}

export function createTreeNode(
  content: number,
  left: null | TreeNode,
  right: null | TreeNode
): TreeNode {
  return {
    content,
    left,
    right,
  };
}
