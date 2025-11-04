// NOTE: This is a simplified `cn` utility because `clsx` and `tailwind-merge` dependencies are not available in this environment.
// It handles basic string and conditional object class joining.
export function cn(...args: any[]): string {
  let classes = '';
  for (const arg of args) {
    if (!arg) continue;
    
    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes += ' ' + arg;
    } else if (Array.isArray(arg)) {
        classes += ' ' + cn(...arg);
    } else if (argType === 'object') {
      for (const key in arg) {
        if (arg[key]) {
          classes += ' ' + key;
        }
      }
    }
  }
  return classes.trim();
}
