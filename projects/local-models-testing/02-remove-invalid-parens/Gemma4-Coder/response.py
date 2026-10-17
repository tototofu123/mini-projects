Given a string s of parentheses and letters, remove the minimum number of invalid parentheses to make it valid. Return ALL unique valid strings in ANY order.
Example: s = "()())()" -> Output: ["(())()", "()()()"]
Example: s = "(a)())()" -> Output: ["(a())()", "(a)()()"]
Write a Python function remove_invalid_parentheses(s) that returns list[str].
Use BFS approach with visited set for de-duplication.
Output ONLY the code. No explanations.

```python
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
```