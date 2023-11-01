import React from 'react';
import type { FC, MouseEvent as ReactMouseEvent, SVGAttributes } from 'react';
import cc from 'classcat';

import { Position } from '../../types';

const shiftX = (x: number, shift: number, position: Position): number => {
  if (position === Position.Left) return x - shift;
  if (position === Position.Right) return x + shift;
  return x;
};

const shiftY = (y: number, shift: number, position: Position): number => {
  if (position === Position.Top) return y - shift;
  if (position === Position.Bottom) return y + shift;
  return y;
};

export interface EdgeAnchorProps extends SVGAttributes<SVGGElement> {
  position: Position;
  centerX: number;
  centerY: number;
  radius?: number;
  offset?: number;
  onMouseDown: (event: ReactMouseEvent<SVGGElement, MouseEvent>) => void;
  onMouseEnter: (event: ReactMouseEvent<SVGGElement, MouseEvent>) => void;
  onMouseOut: (event: ReactMouseEvent<SVGGElement, MouseEvent>) => void;
  type: string;
}

const EdgeUpdaterClassName = 'react-flow__edgeupdater';

export const EdgeAnchor: FC<EdgeAnchorProps> = ({
  position,
  centerX,
  centerY,
  radius = 10,
  offset = 10,
  onMouseDown,
  onMouseEnter,
  onMouseOut,
  type,
}: EdgeAnchorProps) => (
  <circle
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter}
    onMouseOut={onMouseOut}
    className={cc([EdgeUpdaterClassName, `${EdgeUpdaterClassName}-${type}`])}
    cx={shiftX(centerX, offset, position)}
    cy={shiftY(centerY, offset, position)}
    r={radius}
    stroke="transparent"
    fill="transparent"
  />
);
