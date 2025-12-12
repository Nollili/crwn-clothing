export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>; // Overload for actions with a payload
export function createAction<T extends string>(type: T, payload: void): Action<T>; // Overload for actions without a payload

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload }; // Actual implementation that returns an action object
}