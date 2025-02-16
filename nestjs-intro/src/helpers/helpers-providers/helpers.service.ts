import { Injectable } from "@nestjs/common";

@Injectable()
export class HelpersService {
  /**
   * Copy the values of properties from one object to a target object. Returns the target object
   * @param target Target object
   * @param source Source object
   * @param exceptions An array of property names (strings) that should be excluded from being copied to the target object.
   * @returns
   */
  updateObjectFromSource<T>(
    target: object,
    source: object,
    exceptions: string[],
  ): T {
    const sourceEntries = Object.entries(source) as [string, string][];

    for (const [key, value] of sourceEntries) {
      if (key in target && !exceptions.includes(key)) {
        target[key] = value ?? target[key];
      }
    }

    return target as T;
  }
}
