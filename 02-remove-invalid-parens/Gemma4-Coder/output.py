def remove_invalid_parentheses(s):
    def is_valid(candidate):
        stack = []
        for ch in candidate:
            if ch == '(':
                stack.append(ch)
            elif ch == ')':
                if stack:
                    stack.pop()
            else:
                continue
        return not stack

    min_deletions = len(s)
    result = set()

    for i in range(len(s) + 1):
        for j in range(i, len(s) + 1):
            candidate = s[i:j]
            if is_valid(candidate):
                min_deletions = min(min_deletions, len(s) - len(candidate))
                result.add(candidate)

    return list(result)