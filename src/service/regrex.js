export default class RegEx {
  static regexName = new RegExp(
    /^(?!.*\.\.)(?!.*\s\s)(?!.*,,)[A-Z][a-zA-Z.,]{2,30}$/
  );
  static regexEmail = new RegExp(
    /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
  );
  static regexPassword = new RegExp(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
  );
}