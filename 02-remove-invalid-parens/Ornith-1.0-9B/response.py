Given a string s of parentheses and letters, remove the minimum number of invalid parentheses to make it valid. Return ALL unique valid strings in ANY order.
Example: s = "()())()" -> Output: ["(())()", "()()()"]
Example: s = "(a)())()" -> Output: ["(a())()", "(a)()()"]
Write a Python function remove_invalid_parentheses(s) that returns list[str].
Use BFS approach with visited set for de-duplication.
Output ONLY the code. No explanations.