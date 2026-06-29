def remove_invalid_parentheses(s):
    def is_valid(s):
        count = 0
        for ch in s:
            if ch == '(':
                count += 1
            elif ch == ')':
                count -= 1
                if count < 0:
                    return False
        return count == 0

    if not s:
        return [""]

    queue = [s]
    visited = {s}
    result = []

    while queue:
        curr = queue.pop(0)
        if is_valid(curr):
            result.append(curr)

        for i in range(len(curr)):
            if curr[i] in '()':
                new_s = curr[:i] + curr[i+1:]
                if new_s not in visited:
                    visited.add(new_s)
                    queue.append(new_s)

    return result