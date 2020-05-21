import history from "../history";
import config from "../config/config";

function isDef(v) {
  return v !== undefined && v !== null;
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

const stack = [];

function getIndexByKey(key) {
  for (let index = 0; index < stack.length; index++) {
    if (stack[index].key === key) {
      return index;
    }
  }
  return -1;
}

let VuePageStack = (keyName) => {
  return {
    name: config.componentName,
    abstract: true,
    data() {
      return {};
    },
    props: {
      max: {
        type: [String, Number],
        default() {
          return "";
        },
      },
    },
    render() {
      let key = this.$route.query[keyName];
      const slot = this.$slots.default;
      const vnode = getFirstComponentChild(slot);
      if (!vnode) {
        return vnode;
      }
      let index = getIndexByKey(key);
      if (index !== -1) {
        vnode.componentInstance = stack[index].vnode.componentInstance;
        //销毁将要拼接的实例
        for (let i = index + 1; i < stack.length; i++) {
          stack[i].vnode.componentInstance.$destroy();
          stack[i] = null;
        }
        stack.splice(index + 1);
      } else {
        if (history.action === config.replaceName) {
          // 销毁实例
          stack[stack.length - 1].vnode.componentInstance.$destroy();
          stack[stack.length - 1] = null;
          stack.splice(stack.length - 1);
        }
        stack.push({ key, vnode });
      }
      vnode.data.keepAlive = true;
      return vnode;
    },
  };
};

function getStack() {
  return stack;
}

export { VuePageStack, getIndexByKey, getStack };
