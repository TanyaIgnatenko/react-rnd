import React, { FC } from "react";

import { Rnd as RndBase } from "./base";

import { withDefaultRelativePosition } from "./withDefaultRelativePosition";

const Rnd: FC = ({
                   default: defaultValue,
                   ...restProps
                 }) => {
  const RndComponent = defaultValue ? withDefaultRelativePosition(RndBase) : RndBase;

  return (
    <RndComponent default={defaultValue} {...restProps} />
  );
};

export default Rnd;
