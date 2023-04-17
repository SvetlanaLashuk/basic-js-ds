const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootElement = null;
  }

  root() {
    return this.rootElement;
  }

  add(data) {
    this.rootElement = addElement(this.rootElement, data);
    
    function addElement(node, data) {
      if (node === null) {
        return new Node(data);
      } 
      
      if (node.data === data) {
        return node;
      } 
      
      if (data > node.data) {
        node.right = addElement(node.right, data);
      } else {
        node.left = addElement(node.left, data);
      }

      return node;
    }
  }

  has(data) {
    return this.find(data) !== null ? true : false;
  }

  find(data) {
    return findElement(this.rootElement, data);

    function findElement(node, data) {
      if (node === null) {
        return null;
      }

      if(node.data === data) {
        return node;
      }

      if (data > node.data) {
        return findElement(node.right, data);
      } else {
        return findElement(node.left, data);
      }
    }
  }

  remove(data) {
    this.rootElement = removeElement(this.rootElement, data);

    function removeElement(node, data) {
      if (node === null) {
        return null;
      }

      if (data > node.data) {
        node.right = removeElement(node.right, data);
        return node;
      } else if (data < node.data) {
        node.left = removeElement(node.left, data);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          return null;
        }

        if(node.left === null) {
          node = node.right;
          return node;
        }

        if(node.right === null) {
          node = node.left;
          return node;
        }

        let minRight = node.right;
        while(minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeElement(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootElement) {
      return null;
    } else {
      let minNode = this.rootElement;
      while(minNode.left) {
        minNode = minNode.left;
      }
      return minNode.data;
    }
  }

  max() {
    if (!this.rootElement) {
      return null;
    } else {
      let maxNode = this.rootElement;
      while(maxNode.right) {
        maxNode = maxNode.right;
      }
    return maxNode.data;
    }
  }
}

module.exports = {
  BinarySearchTree
};