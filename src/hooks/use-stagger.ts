/**
 * Returns an array of CSS `animation-delay` strings for staggered child animations.
 *
 * @param count  Number of items to stagger
 * @param delay  Delay increment in ms between each item (default: 100)
 * @returns      Array like ["0ms", "100ms", "200ms", ...]
 *
 * @example
 * const delays = useStagger(3, 150); // ["0ms", "150ms", "300ms"]
 * return items.map((item, i) => (
 *   <div key={i} className="animate-fade-in-up" style={{ animationDelay: delays[i] }}>
 *     {item}
 *   </div>
 * ));
 */
export function useStagger(count: number, delay = 100): string[] {
  return Array.from({ length: count }, (_, i) => `${i * delay}ms`);
}
