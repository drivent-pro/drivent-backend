import { ApplicationError } from '@/protocols';

export function cannotListHotelsError(): ApplicationError {
  return {
    name: 'CannotListHotelsError',
    message: `Sorry, cannot list hotels! ERROR`,
  };
}
