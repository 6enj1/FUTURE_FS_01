type ClassValue = string | false | null | undefined | ClassValue[]

export function cn(...classes: ClassValue[]): string {
  const result: string[] = []
  for (const c of classes) {
    if (!c) continue
    if (Array.isArray(c)) {
      result.push(cn(...c))
    } else {
      result.push(c)
    }
  }
  return result.join(' ')
}
