// import React, { useState } from "react";

// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>{count}</h1>

//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <button onClick={()=>setCount(count -1)}>Decrement</button>
//     </div>
//   );
// }

// export default Counter;

import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <h1>Counter: {count}</h1>

      <button className="btn" onClick={increment}>
        Increment
      </button>

      <button className="btn" onClick={decrement}>
        Decrement
      </button>

      <button className="btn ghost" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default Counter;