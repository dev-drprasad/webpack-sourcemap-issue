import React from "react";

export function Product() {

  React.useEffect(() => {
    console.trace('I am from trace');
    const stack = new Error('I am error stack').stack;
    console.error(stack)
  }, [])

  return [1, 2, 3].map((v) => <button>Click me {v}</button>);
}