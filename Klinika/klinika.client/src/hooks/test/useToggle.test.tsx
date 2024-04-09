import { useState } from "react";

export default function useToggle() {
  const [effect, setEffect] = useState(false);

  function close() {
    setEffect(false);
  }
  function open() {
    setEffect(true);
  }
  function auto() {
    setEffect(!effect);
  }

  return { close, open, auto, effect };
}
