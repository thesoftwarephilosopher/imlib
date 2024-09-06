import * as babel from '@babel/core';

const t = babel.types;

const jsxSymbol = t.callExpression(
  t.memberExpression(
    t.identifier('Symbol'),
    t.identifier('for')
  ),
  [t.stringLiteral('jsx')],
);

export const babelPluginVanillaJSX: babel.PluginItem = {
  visitor: {
    JSXFragment: {
      enter: (path) => {
        const jsx = t.objectExpression([
          t.objectProperty(jsxSymbol, t.booleanLiteral(true), true),
          t.objectProperty(t.identifier('tag'), t.stringLiteral('')),
        ]);
        const attrs = t.objectExpression([]);
        pushChildren(jsx, path);
        if (attrs.properties.length > 0) {
          jsx.properties.push(t.objectProperty(t.identifier('attrs'), attrs));
        }
        path.replaceWith(jsx);
      },
    },
    JSXElement: {
      enter: (path) => {
        let name;
        const v = path.node.openingElement.name;

        if (v.type === 'JSXMemberExpression') name = convertMember(v);
        else if (v.type === 'JSXNamespacedName') name = t.stringLiteral(v.namespace.name + ':' + v.name.name);
        else if (v.name.match(/^[A-Z]/)) name = t.identifier(v.name);
        else name = t.stringLiteral(v.name);

        const jsx = t.objectExpression([
          t.objectProperty(jsxSymbol, t.booleanLiteral(true), true),
          t.objectProperty(t.identifier('tag'), name),
        ]);
        const attrs = t.objectExpression([]);

        if (path.node.openingElement.attributes.length > 0) {
          for (const attr of path.node.openingElement.attributes) {
            if (attr.type === 'JSXSpreadAttribute') {
              attrs.properties.push(t.spreadElement(attr.argument));
              continue;
            }

            let name;
            if (attr.name.type === 'JSXNamespacedName')
              name = t.stringLiteral(attr.name.namespace.name + ':' + attr.name.name.name);//lol
            else if (attr.name.name.match(/[^\w]/))
              name = t.stringLiteral(attr.name.name);
            else
              name = t.identifier(attr.name.name);

            let val;
            if (!attr.value) val = t.booleanLiteral(true);
            else if (attr.value.type === 'StringLiteral') val = t.stringLiteral(attr.value.value);
            else if (attr.value.type === 'JSXElement') val = attr.value;
            else if (attr.value.type === 'JSXFragment') val = attr.value;
            else if (attr.value.expression.type === 'JSXEmptyExpression') throw new Error('impossible?');
            else val = attr.value.expression;

            attrs.properties.push(t.objectProperty(name, val));
          }
        }

        pushChildren(jsx, path);

        if (attrs.properties.length > 0) {
          jsx.properties.push(t.objectProperty(t.identifier('attrs'), attrs));
        }

        path.replaceWith(jsx);
      }
    },
  }
};

function pushChildren(parent: babel.types.ObjectExpression, path: babel.NodePath<babel.types.JSXFragment | babel.types.JSXElement>) {
  const children: (babel.types.Expression | babel.types.SpreadElement)[] = [];

  for (const c of path.node.children) {
    if (c.type === 'JSXElement') {
      children.push(c);
      continue;
    }
    if (c.type === 'JSXFragment') {
      children.push(c);
      continue;
    }
    if (c.type === 'JSXSpreadChild') {
      children.push(t.spreadElement(c.expression));
      continue;
    }
    if (c.type === 'JSXText') {
      children.push(t.stringLiteral(c.value));
      continue;
    }
    if (c.type === 'JSXExpressionContainer') {
      if (c.expression.type !== 'JSXEmptyExpression') {
        children.push(c.expression);
      }
      continue;
    }

    throw new Error();
  }

  if (children.length === 1) {
    const child = children[0]!;
    if (child.type === 'SpreadElement') {
      parent.properties.push(t.objectProperty(t.identifier("children"), child.argument));
    }
    else {
      parent.properties.push(t.objectProperty(t.identifier("child"), child));
    }
  }
  else if (children.length > 0) {
    parent.properties.push(t.objectProperty(t.identifier("children"), t.arrayExpression(children)));
  }
}

function convertMember(v: babel.types.JSXMemberExpression): babel.types.MemberExpression {
  return t.memberExpression(
    (v.object.type === 'JSXIdentifier'
      ? t.identifier(v.object.name)
      : convertMember(v.object)),
    t.identifier(v.property.name)
  );
}
