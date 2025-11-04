

import React, { useMemo, useRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
 
export const BackgroundRippleEffect = ({
  rows: initialRows = 8,
  cols: initialCols = 27,
  cellSize = 56,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [gridSize, setGridSize] = useState({ rows: initialRows, cols: initialCols });

  useEffect(() => {
    const updateGridSize = () => {
      if (ref.current) {
        const { offsetWidth, offsetHeight } = ref.current;
        const cols = Math.ceil(offsetWidth / cellSize);
        const rows = Math.ceil(offsetHeight / cellSize);
        setGridSize({ rows, cols });
      }
    };

    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    return () => {
      window.removeEventListener('resize', updateGridSize);
    };
  }, [cellSize]);

 
  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full",
        "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
        "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]",
      )}
    >
      <div className="relative h-auto w-auto overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <DivGrid
          key={`base-${rippleKey}`}
          className="mask-radial-from-20% mask-radial-at-top opacity-60"
          rows={gridSize.rows}
          cols={gridSize.cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
};
 
type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // in pixels
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};
 
type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};
 
// FIX: Explicitly typed `DivGrid` as a `React.FC` to resolve a TypeScript error where the `key` prop was being incorrectly checked against the component's props interface.
const DivGrid: React.FC<DivGridProps> = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  // FIX: Updated the default for `onCellClick` to accept two arguments, resolving a TypeScript error where the function was called with two arguments but defined to accept none.
  onCellClick = (row, col) => {},
  interactive = true,
}) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  );
 
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  };
 
  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0; // ms
        const duration = 200 + distance * 80; // ms
 
        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};
 
        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none",
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};
